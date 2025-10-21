import { useMutation } from "@tanstack/react-query";
import { beginGoogleLogin, sendGoogleCode } from "../../api/googleAuthApi";
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
      // accessToken을 프론트 저장소에 둘 필요 없으면 생략
      // 필요 시: sessionStorage.setItem("accessToken", data.accessToken);
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
