import type { UpdateArticle } from "../types/updateArticle";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateArticleService } from "../service/updateArticle";

export const useUpdateArticle = (id:string, data: UpdateArticle) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updateArticleService(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles']})
    })

}