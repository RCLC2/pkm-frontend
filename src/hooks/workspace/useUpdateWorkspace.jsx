import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkspace } from "../../api/graph/workSpaceApi";

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWorkspace,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["workspaces"] }),
  });
};
