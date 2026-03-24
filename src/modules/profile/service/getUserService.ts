import { api } from "@/api/axios";

export const getUserService = async (id: string) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
}
