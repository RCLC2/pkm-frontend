import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revokePermission } from "../../api/user/permissionApi";

export const useRevokePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: revokePermission,
    onSuccess: (_, { noteId }) => {
      queryClient.invalidateQueries({ queryKey: ["permission", noteId] });
    },
  });
};
