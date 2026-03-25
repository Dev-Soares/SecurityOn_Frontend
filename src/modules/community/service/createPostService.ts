import { api } from "@/api/axios";
import type { CreatePost } from "../types/createPost";

export const createPostService = async (data: CreatePost) => {
    const formData = new FormData();
    formData.append('content', data.content);

    if (data.image) {
        formData.append('image', data.image);
    }

    await api.post('/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
}
