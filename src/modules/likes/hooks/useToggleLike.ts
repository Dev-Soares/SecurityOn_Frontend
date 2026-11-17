import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLikeService } from "../service/createLikeService";
import { deleteLikeService } from "../service/deleteLikeService";
import {
  invalidatePostCaches,
  patchPostInCaches,
} from "@/modules/community/utils/postCache";
import type { LikeStatus } from "../types/like";

interface ToggleLikeInput {
  postId: string;
  // Estado atual no cliente: decide entre curtir e descurtir.
  liked: boolean;
}

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation<LikeStatus, unknown, ToggleLikeInput>({
    mutationFn: ({ postId, liked }) =>
      liked ? deleteLikeService(postId) : createLikeService(postId),

    // O coração responde na hora; o total oficial chega no onSuccess.
    onMutate: ({ postId, liked }) => {
      patchPostInCaches(queryClient, postId, (post) => ({
        ...post,
        liked: !liked,
        _count: {
          ...post._count,
          likes: Math.max(0, post._count.likes + (liked ? -1 : 1)),
        },
      }));
    },

    onSuccess: (status) => {
      patchPostInCaches(queryClient, status.postId, (post) => ({
        ...post,
        liked: status.liked,
        _count: { ...post._count, likes: status.total },
      }));
    },

    onError: () => invalidatePostCaches(queryClient),
  });
};

export default useToggleLike;
