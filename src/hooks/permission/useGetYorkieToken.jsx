import { useMutation } from "@tanstack/react-query";
import { getYorkieToken } from "../../api/user/yorkieApi";

export const useGetYorkieToken = () => {
  return useMutation({
    mutationFn: getYorkieToken,
  });
};
