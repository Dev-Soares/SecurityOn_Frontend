import { useQueryClient, useMutation } from "@tanstack/react-query"
import { deleteComplaintService } from "../service/deleteComplaintService";

export const useDeleteComplaint = (id:string) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteComplaintService(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['complaints']})
    })
}
