import { api } from "@/api/axios";
import type { FindCommentsByPostResponse } from "../types/comment";

export const findCommentsByPostService = async (
    postId: string,
    cursor?: string | null,
): Promise<FindCommentsByPostResponse> => {
    const response = await api.get(`/comment/all/${postId}`, {
        params: { cursor, limit: 5 },
    });
    return response.data;
}
