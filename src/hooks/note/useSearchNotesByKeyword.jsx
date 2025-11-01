import { useQuery } from "@tanstack/react-query";
import { searchNotesByKeword } from "../../api/note/noteApi";

const DEFAULT_SEARCH_PARAMS = {
  page: 0,
  size: 20,
  sort: "updatedAt",
  direction: "DESC",
};

const normalizeNote = (note) => {
  if (!note || typeof note !== "object") {
    return null;
  }

  return {
    id: note.id,
    title: note.title || "Untitled Note",
    description: note.description || "",
    paraCategory: note.paraCategory
      ? String(note.paraCategory).toUpperCase()
      : undefined,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
    tags: note.tags || [],
  };
};

export const useSearchNotesByKeyword = (params = {}) => {
  const queryParams = {
    ...DEFAULT_SEARCH_PARAMS,
    ...params,
  };

  return useQuery({
    queryKey: ["notes", "search", queryParams],
    queryFn: async () => {
      const response = await searchNotesByKeword(queryParams);
      if (!response || typeof response !== "object") {
        return [];
      }

      const notes = Array.isArray(response.data) ? response.data : response;
      return notes.map(normalizeNote).filter(Boolean);
    },
    enabled: !!queryParams.workspaceId && !!queryParams.keyword,
  });
};
