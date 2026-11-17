import { api } from "@/api/axios";
import type { LikeStatus } from "../types/like";

export const createLikeService = async (postId: string): Promise<LikeStatus> => {
    const response = await api.post('/like', { postId });
    return response.data;
}
