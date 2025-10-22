import { api } from "../axiosInterceptApi";

export const logout = async () => {
  const response = await api("user").post("/auth/logout");
  console.log("로그아웃 성공:", response.data);
  return response.data;
};
