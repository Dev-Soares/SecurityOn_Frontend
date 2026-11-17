import { api } from "@/api/axios";

export const updateCommentService = async (id: string, content: string) => {
    const response = await api.patch(`/comment/${id}`, { content });
    return response.data;
}
