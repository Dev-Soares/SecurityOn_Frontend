import { useQuery } from "@tanstack/react-query";
import { getUserService } from "../service/getUserService";

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserService(id),
  });
};

export default useGetUser;
