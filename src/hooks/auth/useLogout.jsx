import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/auth/logoutApi";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (err) => {
      console.error("로그아웃 실패 ", err);
    },
  });
}
