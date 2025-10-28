import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "../../api/graph/workspaceApi";

export const useGetWorkspaces = (userId) => {
  return useQuery({
    queryKey: ["workspaces", userId],
    queryFn: () => getWorkspaces(userId),
    enabled: !!userId,
  });
};
