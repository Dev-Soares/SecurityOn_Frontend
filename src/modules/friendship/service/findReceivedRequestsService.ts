import { api } from "@/api/axios";
import type { PaginatedFriendship, ReceivedRequest } from "../types/friendship";

export const findReceivedRequestsService = async (
    cursor?: string | null,
): Promise<PaginatedFriendship<ReceivedRequest>> => {
    const response = await api.get('/friendship/requests/received', {
        params: { cursor, limit: 10 },
    });
    return response.data;
}
