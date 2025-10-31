import { api } from "../axiosInterceptApi";

const noteApi = api("note");

// 노트 생성
export const createNote = async (data) => {
  const res = await noteApi.post(`/note/create`, data);
  return res.data.data;
};

// 노트 단일 조회
export const getNoteById = async (id) => {
  const res = await noteApi.get(`/note/${id}`);
  return res.data.data;
};

// 노트 수정
export const updateNote = async (noteData) => {
  const { id, ...payload } = noteData;
  const res = await noteApi.put(`/note/update/${id}`, payload);
  return res.data.data;
};

// 노트 삭제
export const deleteNote = async (id) => {
  const res = await noteApi.delete(`/note/delete/${id}`);
  return res.data.data;
};

// 노트 검색으로 조회
// params: { workspaceId, keyword, page, size, sort, direction }
export const searchNotesByKeword = async (params) => {
  const res = await noteApi.get(`/note/search`, { params });
  return res.data.data;
};

// 최근 노트 목록 조회
// params: { workspaceId, page, size, sort, direction }
export const getRecentNotes = async (params) => {
  const res = await noteApi.get(`/note/recent`, { params });
  return res.data.data;
};

// workspaceId 기반 조회
export const getNotesByIds = async (params) => {
  const res = await noteApi.get(`/note/ids`, { params });
  return res.data.data;
};

// PARA 매핑 업데이트
export const updateParaMapping = async (data) => {
  const res = await noteApi.post(`/note/para-mapping`, data);
  return res.data.data;
};

