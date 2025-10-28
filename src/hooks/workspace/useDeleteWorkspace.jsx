import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkspace } from "../../api/graph/workspaceApi";

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["workspaces"] }),
  });
};
