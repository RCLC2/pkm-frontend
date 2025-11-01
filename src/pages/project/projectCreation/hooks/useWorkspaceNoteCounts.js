import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotesByIds } from "../../../../api/note/noteApi";

const buildWorkspaceIds = (projects = []) =>
  projects
    .map((project) => project?.id)
    .filter((id, index, array) => Boolean(id) && array.indexOf(id) === index);

export const useWorkspaceNoteCounts = (projects = []) => {
  const workspaceIds = useMemo(() => buildWorkspaceIds(projects), [projects]);

  return useQuery({
    queryKey: ["workspace-note-counts", workspaceIds],
    enabled: workspaceIds.length > 0,
    staleTime: 60_000,
    queryFn: async () => {
      const pairs = await Promise.all(
        workspaceIds.map(async (workspaceId) => {
          try {
            const notes = await getNotesByIds({ workspaceId });
            const count = Array.isArray(notes) ? notes.length : 0;
            return [workspaceId, count];
          } catch (error) {
            console.warn(
              "[useWorkspaceNoteCounts] failed to fetch notes for workspace",
              workspaceId,
              error
            );
            return [workspaceId, 0];
          }
        })
      );

      return Object.fromEntries(pairs);
    },
  });
};

