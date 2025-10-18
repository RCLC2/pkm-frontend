"use client";
import { useYorkieEditor } from "../../yorkie/YorkieProvider";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import { noteEditorMockContent } from "../../../mocks/component/project/noteEditorMock";
import * as S from "./NoteEditorStyled";
import TiptapEditor from "../editor/TiptapEditor";
import { Save, Tag, Calendar, FileText } from "lucide-react";

export function NoteEditor({ noteId }) {
  const { doc } = useYorkieEditor(noteId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (noteId && noteEditorMockContent[noteId]) {
      const note = noteEditorMockContent[noteId];
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
    } else {
      setTitle("");
      setContent("");
      setTags([]);
    }
  }, [noteId]);

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag.startsWith("#") ? newTag : `#${newTag}`]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  if (!noteId) {
    return (
      <ThemeProvider theme={theme}>
        <S.EmptyState>
          <S.EmptyStateContent>
            <S.EmptyStateIcon>
              <FileText size={48} />
            </S.EmptyStateIcon>
            <p>Select a note to start editing</p>
          </S.EmptyStateContent>
        </S.EmptyState>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <S.EditorContainer>
        <S.Toolbar>
          <S.ToolbarButtons>
            <S.SaveButton>
              <Save size={16} />
              Save
            </S.SaveButton>
          </S.ToolbarButtons>

          <S.TagsContainer>
            {tags.map((tag) => (
              <S.TagBadge key={tag}>
                {tag}
                <S.TagRemoveButton onClick={() => removeTag(tag)}>
                  ×
                </S.TagRemoveButton>
              </S.TagBadge>
            ))}
            <S.TagInputContainer>
              <S.TagInput
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
              />
              <S.TagAddButton onClick={addTag}>
                <Tag size={12} />
              </S.TagAddButton>
            </S.TagInputContainer>
          </S.TagsContainer>
        </S.Toolbar>

        <S.EditorContent>
          <S.TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
          />

          <TiptapEditor
            content={content}
            onChange={setContent}
            yorkieDoc={doc}
          />

          <S.Metadata>
            <S.MetadataItem>
              <Calendar size={12} />
              Created: Jan 15, 2024
            </S.MetadataItem>
            <S.MetadataItem>
              <Calendar size={12} />
              Modified: Jan 18, 2024
            </S.MetadataItem>
          </S.Metadata>
        </S.EditorContent>
      </S.EditorContainer>
    </ThemeProvider>
  );
}
