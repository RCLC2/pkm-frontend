import axios from "axios";

export const GOOGLE_AUTH_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id:
      "747894176511-8lam7tvqr6src5vaaiqc7rnsg3djn5ac.apps.googleusercontent.com",
    redirect_uri: "http://localhost:5173/auth/google/callback",
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "consent",
  }).toString();

export async function sendGoogleCode(code) {
  const res = await axios.post(
    "http://localhost:8080/auth/google/callback",
    { code },
    { withCredentials: true } // 쿠키 수신
  );

  return res.data.data;
}

export function beginGoogleLogin() {
  window.location.href = GOOGLE_AUTH_URL;
}
