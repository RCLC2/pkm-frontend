import axios from "axios";

const SERVICE_PORT_MAP = {
  user: 8080,
  note: 8002,
  graph: 8003,
  topic: 8004,
};

export const api = (service) => {
  const port = SERVICE_PORT_MAP[service];
  if (!port) {
    throw new Error(` Unknown service name: ${service}`);
  }

  const instance = axios.create({
    baseURL: `http://localhost:${port}`,
    withCredentials: true, // 쿠키 자동 포함
  });

  instance.interceptors.request.use((request) => {
    const cookies = document.cookie;
    const matchToken = cookies.match(/accessToken=([^;]+)/);
    const accessToken = matchToken ? matchToken[1] : null;
    if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;
    if (!accessToken) {
      window.location.href = "/login";
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

        // /auth/refresh 요청 시도
        try {
          console.log(" AccessToken 만료 → refresh 요청 중...");
          const refreshResponse = await axios.post(
            "http://localhost:8080/auth/refresh",
            {},
            { withCredentials: true } // 쿠키 포함
          );

          const newToken = refreshResponse.data.data.accessToken;
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
