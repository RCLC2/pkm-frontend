"use client";

import { useParams, useOutletContext } from "react-router-dom";
import { NoteEditor } from "../../../component/project/NoteEditor";

export function EditorPage() {
  const { noteId } = useParams();
  const { activeNote } = useOutletContext();

  // Use noteId from URL params, fallback to activeNote from context
  const currentNoteId = noteId || activeNote;

  return <NoteEditor noteId={currentNoteId} />;
}