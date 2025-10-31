// "use client";
import { useYorkieEditor } from "../../../hooks/yorkie/useYorkieEditor";
import { useEffect, useState, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styled/thema";
import * as S from "./NoteEditorStyled";
import TiptapEditor from "../editor/TiptapEditor";
import { Save, Tag, Calendar, FileText, Trash2, Plus } from "lucide-react";
import { useGetNoteById } from "../../../hooks/note/useGetNoteById";
import { useUpdateNote } from "../../../hooks/note/useUpdateNote";
import { useDeleteNote } from "../../../hooks/note/useDeleteNote";

export function NoteEditor({ noteId }) {
  const { doc, root, updateDoc, status, error, isAttached } = useYorkieEditor(
    `note-${noteId}`,
    noteId
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  // 노트 단일 조회
  const { data: note, isLoading } = useGetNoteById(noteId);

  const updateMutation = useUpdateNote();
  const deleteMutation = useDeleteNote();

  useEffect(() => {
    if (root && isAttached) {
      setTitle(root.title || "");
      setContent(root.content?.toString() || "");
      setTags(root.tags || []);
    }
  }, [root, isAttached]);

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.contents || "");
      setTags(note.tags || []);
    } else {
      setTitle("");
      setContent("");
      setTags([]);
    }
  }, [note]);

  const onTitleChange = useCallback(
    (e) => {
      const newTitle = e.target.value;
      updateDoc((root) => {
        root.title = newTitle;
      }, `update title: ${newTitle}`);
    },
    [updateDoc]
  );

  // 수정
  const handleSave = () => {
    if (!noteId) return alert("노트를 먼저 선택하세요.");

    const workspaceData = window.localStorage.getItem("current_workspace");
    const workspaceId = workspaceData ? JSON.parse(workspaceData).id : null;
    updateMutation.mutate(
      {
        id: noteId,
        workspaceId: workspaceId,
        title,
        description: title,
        contents: content,
      },
      {
        onSuccess: () => console.log("저장 완료"),
        onError: () => console.log("저장 실패"),
      }
    );
  };

  // 삭제
  const handleDelete = () => {
    if (!noteId) return alert("삭제할 노트를 선택하세요.");
    if (confirm("정말 이 노트를 삭제하시겠습니까?")) {
      deleteMutation.mutate(noteId, {
        onSuccess: () => alert("노트가 삭제되었습니다."),
        onError: () => alert("삭제 실패"),
      });
    }
  };

  // 태그 추가/삭제
  const addTag = () => {
    if (!doc || !isAttached) return;

    if (newTag) {
      const tagToAdd = newTag.startsWith("#") ? newTag : `#${newTag}`;
      updateDoc((root) => {
        if (!root.tags) root.tags = [];
        if (!root.tags.includes(tagToAdd)) {
          root.tags.push(tagToAdd);
        }
      }, `add tag: ${tagToAdd}`);

      setNewTag("");
    }
  };
  const removeTag = (tagToRemove) => {
    if (!doc || !isAttached) return;
    updateDoc((root) => {
      if (root.tags) {
        const index = root.tags.indexOf(tagToRemove);
        if (index > -1) {
          root.tags.splice(index, 1);
        }
      }
    }, `remove tag: ${tagToRemove}`);
  };

  // 자동 저장 인터벌
  // useEffect(() => {
  //   if (!noteId) return;
  //   const interval = setInterval(() => {
  //     handleSave();
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [noteId, title, content]);

  // 로딩 상태
  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <S.EmptyState>
          <S.EmptyStateContent>
            <S.Spinner />
          </S.EmptyStateContent>
        </S.EmptyState>
      </ThemeProvider>
    );
  }

  if (!isAttached || !noteId) {
    return (
      <ThemeProvider theme={theme}>
        <S.EmptyState>
          <S.EmptyStateContent>
            <S.EmptyStateIcon>
              <FileText size={48} />
            </S.EmptyStateIcon>
            <p>
              {!noteId
                ? "Select a note to start editing"
                : `Yorkie ${status}...`}
            </p>
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>Error: {error}</p>
            )}
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
            <S.SaveButton onClick={handleSave}>
              <Save size={16} />
              Synced ({status})
            </S.SaveButton>
            <S.DeleteButton onClick={handleDelete}>
              <Trash2 size={16} />
              Delete
            </S.DeleteButton>
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
            onChange={onTitleChange}
            placeholder="Note title..."
          />

          <TiptapEditor yorkieDoc={doc} />

          <S.Metadata>
            <S.MetadataItem>
              <Calendar size={12} />
              Created: {note?.createdAt || "N/A"}
            </S.MetadataItem>
            <S.MetadataItem>
              <Calendar size={12} />
              Modified: {note?.updatedAt || "N/A"}
            </S.MetadataItem>
          </S.Metadata>
        </S.EditorContent>
      </S.EditorContainer>
    </ThemeProvider>
  );
}
