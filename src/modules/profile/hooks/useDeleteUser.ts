import { useQueryClient, useMutation } from "@tanstack/react-query"
import { deleteUserService } from "../service/deleteUserService";

export const useDeleteUser = (id:string) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteUserService(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user']})
    })
}
