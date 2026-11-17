import { api } from "@/api/axios";

export const createCommentService = async (postId: string, content: string) => {
    const response = await api.post('/comment', { postId, content });
    return response.data;
}
