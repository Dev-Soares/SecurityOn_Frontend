import { api } from "@/api/axios";
import type { FriendshipStatus } from "../types/friendship";

export const findFriendshipStatusService = async (id: string): Promise<FriendshipStatus> => {
    const response = await api.get(`/friendship/status/${id}`);
    return response.data;
}
