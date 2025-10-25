import { useQuery } from "@tanstack/react-query";
import { getNotesByIds } from "../../api/note/noteApi";

export const useGetNotesByIds = (params) => {
  return useQuery({
    queryKey: ["notes", "ids", params],
    queryFn: () => getNotesByIds(params),
    enabled: !!params?.workspaceId,
  });
};
