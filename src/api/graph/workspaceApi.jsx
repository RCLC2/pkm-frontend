import { api } from "../axiosInterceptApi";

const workspaceApi = api("graph");

// 모든 워크스페이스 조회
export const getWorkspaces = async (userId) => {
  const res = await workspaceApi.get(`/workspaces`, {
    headers: { "X-User-ID": userId },
  });
  return res.data;
};

// 워크스페이스 생성
export const createWorkspace = async ({ title, type }) => {
  const res = await workspaceApi.post(`/workspaces`, { title, type });
  return res.data.data;
};

// 워크스페이스 수정
export const updateWorkspace = async ({ workspaceId, name, type }) => {
  const res = await workspaceApi.put(`/workspaces/${workspaceId}`, {
    name,
    type,
  });
  return res.data.data;
};

// 워크스페이스 삭제
export const deleteWorkspace = async (workspaceId) => {
  const res = await workspaceApi.delete(`/workspaces/${workspaceId}`);
  return res.data.data;
};

// 워크스페이스 스타일 변경
export const changeWorkspaceStyle = async ({ workspaceId, newStyle }) => {
  const res = await workspaceApi.post(`/workspaces/${workspaceId}/style`, newStyle);
  return res.data.data;
};

// 워크스페이스 타입 조회
export const getWorkspaceType = async ({ workspaceId, userId }) => {
  const res = await workspaceApi.get(`/workspaces/${workspaceId}/type`, {
    headers: { "X-User-ID": userId },
  });
  return res.data.data;
};

