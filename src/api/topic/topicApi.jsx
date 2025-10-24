import { api } from "../axiosInterceptApi";

const topicApi = api("topic");

// 태그 추출
// body: { content: string, topN?: number }
export const extractTags = async ({ content, topN = 10 }) => {
  const res = await topicApi.post("/extract-tags", { content, topN });
  return res.data.data;
};

// 유사 문서 탐색 - 내용 기반
// body: { content: string, topN?: number }
export const findSimilarByContent = async ({ content, topN = 10 }) => {
  const res = await topicApi.post("/find-similar/by-content", {
    content,
    topN,
  });
  return res.data.data;
};

// 유사 문서 탐색 - ID 기반
// query: ?noteId=string
export const findSimilarById = async (noteId) => {
  const res = await topicApi.get("/find-similar/by-id", { params: { noteId } });
  return res.data.data;
};
