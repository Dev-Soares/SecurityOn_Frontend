import { api } from "@/api/axios";

export const deleteArticleService = async (id: number) => {
    await api.delete(`/articles/${id}`);
}