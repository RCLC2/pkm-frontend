import { useMutation } from "@tanstack/react-query";
import { handleNoteDeleted } from "../../api/graph/graphNoteApi";

export const useHandleNoteDeleted = () => {
  return useMutation({ mutationFn: handleNoteDeleted });
};
