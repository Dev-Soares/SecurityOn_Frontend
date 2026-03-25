import { useInfiniteQuery } from "@tanstack/react-query";
import { findComplaintByUserService } from "../service/findComplaintByUserService";

export const useFindComplaintByUser = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["userComplaint", id],
    queryFn: ({ pageParam }) => findComplaintByUserService(id, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  });
};
