import { useMutation } from "@tanstack/react-query";
import { findSimilarByContent } from "../../api/topic/topicApi";

export const useFindSimilarByContent = () => {
  return useMutation({
    mutationFn: findSimilarByContent,
  });
};
