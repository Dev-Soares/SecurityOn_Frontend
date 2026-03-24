import type { UpdateUser } from "../types/updateUser";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateUserService } from "../service/updateUserService";

export const useUpdateUser = (id:string, data: UpdateUser) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updateUserService(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user']})
    })

}
