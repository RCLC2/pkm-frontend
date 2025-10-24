import { api } from "../axiosInterceptApi";

const userApi = api("user");

// yorkie 토큰 발급
export const getYorkieToken = async ({ noteId, role }) => {
  const res = await userApi.post(`/yorkie/token`, {
    noteId,
    role,
  });
  return res.data.data;
};
