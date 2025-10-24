import { useQuery } from "@tanstack/react-query";
import { getRecentNotes } from "../../api/note/noteApi";

export const useGetRecentNotes = (params) => {
  return useQuery({
    queryKey: ["notes", "recent", params],
    queryFn: () => getRecentNotes(params),
    enabled: !!params?.workspaceId,
  });
};
