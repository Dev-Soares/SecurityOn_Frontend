import { api } from "@/api/axios";

export const getArticleService = async (id: string) => {
    const response = await api.get(`/article/${id}`);
    return response.data;
}