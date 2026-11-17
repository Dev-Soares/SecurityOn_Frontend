import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFriendshipService } from "../service/createFriendshipService";
import { invalidateFriendshipCaches } from "../utils/friendshipCache";

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addresseeId: string) => createFriendshipService(addresseeId),
    onSuccess: () => invalidateFriendshipCaches(queryClient),
  });
};

export default useSendFriendRequest;
