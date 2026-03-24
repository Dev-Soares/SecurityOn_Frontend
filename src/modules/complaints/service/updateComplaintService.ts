import { api } from "@/api/axios";
import type { UpdateComplaint } from "../types/updateComplaint";

export const updateComplaintService = async (id: string, data: UpdateComplaint) => {
    await api.patch(`/complaint/${id}`, data);
}
