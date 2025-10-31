"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { useEffect } from "react";
import * as S from "./TiptapEditorStyled";

const TiptapEditor = ({ yorkieDoc }) => {
  const [isLocalChange, setIsLocalChange] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: "",
    onUpdate: ({ editor }) => {
      if (!yorkieDoc || isLocalChange) return;

      const newText = editor.getText();

      yorkieDoc.update((root) => {
        if (root.content) {
          const currentText = root.content.toString();
          if (currentText !== newText) {
            root.content.edit(0, root.content.length, newText);
          }
        }
      });
    },
  });

  useEffect(() => {
    if (!yorkieDoc || !editor) return;

    const unsubscribe = yorkieDoc.subscribe((event) => {
      if (event.type === "remote-change") {
        const newContent = yorkieDoc.getRoot().content?.toString() || "";
        const currentContent = editor.getText();

        if (newContent !== currentContent) {
          setIsLocalChange(true);
          editor.commands.setContent(newContent);
          setIsLocalChange(false);
        }
      }
    });

    const initialContent = yorkieDoc.getRoot().content?.toString() || "";
    if (initialContent) {
      editor.commands.setContent(initialContent);
    }

    return () => unsubscribe();
  }, [yorkieDoc, editor]);

  return (
    <S.EditorContainer>
      <S.TiptapStyled>
        <EditorContent editor={editor} />
      </S.TiptapStyled>
    </S.EditorContainer>
  );
};

export default TiptapEditor;
