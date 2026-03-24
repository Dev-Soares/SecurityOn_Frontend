import { api } from "@/api/axios";
import type { SignIn } from "../types/signIn";

export const signInService = async (data: SignIn) => {
    await api.post('/auth/login', data);
}
