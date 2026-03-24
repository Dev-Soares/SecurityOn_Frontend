import { useInfiniteQuery } from "@tanstack/react-query";
import { findAllPostService } from "../service/findAllPostService";

const useFindAllPosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => findAllPostService(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  });
};

export default useFindAllPosts;
