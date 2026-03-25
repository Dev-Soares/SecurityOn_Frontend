import { api } from "@/api/axios";
import type { FindComplaintByUserResponse } from "../types/findComplaintByUser";

export const findComplaintByUserService = async (id: string, cursor?: string | null, ): Promise<FindComplaintByUserResponse> => {
    const response = await api.get(`/complaint/all/${id}`, {
        params: { cursor, limit: 6 },
    });
    return response.data;
}