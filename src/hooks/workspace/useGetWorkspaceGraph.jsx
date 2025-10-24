import { useQuery } from "@tanstack/react-query";
import { getWorkspaceGraph } from "../../api/graph/workSpaceApi";

export const useGetWorkspaceGraph = (workspaceId) => {
  return useQuery({
    queryKey: ["workspaceGraph", workspaceId],
    queryFn: () => getWorkspaceGraph(workspaceId),
    enabled: !!workspaceId,
  });
};
