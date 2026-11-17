import { api } from "@/api/axios";
import type { Friendship } from "../types/friendship";

export const acceptFriendshipService = async (friendshipId: string): Promise<Friendship> => {
    const response = await api.patch(`/friendship/${friendshipId}/accept`);
    return response.data;
}
