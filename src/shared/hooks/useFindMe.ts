import { findMeService } from "../services/findMeService"
import { useQuery } from "@tanstack/react-query"

export const useFindMe = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: () =>  findMeService()
    })
}