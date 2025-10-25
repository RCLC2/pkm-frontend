import { useEffect, useState, useCallback, useMemo } from "react";
import * as yorkie from "@yorkie-js/sdk";

const RPC_ADDR = import.meta.env.VITE_YORKIE_URL || "http://localhost:8085";
const API_KEY = import.meta.env.VITE_YORKIE_API_KEY || "";

export function useYorkieEditor(docKey) {  
  const [client, setClient] = useState(null);  
  const [doc, setDoc] = useState(null);  
  const [status, setStatus] = useState("준비됨");  
  const [error, setError] = useState("");  
  const [isAttached, setIsAttached] = useState(false);  
  const [root, setRoot] = useState({});  
  
  useEffect(() => {  
    if (!docKey) return;  
  
    let clientInstance = null;  
    let docInstance = null;  
    const unsubs = [];  
  
    const initYorkie = async () => {  
      try {  
        setStatus("Yorkie 연결 중...");  
        setError("");  
  
        clientInstance = new yorkie.Client({  
          rpcAddr: RPC_ADDR,  
          apiKey: API_KEY,  
        });  
        await clientInstance.activate();  
        setClient(clientInstance);  
  
        docInstance = new yorkie.Document(docKey);  
            
        unsubs.push(  
          docInstance.subscribe(() => {  
            setRoot(docInstance.getRoot());  
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
  }, [docKey]);  
  
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