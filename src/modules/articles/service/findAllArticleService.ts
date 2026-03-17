import { api } from "@/api/axios";
import type { FindAllArticleResponse } from "../types/findAllArticle";

export const findAllArticleService = async (): Promise<FindAllArticleResponse> => {
    const response = await api.get('/articles');
    return response.data;
}