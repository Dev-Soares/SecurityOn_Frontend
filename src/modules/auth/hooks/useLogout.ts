import { useMutation } from "@tanstack/react-query";
import { logoutService } from "../service/logoutService";

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logoutService(),
  });
};
