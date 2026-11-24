import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommentService } from "../service/updateCommentService";

interface UpdateCommentInput {
  id: string;
  content: string;
}

// Editar não muda o contador do post, só o conteúdo da lista.
export const useUpdateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: UpdateCommentInput) =>
      updateCommentService(id, content),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["comments", postId] }),
  });
};

export default useUpdateComment;
