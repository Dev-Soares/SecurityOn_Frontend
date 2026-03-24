import { api } from "@/api/axios";

export const getPostService = async (id: string) => {
    const response = await api.get(`/post/${id}`);
    return response.data;
}
