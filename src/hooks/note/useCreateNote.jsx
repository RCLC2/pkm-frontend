import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../api/note/noteApi";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", "recent"] });
      queryClient.invalidateQueries({ queryKey: ["notes", "ids"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["notes", "search"],
        exact: false,
      });
    },
  });
};
