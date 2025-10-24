import { useQuery } from "@tanstack/react-query";
import { getMyPermission } from "../../api/user/permissionApi";

export const useMyPermission = (noteId) => {
  return useQuery({
    queryKey: ["permission", noteId],
    queryFn: () => getMyPermission(noteId),
    enabled: !!noteId,
  });
};
