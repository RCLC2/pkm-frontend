import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../../api/note/noteApi";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => updateNote(id),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["note", id] });
    },
  });
};
