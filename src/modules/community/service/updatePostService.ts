import { api } from "@/api/axios";
import type { UpdatePost } from "../types/updatePost";

export const updatePostService = async (id: string, data: UpdatePost) => {
    await api.patch(`/post/${id}`, data);
}
