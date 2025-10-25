import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmAllConnections } from "../../api/graph/graphConnectionApi";

export const useConfirmAllConnections = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmAllConnections,
    onSuccess: (_, workspaceId) => {
      queryClient.invalidateQueries({
        queryKey: ["workspaceGraph", workspaceId],
      });
    },
  });
};
