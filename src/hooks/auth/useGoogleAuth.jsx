import { useMutation } from "@tanstack/react-query";
import { beginGoogleLogin, sendGoogleCode } from "../../api/auth/googleAuthApi";
import { useNavigate } from "react-router-dom";

export function useBeginGoogleLogin() {
  return beginGoogleLogin;
}

export function useHandleGoogleCode(code) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      if (!code) throw new Error("Google authorization code not found");
      const data = await sendGoogleCode(code);

      return data;
    },
    onSuccess: () => {
      navigate("/"); // 홈으로 이동
    },
    onError: () => {
      alert("구글 로그인에 실패했습니다.");
      navigate("/login");
    },
  });
}
