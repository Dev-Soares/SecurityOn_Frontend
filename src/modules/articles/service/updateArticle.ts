import { api } from "@/api/axios";
import type { UpdateArticle } from "../types/updateArticle";

export const updateArticleService = async (id: string, data: UpdateArticle) => {
    await api.patch(`/article/${id}`, data);
}