"use client";

import { useParams, useOutletContext } from "react-router-dom";
import { NoteEditor } from "../../../component/project/noteEditor/NoteEditor";

export function EditorPage() {
  const { noteId } = useParams();
  const { activeNote, currentProject } = useOutletContext();

  // Use noteId from URL params, fallback to activeNote from context
  const currentNoteId = noteId || activeNote;
  const workspaceId = currentProject?.id;

  return (
    <NoteEditor
      noteId={currentNoteId}
      workspaceId={workspaceId}
      workspace={currentProject}
    />
  );
}
