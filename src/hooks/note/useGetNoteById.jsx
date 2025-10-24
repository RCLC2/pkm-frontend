import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "../../api/note/noteApi";

export const useGetNoteById = (id) => {
  return useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
    enabled: !!id, // id가 있을 때만 실행
  });
};
