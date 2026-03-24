import type { UpdatePost } from "../types/updatePost";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updatePostService } from "../service/updatePostService";

export const useUpdatePost = (id:string, data: UpdatePost) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updatePostService(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts']})
    })

}
