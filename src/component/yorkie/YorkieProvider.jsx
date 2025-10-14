// src/hooks/useYorkieEditor.js
import { useEffect, useState } from "react";
import yorkie from "yorkie-js-sdk";

export function useYorkieEditor(docId = "note-doc") {
  const [client, setClient] = useState(null);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const initYorkie = async () => {
      const client = new yorkie.Client(import.meta.env.VITE_YORKIE_URL, {
        apiKey: import.meta.env.VITE_YORKIE_API_KEY,
      });
      await client.activate();

      const doc = new yorkie.Document(docId);
      await client.attach(doc);

      doc.update((root) => {
        if (!root.content) root.content = "";
      });

      setClient(client);
      setDoc(doc);

      console.log("Yorkie client initialized:", client);
      console.log("Yorkie document attached:", doc);
    };

    initYorkie();
    return () => {
      if (client) client.deactivate();
    };
  }, [docId]);

  return { client, doc };
}
