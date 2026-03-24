import { useInfiniteQuery } from "@tanstack/react-query";
import { findAllArticleService } from "../service/findAllArticleService";

const useFindAllArticles = () => {
  return useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: ({ pageParam }) => findAllArticleService(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  });
};

export default useFindAllArticles;
