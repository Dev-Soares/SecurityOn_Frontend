import { useMutation } from "@tanstack/react-query";
import { signUpService } from "../service/signUpService";
import type { SignUp } from "../types/signUp";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUp) => signUpService(data),
  });
};
