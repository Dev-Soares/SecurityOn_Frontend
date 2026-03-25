import { api } from "@/api/axios";
import type { FindArticleByUserResponse } from "../types/findArticleByUser";

export const findArticleByUserService = async (id: string, cursor?: string | null, ): Promise<FindArticleByUserResponse> => {
    const response = await api.get(`/article/all/${id}`, {
        params: { cursor, limit: 6 },
    });
    return response.data;
}