import { useQuery } from "@tanstack/react-query";
import { getArticleService } from "../service/getArticleService";

export const useGetArticle = (id: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleService(id),
  });
};

export default useGetArticle;
