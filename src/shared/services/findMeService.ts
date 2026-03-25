import { api } from "@/api/axios"

export const findMeService = () => {
    return api.get('user/me')
}