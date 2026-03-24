import { api } from "@/api/axios";

export const deleteComplaintService = async (id: string) => {
    await api.delete(`/complaint/${id}`);
}
