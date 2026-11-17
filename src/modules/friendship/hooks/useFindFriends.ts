import { useInfiniteQuery } from "@tanstack/react-query";
import { findFriendsService } from "../service/findFriendsService";

export const useFindFriends = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["friends", id],
    queryFn: ({ pageParam }) => findFriendsService(id, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
    enabled: Boolean(id),
  });
};

export default useFindFriends;
