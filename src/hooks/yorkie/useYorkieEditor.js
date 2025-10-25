import { useEffect, useState, useCallback } from "react";  
import * as yorkie from "@yorkie-js/sdk";  
import { createYorkieAuthTokenInjector } from "../../api/auth/yorkieAuthApi";  
  
const RPC_ADDR = import.meta.env.VITE_YORKIE_URL || "http://localhost:8085";  
const API_KEY = "";  
// todo. 이 값은 그래프 서비스에서 워크스페이스 조회시 yorkieProject publicKey를 주입해야 한다.
  
export function useYorkieEditor(docKey, noteId) {  
  const [client, setClient] = useState(null);  
  const [doc, setDoc] = useState(null);  
  const [status, setStatus] = useState("준비됨");  
  const [error, setError] = useState("");  
  const [isAttached, setIsAttached] = useState(false);  
  const [root, setRoot] = useState({});  
  
  useEffect(() => {  
    if (!docKey || !noteId) return;  
  
    let clientInstance = null;  
    let docInstance = null;  
    const unsubs = [];  
  
    const initYorkie = async () => {  
      try {  
        setStatus("Yorkie 연결 중...");  
        setError("");  
   
        const authTokenInjector = createYorkieAuthTokenInjector(noteId);  
  
        clientInstance = new yorkie.Client({  
          rpcAddr: RPC_ADDR,  
          // apiKey: API_KEY,  
          authTokenInjector,  
        });  
          
        await clientInstance.activate();  
        setClient(clientInstance);  
  
        docInstance = new yorkie.Document(docKey);  
           
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
        if (docInstance && clientInstance && docInstance.getStatus() === "attached") {  
          await clientInstance.detach(docInstance);  
        }  
        if (clientInstance && clientInstance.isActive()) {  
          await clientInstance.deactivate();  
        }  
      })();  
    };  
  }, [docKey, noteId]);  
  
  const updateDoc = useCallback((updater, message) => {  
    if (doc) {  
      doc.update(updater, message);  
    }  
  }, [doc]);  
  
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