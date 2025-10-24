import { api } from "../axiosInterceptApi";

const graphApi = api("graph");

// 그래프 연결 확정
export const confirmConnection = async ({ sourceId, targetId }) => {
  const res = await graphApi.post("/connections/confirm", {
    sourceId,
    targetId,
  });
  return res.data.data;
};

// 그래프 연결 편집 상태로 설정
export const editConnection = async ({ sourceId, targetId }) => {
  const res = await graphApi.post("/connections/edit", { sourceId, targetId });
  return res.data.data;
};

// 노트 삭제 이벤트 처리
export const handleNoteDeleted = async ({ noteId }) => {
  const res = await graphApi.post("/connections/note-deleted", { noteId });
  return res.data.data;
};
