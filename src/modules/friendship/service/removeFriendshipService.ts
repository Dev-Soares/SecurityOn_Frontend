import { api } from "@/api/axios";
import type { Friendship } from "../types/friendship";

// Mesma rota cobre cancelar pedido enviado, recusar recebido e desfazer amizade.
export const removeFriendshipService = async (friendshipId: string): Promise<Friendship> => {
    const response = await api.delete(`/friendship/${friendshipId}`);
    return response.data;
}
