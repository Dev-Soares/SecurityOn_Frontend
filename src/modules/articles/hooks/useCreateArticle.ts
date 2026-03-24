import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticleService } from "../service/createArticleService";
import type { CreateArticle } from "../types/createArticle";

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateArticle) => createArticleService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};
