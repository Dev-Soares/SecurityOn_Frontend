import { api } from "@/api/axios";
import type { SignUpPayload } from "../types/signUp";

export const signUpService = async (data: SignUpPayload) => {
    await api.post('/user', data);
}
