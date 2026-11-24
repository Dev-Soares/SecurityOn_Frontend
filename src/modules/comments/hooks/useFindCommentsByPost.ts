import { useInfiniteQuery } from "@tanstack/react-query";
import { findCommentsByPostService } from "../service/findCommentsByPostService";

// enabled: a lista só busca quando o usuário abre os comentários do post,
// um feed de 6 posts não dispara 6 requisições de comentário.
export const useFindCommentsByPost = (postId: string, enabled = true) => {
  return useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => findCommentsByPostService(postId, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
    enabled,
  });
};

export default useFindCommentsByPost;
