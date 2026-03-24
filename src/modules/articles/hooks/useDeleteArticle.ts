import { useQueryClient, useMutation } from "@tanstack/react-query"
import { deleteArticleService } from "../service/deleteArticleService";

export const useDeleteArticle = (id:string) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteArticleService(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles']})
    })
}