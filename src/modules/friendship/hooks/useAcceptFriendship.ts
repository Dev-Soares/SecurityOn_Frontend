import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFriendshipService } from "../service/acceptFriendshipService";
import { invalidateFriendshipCaches } from "../utils/friendshipCache";

export const useAcceptFriendship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendshipId: string) => acceptFriendshipService(friendshipId),
    onSuccess: () => invalidateFriendshipCaches(queryClient),
  });
};

export default useAcceptFriendship;
