"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { useEffect } from "react";
import * as S from "./TiptapEditorStyled";

const TiptapEditor = ({ content, onChange, yorkieDoc }) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: content || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);

      // ✅ Tiptap → Yorkie 반영
      if (yorkieDoc) {
        yorkieDoc.update((root) => {
          root.content = html;
        });
      }
    },
  });

  useEffect(() => {
    if (!yorkieDoc || !editor) return;

    const unsubscribe = yorkieDoc.subscribe((event) => {
      const newContent = yorkieDoc.getRoot().content;
      if (newContent !== editor.getHTML()) {
        editor.commands.setContent(newContent);
      }
    });

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
