import { useMutation } from "@tanstack/react-query";
import { updateParaMapping } from "../../api/note/noteApi";

export const useUpdateParaMapping = () => {
  return useMutation({
    mutationFn: (data) => updateParaMapping(data),
  });
};
