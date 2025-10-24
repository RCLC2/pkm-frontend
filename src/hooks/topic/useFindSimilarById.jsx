import { useQuery } from "@tanstack/react-query";
import { findSimilarById } from "../../api/topic/topicApi";

export const useFindSimilarById = (noteId) => {
  return useQuery({
    queryKey: ["similar", "by-id", noteId],
    queryFn: () => findSimilarById(noteId),
    enabled: !!noteId,
  });
};
