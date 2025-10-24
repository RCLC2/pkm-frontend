import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "../../api/graph/workSpaceApi";

export const useGetWorkspaces = (userId) => {
  return useQuery({
    queryKey: ["workspaces", userId],
    queryFn: () => getWorkspaces(userId),
    enabled: !!userId,
  });
};
