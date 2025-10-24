import { useMutation, useQueryClient } from "@tanstack/react-query";
import { grantPermission } from "../../api/user/permissionApi";

export const useGrantPermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: grantPermission,
    onSuccess: (_, { noteId }) => {
      queryClient.invalidateQueries({ queryKey: ["permission", noteId] });
    },
  });
};
