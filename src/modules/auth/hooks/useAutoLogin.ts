import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInService } from "../service/signInService";
import type { SignIn } from "../types/signIn";
import { showSuccess } from "@/shared/components/Toast";
import useNavigateTo from "@/shared/hooks/useNavigateTo";

export const useAutoLogin = () => {
    const queryClient = useQueryClient()
    const navigateTo = useNavigateTo()

    return useMutation({
        mutationFn: (data: SignIn) => signInService(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['me'] })
            showSuccess('Conta criada com sucesso!')
            navigateTo('/')
        },
        onError: () => {
            showSuccess('Conta criada com sucesso!')
            navigateTo('/login')
        }
    });
};
