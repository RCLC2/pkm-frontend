import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "../../api/graph/workspaceApi";

export const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: () => getWorkspaces(),
  });
};
