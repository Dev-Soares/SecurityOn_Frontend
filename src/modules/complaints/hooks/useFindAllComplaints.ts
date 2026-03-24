import { useInfiniteQuery } from "@tanstack/react-query";
import { findAllComplaintService } from "../service/findAllComplaintService";

const useFindAllComplaints = () => {
  return useInfiniteQuery({
    queryKey: ["complaints"],
    queryFn: ({ pageParam }) => findAllComplaintService(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  });
};

export default useFindAllComplaints;
