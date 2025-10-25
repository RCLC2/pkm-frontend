import { api } from "../axiosInterceptApi";

const workspaceGraphApi = api("graph");

// 워크스페이스 내 모든 미완료 연결 확정
export const confirmAllConnections = async (workspaceId) => {
  const res = await workspaceGraphApi.post(
    `/workspaces/${workspaceId}/confirm-all`
  );
  return res.data.data;
};

// 워크스페이스 그래프 구조 조회
export const getWorkspaceGraph = async (workspaceId) => {
  const res = await workspaceGraphApi.get(`/workspaces/${workspaceId}/graph`);
  return res.data.data;
};
