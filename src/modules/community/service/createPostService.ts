import { api } from "@/api/axios";
import type { CreatePost } from "../types/createPost";

export const createPostService = async (data: CreatePost) => {
    await api.post('/post', {
        content: data.content,
        imgUrl: data.imgUrl || undefined,
    });
}
