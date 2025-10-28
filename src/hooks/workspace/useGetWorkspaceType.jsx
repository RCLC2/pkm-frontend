import { useQuery } from "@tanstack/react-query";
import { getWorkspaceType } from "../../api/graph/workspaceApi";

export const useGetWorkspaceType = (workspaceId, userId) => {
  return useQuery({
    queryKey: ["workspaceType", workspaceId],
    queryFn: () => getWorkspaceType({ workspaceId, userId }),
    enabled: !!workspaceId && !!userId,
  });
};
