import { useQuery } from "@tanstack/react-query";
import { searchNotesByKeword } from "../../api/note/noteApi";

export const useSearchNotesByKeyword = (params) => {
  return useQuery({
    queryKey: ["notes", "search", params],
    queryFn: () => searchNotesByKeword(params),
    enabled: !!params?.workspaceId && !!params?.keyword,
  });
};
