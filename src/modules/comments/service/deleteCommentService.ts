import { api } from "@/api/axios";

export const deleteCommentService = async (id: string) => {
    const response = await api.delete(`/comment/${id}`);
    return response.data;
}
