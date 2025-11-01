import { useEffect, useState, useCallback } from "react";
import * as yorkie from "@yorkie-js/sdk";
import { createYorkieAuthTokenInjector } from "../../api/auth/yorkieAuthApi";

const RPC_ADDR = import.meta.env.VITE_YORKIE_URL || "http://localhost:8085";

const resolveWorkspaceMeta = (workspace) => {
  if (workspace?.yorkiePublicKey || workspace?.yorkieProjectId) {
    return workspace;
  }

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("current_workspace");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.yorkiePublicKey || parsed?.yorkieProjectId) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn("[useYorkieEditor] localStorage parse 실패", error);
    }
  }

  return {};
};

export function useYorkieEditor(docKey, noteId, workspace) {
  const [client, setClient] = useState(null);
  const [doc, setDoc] = useState(null);
  const [status, setStatus] = useState("준비됨");
  const [error, setError] = useState("");
  const [isAttached, setIsAttached] = useState(false);
  const [root, setRoot] = useState({});

  const { yorkieProjectId } = resolveWorkspaceMeta(workspace);
  const workspaceSignature = yorkieProjectId || "";

  useEffect(() => {
    if (!docKey || !noteId) {
      setClient(null);
      setDoc(null);
      setIsAttached(false);
      setStatus("준비됨");
      return;
    }

    setDoc(null);
    setClient(null);
    setIsAttached(false);
    setRoot({});
    setStatus("Yorkie 연결 중...");
    setError("");

    let clientInstance = null;
    let docInstance = null;
    const unsubs = [];

    const initYorkie = async () => {
      try {
        const authTokenInjector = createYorkieAuthTokenInjector(noteId);

        clientInstance = new yorkie.Client({
          rpcAddr: RPC_ADDR,
          authTokenInjector,
        });

        await clientInstance.activate();
        setClient(clientInstance);

        const effectiveDocKey = yorkieProjectId
          ? `${yorkieProjectId}-${noteId}`
          : docKey;

        docInstance = new yorkie.Document(effectiveDocKey);

        unsubs.push(
          docInstance.subscribe(() => {
            setRoot(docInstance.getRoot());
          })
        );

        unsubs.push(
          docInstance.subscribe("auth-error", (event) => {
            const msg = `Auth Error: method=${event.value.method}, reason=${event.value.reason}`;
            setError(msg);
            setStatus("인증 오류 발생");
            console.error(msg);
          })
        );

        await clientInstance.attach(docInstance, {
          initialPresence: { name: "Guest", color: "#FF0000" },
        });

        setDoc(docInstance);
        setIsAttached(true);

        docInstance.update((root) => {
          if (!root.content) {
            root.content = new yorkie.Text();
          }
          if (!root.title) {
            root.title = "";
          }
          if (!root.tags) {
            root.tags = [];
          }
        }, "initial document setup");

        setRoot(docInstance.getRoot());
        setStatus("편집 준비 완료");
      } catch (e) {
        const errorMsg = String(e?.message ?? e);
        setError(`Yorkie 연결 실패: ${errorMsg}`);
        setStatus("오류 발생");
        console.error("Yorkie Initialization Error:", e);
      }
    };

    initYorkie();

    return () => {
      (async () => {
        for (const unsub of unsubs) {
          unsub();
        }
        if (
          docInstance &&
          clientInstance &&
          docInstance.getStatus() === "attached"
        ) {
          await clientInstance.detach(docInstance);
        }
        if (clientInstance && clientInstance.isActive()) {
          await clientInstance.deactivate();
        }
      })();
    };
  }, [docKey, noteId, workspaceSignature, yorkieProjectId]);

  const updateDoc = useCallback(
    (updater, message) => {
      if (doc) {
        doc.update(updater, message);
      }
    },
    [doc]
  );

  return {
    client,
    doc,
    root,
    updateDoc,
    status,
    error,
    isAttached,
  };
}
