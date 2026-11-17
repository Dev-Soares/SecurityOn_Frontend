import { useInfiniteQuery } from "@tanstack/react-query";
import { findReceivedRequestsService } from "../service/findReceivedRequestsService";

export const useFindReceivedRequests = (enabled = true) => {
  return useInfiniteQuery({
    queryKey: ["friendRequests", "received"],
    queryFn: ({ pageParam }) => findReceivedRequestsService(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
    enabled,
  });
};

export default useFindReceivedRequests;
