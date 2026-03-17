import { api } from "@/api/axios";

export const getArticleService = async (id: number) => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
}