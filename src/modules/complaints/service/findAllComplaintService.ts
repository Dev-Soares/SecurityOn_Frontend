import { api } from "@/api/axios";
import type { FindAllComplaintResponse } from "../types/findAllComplaint";

export const findAllComplaintService = async (cursor?: string | null): Promise<FindAllComplaintResponse> => {
    const response = await api.get('/complaint', {
        params: { cursor, limit: 6 },
    });
    return response.data;
}
