import { api } from "@/api/axios";
import type { Friendship } from "../types/friendship";

export const createFriendshipService = async (addresseeId: string): Promise<Friendship> => {
    const response = await api.post('/friendship', { addresseeId });
    return response.data;
}
