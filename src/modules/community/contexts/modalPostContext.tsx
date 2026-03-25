import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalPostContextType {
    isOpen: boolean
    open: () => void
    close: () => void
}

const ModalPostContext = createContext<ModalPostContextType | undefined>(undefined)

export const ModalPostProvider = ({ children }: { children: ReactNode }) => {

    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return (
        <ModalPostContext.Provider value={{ isOpen, open, close }}>
            {children}
        </ModalPostContext.Provider>
    );
}

export const useModalPost = () => {
    const context = useContext(ModalPostContext);
    if (!context) {
        throw new Error('useModalPost must be used within a ModalPostProvider');
    }
    return context;
};
