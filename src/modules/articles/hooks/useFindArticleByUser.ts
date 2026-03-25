import { useInfiniteQuery } from "@tanstack/react-query";
import { findArticleByUserService } from "../service/findArticleByUserService";

export const useFindArticleByUser = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["userArticle", id],
    queryFn: ({ pageParam }) => findArticleByUserService(id, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  });
};