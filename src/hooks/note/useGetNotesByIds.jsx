import { useQuery } from "@tanstack/react-query";
import { getNotesByIds, getNoteById } from "../../api/note/noteApi";

const fetchWorkspaceNotes = async (workspaceId) => {
  const ids = await getNotesByIds({ workspaceId });
  if (!Array.isArray(ids) || ids.length === 0) {
    return [];
  }

  const notes = await Promise.all(
    ids.map(async (id) => {
      try {
        return await getNoteById(id);
      } catch (error) {
        console.warn("[useGetNotesByIds] failed to load note", id, error);
        return null;
      }
    })
  );

  return notes.filter(Boolean);
};

export const useGetNotesByIds = (workspaceId) => {
  return useQuery({
    queryKey: ["notes", "ids", workspaceId || null],
    queryFn: () => fetchWorkspaceNotes(workspaceId),
    enabled: Boolean(workspaceId),
  });
};
