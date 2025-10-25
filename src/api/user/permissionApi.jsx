import { api } from "../axiosInterceptApi";

const userApi = api("user");

// 권한 부여
export const grantPermission = async ({ noteId, targetUserId, role }) => {
  const res = await userApi.post(`/permission/${noteId}/grant`, {
    targetUserId,
    role,
  });
  return res.data.data;
};

// 권한 회수
export const revokePermission = async ({ noteId, targetUserId, role }) => {
  const res = await userApi.post(`/permission/${noteId}/revoke`, {
    targetUserId,
    role,
  });
  return res.data.data;
};

// 내 권한 조회
export const getMyPermission = async (noteId) => {
  const res = await userApi.get(`/permission/${noteId}/me`);
  return res.data.data;
};
