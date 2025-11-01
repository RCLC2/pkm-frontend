import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateParaMapping } from "../../api/note/noteApi";

export const useUpdateParaMapping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("[useUpdateParaMapping] request", payload);
      const response = await updateParaMapping(payload);
      console.log("[useUpdateParaMapping] response", response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", "ids"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["notes", "search"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["notes", "recent"], exact: false });
    },
    onError: (error) => {
      console.error("[useUpdateParaMapping] error", error);
    },
  });
};
