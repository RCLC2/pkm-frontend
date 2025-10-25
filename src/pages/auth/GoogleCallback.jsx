// src/pages/auth/GoogleCallback.jsx
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useHandleGoogleCode } from "../../hooks/auth/useGoogleAuth";

export default function GoogleCallback() {
  const [params] = useSearchParams();
  const code = params.get("code");
  const { mutate, isLoading } = useHandleGoogleCode(code);

  const hasRun = useRef(false);
  useEffect(() => {
    if (!code || hasRun.current) return; // 이미 실행했으면 무시
    hasRun.current = true; // 한 번만 실행하도록 고정
    mutate();
  }, [code, mutate]);

  return (
    <p style={{ backgroundColor: "black", height: "100vh" }}>
      {isLoading ? "Google 로그인 처리 중..." : "처리 준비 중..."}
    </p>
  );
}
