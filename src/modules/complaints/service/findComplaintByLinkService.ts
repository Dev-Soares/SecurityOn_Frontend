import { api } from "@/api/axios";
import type { FindComplaintByLinkResponse } from "../types/findComplaintByLink";

export const findComplaintByLinkService = async (url: string): Promise<FindComplaintByLinkResponse> => {
    const response = await api.get('/complaint/search', {
        params: { url },
    });
    return response.data;
}
