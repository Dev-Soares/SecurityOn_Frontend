import { useMutation } from "@tanstack/react-query";
import { signUpService } from "../service/signUpService";
import type { SignUpPayload } from "../types/signUp";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpPayload) => signUpService(data),
  });
};
