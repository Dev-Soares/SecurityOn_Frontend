import { api } from "@/api/axios";
import type { SignUp } from "../types/signUp";

export const signUpService = async (data: SignUp) => {
    await api.post('/user', data);
}
