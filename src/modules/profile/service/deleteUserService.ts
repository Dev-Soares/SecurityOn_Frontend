import { api } from "@/api/axios";

export const deleteUserService = async (id: string) => {
    await api.delete(`/user/${id}`);
}
