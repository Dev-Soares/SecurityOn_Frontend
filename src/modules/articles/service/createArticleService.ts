import { api } from "@/api/axios";
import type { CreateArticle } from "../types/createArticle";

export const createArticleService = async (data: CreateArticle) => {
    await api.post('/articles', data);
}