import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeWorkspaceStyle } from "../../api/graph/workspaceApi";

export const useChangeWorkspaceStyle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeWorkspaceStyle,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["workspaces"] }),
  });
};
