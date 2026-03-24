import type { UpdateComplaint } from "../types/updateComplaint";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateComplaintService } from "../service/updateComplaintService";

export const useUpdateComplaint = (id:string, data: UpdateComplaint) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updateComplaintService(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['complaints']})
    })
}
