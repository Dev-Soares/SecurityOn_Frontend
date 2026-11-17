import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentService } from "../service/createCommentService";
import { patchPostInCaches } from "@/modules/community/utils/postCache";

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createCommentService(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      // O contador do card vive no cache do post, não no dos comentários.
      patchPostInCaches(queryClient, postId, (post) => ({
        ...post,
        _count: { ...post._count, comments: post._count.comments + 1 },
      }));
    },
  });
};

export default useCreateComment;
