import { useMutation } from "@tanstack/react-query";
import { editConnection } from "../../api/graph/graphConnectionApi";

export const useEditConnection = () => {
  return useMutation({ mutationFn: editConnection });
};
