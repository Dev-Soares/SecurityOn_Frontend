import { api } from "@/api/axios";

export const deleteArticleService = async (id: string) => {
    await api.delete(`/article/${id}`);
}