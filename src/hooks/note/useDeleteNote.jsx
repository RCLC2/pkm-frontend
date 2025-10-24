import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../api/note/noteApi";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteNote(id),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", id] });
    },
  });
};
