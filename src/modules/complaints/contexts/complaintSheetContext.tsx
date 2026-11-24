import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

interface ComplaintSheetContextType {
    isOpen: boolean
    open: () => void
    close: () => void
}

const ComplaintSheetContext = createContext<ComplaintSheetContextType | undefined>(undefined)

// O formulário de denúncia é chamado de três telas diferentes (feed, verificar
// site e o card sem resultado), então quem guarda o aberto/fechado fica acima
// de todas elas, na casca do app.
export const ComplaintSheetProvider = ({ children }: { children: ReactNode }) => {

    const [isOpen, setIsOpen] = useState(false)

    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])

    return (
        <ComplaintSheetContext.Provider value={{ isOpen, open, close }}>
            {children}
        </ComplaintSheetContext.Provider>
    )
}

export const useComplaintSheet = () => {
    const context = useContext(ComplaintSheetContext)
    if (!context) {
        throw new Error('useComplaintSheet must be used within a ComplaintSheetProvider')
    }
    return context
}
