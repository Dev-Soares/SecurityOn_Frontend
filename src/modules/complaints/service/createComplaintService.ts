import { api } from "@/api/axios";
import type { CreateComplaint } from "../types/createComplaint";

export const createComplaintService = async (data: CreateComplaint) => {
    await api.post('/complaint', data);
}
