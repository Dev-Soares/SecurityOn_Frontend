import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentService } from "../service/deleteCommentService";
import { patchPostInCaches } from "@/modules/community/utils/postCache";

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCommentService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      patchPostInCaches(queryClient, postId, (post) => ({
        ...post,
        _count: {
          ...post._count,
          comments: Math.max(0, post._count.comments - 1),
        },
      }));
    },
  });
};

export default useDeleteComment;
