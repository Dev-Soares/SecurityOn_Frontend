import { api } from "@/api/axios";
import type { FriendSummary, PaginatedFriendship } from "../types/friendship";

export const findFriendsService = async (
    id: string,
    cursor?: string | null,
): Promise<PaginatedFriendship<FriendSummary>> => {
    const response = await api.get(`/friendship/all/${id}`, {
        params: { cursor, limit: 10 },
    });
    return response.data;
}
