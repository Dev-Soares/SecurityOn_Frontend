import { api } from "@/api/axios";

export const getComplaintService = async (id: string) => {
    const response = await api.get(`/complaint/${id}`);
    return response.data;
}
