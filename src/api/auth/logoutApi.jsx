import { api } from "../axiosInterceptApi";

export const logout = async () => {
  const response = await api("user").post("/auth/logout");
  return response.data;
};
