import { useMutation } from "@tanstack/react-query";
import { confirmConnection } from "../../api/graph/graphConnectionApi";

export const useConfirmConnection = () => {
  return useMutation({ mutationFn: confirmConnection });
};
