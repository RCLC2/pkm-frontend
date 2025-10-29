import axios from "axios";

const GATEWAY_BASE_URL = import.meta.env.VITE_GATEWAY_BASE_URL;

export const GOOGLE_AUTH_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id:
      "1068500046041-igknr2rtm1ims2lcq7qr6v4vv122j14a.apps.googleusercontent.com",
    redirect_uri: "https://pkm.hpground.xyz/api/v1/users/auth/google/callback",
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "consent",
  }).toString();

export async function sendGoogleCode(code) {
  const res = await axios.get(
    `${GATEWAY_BASE_URL}/api/v1/users/auth/google/callback?code=${code}`,
    { withCredentials: true }
  );

  const accessToken = res.headers["accesstoken"];
  const refreshToken = res.headers["refreshtoken"];

  if (!accessToken || !refreshToken) {
    throw new Error("토큰을 응답 헤더에서 찾을 수 없습니다.");
  }

  // 쿠키에 토큰 저장
  // max-age는 초 단위 (accessToken: 1시간, refreshToken: 7일)
  document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=None; max-age=3600;`;
  document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=None; max-age=604800;`;

  return res.data.data;
}

export function beginGoogleLogin() {
  window.location.href = GOOGLE_AUTH_URL;
}
