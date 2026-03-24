import { api } from "@/api/axios";
import type { FindAllPostResponse } from "../types/findAllPost";

export const findAllPostService = async (cursor?: string | null): Promise<FindAllPostResponse> => {
    const response = await api.get('/post', {
        params: { cursor, limit: 6 },
    });
    return response.data;
}
