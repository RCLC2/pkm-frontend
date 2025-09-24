"use client";

import { useState, useEffect } from "react";
import * as S from "./TiptapEditorStyled";
import {
  Bold,
  Italic,
  Strikethrough,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
} from "lucide-react";

const TiptapEditor = ({
  content,
  onChange,
  placeholder = "Start writing...",
}) => {
  const [editorContent, setEditorContent] = useState(content || "");
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    setEditorContent(content || "");
  }, [content]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setEditorContent(newContent);
    onChange?.(newContent);
  };

  const insertMarkdown = (prefix, suffix = "", placeholder = "") => {
    const textarea = document.querySelector(".tiptap-textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const textToInsert = selectedText || placeholder;

    const newText = prefix + textToInsert + suffix;
    const newValue =
      textarea.value.substring(0, start) +
      newText +
      textarea.value.substring(end);

    setEditorContent(newValue);
    onChange?.(newValue);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertLine = (text) => {
    const textarea = document.querySelector(".tiptap-textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(start);

    // Add line break if not at beginning of line
    const prefix = beforeText.endsWith("\n") || beforeText === "" ? "" : "\n";
    const suffix = afterText.startsWith("\n") || afterText === "" ? "" : "\n";

    const newValue = beforeText + prefix + text + suffix + afterText;
    setEditorContent(newValue);
    onChange?.(newValue);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + text.length + suffix.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <S.EditorContainer>
      <S.Toolbar>
        <S.ToolbarSection>
          <S.ToolbarButton
            onClick={() => insertMarkdown("**", "**", "bold text")}
            title="Bold"
          >
            <Bold size={16} />
          </S.ToolbarButton>
          <S.ToolbarButton
            onClick={() => insertMarkdown("*", "*", "italic text")}
            title="Italic"
          >
            <Italic size={16} />
          </S.ToolbarButton>
          <S.ToolbarButton
            onClick={() => insertMarkdown("~~", "~~", "strikethrough text")}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </S.ToolbarButton>
        </S.ToolbarSection>

        <S.ToolbarDivider />

        <S.ToolbarSection>
          <S.ToolbarButton
            onClick={() => insertLine("# Heading 1")}
            title="Heading 1"
          >
            <Heading1 size={16} />
          </S.ToolbarButton>
          <S.ToolbarButton
            onClick={() => insertLine("## Heading 2")}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </S.ToolbarButton>
          <S.ToolbarButton
            onClick={() => insertLine("### Heading 3")}
            title="Heading 3"
          >
            <Heading3 size={16} />
          </S.ToolbarButton>
        </S.ToolbarSection>

        <S.ToolbarDivider />

        <S.ToolbarSection>
          <S.ToolbarButton
            onClick={() => insertLine("- List item")}
            title="Bullet List"
          >
            <List size={16} />
          </S.ToolbarButton>
          <S.ToolbarButton
            onClick={() => insertLine("1. List item")}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </S.ToolbarButton>
        </S.ToolbarSection>

        <S.ToolbarDivider />

        <S.ToolbarSection>
          <S.ToolbarButton onClick={() => insertLine("> Quote")} title="Quote">
            <Quote size={16} />
          </S.ToolbarButton>
          <S.ToolbarButton
            onClick={() => insertLine("```\ncode block\n```")}
            title="Code Block"
          >
            <Code size={16} />
          </S.ToolbarButton>
        </S.ToolbarSection>

        <S.ToolbarDivider />

        <S.ToolbarSection>
          <S.ToolbarButton
            onClick={() => setIsLinkModalOpen(true)}
            title="Link"
          >
            <LinkIcon size={16} />
          </S.ToolbarButton>
          <S.ToolbarButton
            onClick={() => {
              const url = window.prompt("이미지 URL을 입력하세요:");
              if (url) insertLine(`![Alt text](${url})`);
            }}
            title="Image"
          >
            <ImageIcon size={16} />
          </S.ToolbarButton>
        </S.ToolbarSection>
      </S.Toolbar>

      <S.EditorTextarea
        className="tiptap-textarea"
        value={editorContent}
        onChange={handleContentChange}
        placeholder={placeholder}
        spellCheck={false}
      />

      {isLinkModalOpen && (
        <S.LinkModal>
          <S.LinkModalContent>
            <S.LinkModalHeader>
              <h3>링크 추가</h3>
              <S.LinkModalClose onClick={() => setIsLinkModalOpen(false)}>
                ×
              </S.LinkModalClose>
            </S.LinkModalHeader>
            <S.LinkModalBody>
              <S.LinkInput
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && linkUrl) {
                    insertMarkdown(`[`, `](${linkUrl})`, "링크 텍스트");
                    setLinkUrl("");
                    setIsLinkModalOpen(false);
                  }
                }}
              />
            </S.LinkModalBody>
            <S.LinkModalFooter>
              <S.LinkModalButton onClick={() => setIsLinkModalOpen(false)}>
                취소
              </S.LinkModalButton>
              <S.LinkModalButton
                onClick={() => {
                  if (linkUrl) {
                    insertMarkdown(`[`, `](${linkUrl})`, "링크 텍스트");
                    setLinkUrl("");
                    setIsLinkModalOpen(false);
                  }
                }}
                primary
              >
                추가
              </S.LinkModalButton>
            </S.LinkModalFooter>
          </S.LinkModalContent>
        </S.LinkModal>
      )}
    </S.EditorContainer>
  );
};

export default TiptapEditor;
