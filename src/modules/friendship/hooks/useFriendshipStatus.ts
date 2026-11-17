import { useQuery } from "@tanstack/react-query";
import { findFriendshipStatusService } from "../service/findFriendshipStatusService";

// A rota exige autenticação, então o enabled evita 401 para visitante anônimo.
export const useFriendshipStatus = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: ["friendshipStatus", userId],
    queryFn: () => findFriendshipStatusService(userId),
    enabled: enabled && Boolean(userId),
  });
};

export default useFriendshipStatus;
