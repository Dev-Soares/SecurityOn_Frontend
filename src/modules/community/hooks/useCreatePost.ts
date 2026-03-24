import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostService } from "../service/createPostService";
import type { CreatePost } from "../types/createPost";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePost) => createPostService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
