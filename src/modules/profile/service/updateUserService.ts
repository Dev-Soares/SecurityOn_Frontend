import { api } from "@/api/axios";
import type { UpdateUser } from "../types/updateUser";

export const updateUserService = async (id: string, data: UpdateUser) => {
    await api.patch(`/user/${id}`, data);
}
