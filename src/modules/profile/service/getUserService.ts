import { api } from "@/api/axios";
import type { User } from "../types/user";

export const getUserService = async (id: string): Promise<User> => {
    const response = await api.get(`/user/${id}`);
    return response.data;
}
