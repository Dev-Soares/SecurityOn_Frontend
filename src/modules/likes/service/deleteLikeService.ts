import { api } from "@/api/axios";
import type { LikeStatus } from "../types/like";

export const deleteLikeService = async (postId: string): Promise<LikeStatus> => {
    const response = await api.delete(`/like/${postId}`);
    return response.data;
}
