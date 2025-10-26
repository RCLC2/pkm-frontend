import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../../api/note/noteApi";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteData) => updateNote(noteData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["note", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["notes", "recent"] });
    },
  });
};
