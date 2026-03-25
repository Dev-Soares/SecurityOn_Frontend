import { useInfiniteQuery } from "@tanstack/react-query";
import { findPostByUserService } from "../service/findPostByUserService";

export const useFindPostByUser = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["userPost", id],
    queryFn: ({ pageParam }) => findPostByUserService(id, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  });
};
