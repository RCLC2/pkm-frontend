import { useMutation } from "@tanstack/react-query";
import { extractTags } from "../../api/topic/topicApi";

export const useExtractTags = () => {
  return useMutation({
    mutationFn: extractTags,
  });
};
