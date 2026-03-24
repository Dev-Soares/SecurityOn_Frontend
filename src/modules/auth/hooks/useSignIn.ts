import { useMutation } from "@tanstack/react-query";
import { signInService } from "../service/signInService";
import type { SignIn } from "../types/signIn";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (data: SignIn) => signInService(data),
  });
};
