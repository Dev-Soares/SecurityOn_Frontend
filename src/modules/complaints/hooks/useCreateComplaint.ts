import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComplaintService } from "../service/createComplaintService";
import type { CreateComplaint } from "../types/createComplaint";

export const useCreateComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateComplaint) => createComplaintService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
  });
};
