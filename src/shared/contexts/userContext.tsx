import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "@/modules/profile/types/user";
import { useFindMe } from "../hooks/useFindMe";

interface UserContextType {
    user: User | null
    isLoading: boolean
    isLogged: boolean | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)

    const [isLogged, setIsLogged] = useState<boolean>(false)

    const { data, isLoading } = useFindMe()

    useEffect(() => {
        const userData = data?.data ?? null
        setUser(userData)
        setIsLogged(userData ? true : false)
    }, [data])

    return (
        <UserContext.Provider value={{ user, isLoading, isLogged }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context =  useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};