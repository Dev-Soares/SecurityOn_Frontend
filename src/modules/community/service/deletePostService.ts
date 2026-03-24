import { api } from "@/api/axios";

export const deletePostService = async (id: string) => {
    await api.delete(`/post/${id}`);
}
