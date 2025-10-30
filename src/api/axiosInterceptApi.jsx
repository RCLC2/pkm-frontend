import axios from "axios";

const SERVICE_PATH_PREFIX = {
  user: "/api/v1/users",
  note: "/api/v1/notes",
  graph: "/api/v1/graphs",
};

const GATEWAY_BASE_URL = import.meta.env.VITE_GATEWAY_BASE_URL;

export const api = (service) => {
  const prefix = SERVICE_PATH_PREFIX[service];
  if (!prefix) {
    throw new Error(` Unknown service name: ${service}`);
  }

  const instance = axios.create({
    baseURL: `${GATEWAY_BASE_URL}${prefix}`,
    withCredentials: true, // 쿠키 자동 포함
  });

  instance.interceptors.request.use((request) => {
    const cookies = document.cookie;
    const matchToken = cookies.match(/accessToken=([^;]+)/);
    const accessToken = matchToken ? matchToken[1] : null;
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      window.location.href = "/login";
      return Promise.reject(
        new Error("No access token; redirecting to login.")
      );
    }
    return request;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const original = err.config;
      const status = err.response?.status;

      if (original._retry) return Promise.reject(err);

      //  AccessToken 만료 시
      if (status === 401 || status === 403) {
        original._retry = true;

        // 쿠키에서 refreshToken 읽기
        const cookies = document.cookie;
        const matchRefresh = cookies.match(/refreshToken=([^;]+)/);
        const refreshToken = matchRefresh ? matchRefresh[1] : null;

        if (!refreshToken) {
          console.warn("refreshToken 없음 → 로그인 페이지로 이동");
          window.location.href = "/login";
          return Promise.reject(err);
        }

        // /auth/refresh 요청 시도
        try {
          console.log(" AccessToken 만료 → refresh 요청 중...");
          const refreshResponse = await axios.post(
            `${GATEWAY_BASE_URL}${SERVICE_PATH_PREFIX.user}/auth/refresh`,
            {},
            { headers: { Authorization: refreshToken } } // 쿠키 포함
          );

          const newToken = refreshResponse.data.data.accessToken;
          document.cookie = `accessToken=${newToken}; path=/; secure; samesite=None; max-age=3600;`;

          console.log(" 새 accessToken 발급 완료:", newToken);
          original.headers.Authorization = `Bearer ${newToken}`;
          return instance(original);
        } catch (refreshErr) {
          console.error("refresh 실패");
          return Promise.reject(refreshErr);
        }
      }

      return Promise.reject(err);
    }
  );

  return instance;
};
