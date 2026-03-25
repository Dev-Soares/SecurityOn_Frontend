import { createContext, useContext, type ReactNode } from "react";
import type { User } from "@/modules/profile/types/user";
import { useFindMe } from "../hooks/useFindMe";

interface UserContextType {
    user: User | null
    isLoading: boolean
    isLogged: boolean | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {

    const { data, isLoading } = useFindMe()

    const user = data?.data ?? null

    const isLogged = !isLoading && !!user


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