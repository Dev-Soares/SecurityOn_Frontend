import { api } from "@/api/axios";

export const logoutService = async () => {
    await api.post('/auth/logout');
}
