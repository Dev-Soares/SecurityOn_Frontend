import type { QueryClient } from "@tanstack/react-query";

// Uma mutação de amizade move quatro coisas: o status do par, as listas de
// pedidos, a lista de amigos e o contador de amigos do perfil ("user"/"me").
const FRIENDSHIP_CACHES = [
  "friendshipStatus",
  "friendRequests",
  "friends",
  "user",
  "me",
];

export const invalidateFriendshipCaches = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({
    predicate: (query) => FRIENDSHIP_CACHES.includes(query.queryKey[0] as string),
  });
