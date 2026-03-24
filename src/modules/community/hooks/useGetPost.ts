import { useQuery } from "@tanstack/react-query";
import { getPostService } from "../service/getPostService";

export const useGetPost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostService(id),
  });
};

export default useGetPost;
