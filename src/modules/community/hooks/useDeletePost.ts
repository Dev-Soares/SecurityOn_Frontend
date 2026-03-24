import { useQueryClient, useMutation } from "@tanstack/react-query"
import { deletePostService } from "../service/deletePostService";

export const useDeletePost = (id:string) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deletePostService(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts']})
    })
}
