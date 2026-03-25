import { api } from "@/api/axios";
import type { FindPostByUserResponse } from "../types/findPostByUser";

export const findPostByUserService = async (id: string, cursor?: string | null, ): Promise<FindPostByUserResponse> => {
    const response = await api.get(`/post/all/${id}`, {
        params: { cursor, limit: 6 },
    });
    return response.data;
}