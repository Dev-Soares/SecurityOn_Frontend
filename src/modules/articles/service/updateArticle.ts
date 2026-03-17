import { api } from "@/api/axios";
import type { UpdateArticle } from "../types/updateArticle";

export const updateArticleService = async (id: number, data: UpdateArticle) => {
    await api.patch(`/articles/${id}`, data);
}