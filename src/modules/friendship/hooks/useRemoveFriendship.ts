import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFriendshipService } from "../service/removeFriendshipService";
import { invalidateFriendshipCaches } from "../utils/friendshipCache";

// Cancelar pedido enviado, recusar recebido e desfazer amizade são a mesma
// operação no backend, um DELETE na linha da amizade.
export const useRemoveFriendship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendshipId: string) => removeFriendshipService(friendshipId),
    onSuccess: () => invalidateFriendshipCaches(queryClient),
  });
};

export default useRemoveFriendship;
