import { api } from "@/api/axios";
import type { FindAllArticleResponse } from "../types/findAllArticle";

export const findAllArticleService = async (cursor?: string | null): Promise<FindAllArticleResponse> => {
    const response = await api.get('/article', {
        params: { cursor, limit: 6 },
    });
    return response.data;
}