import { useEffect } from 'react'

// Comportamento comum a qualquer camada sobreposta: fecha no Esc e trava o scroll
// da página atrás. Sem a trava, rolar dentro do diálogo arrasta o feed junto.
export const useDialogDismiss = (isOpen: boolean, onClose: () => void, isLocked = false) => {
    useEffect(() => {
        if (!isOpen) return

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !isLocked) onClose()
        }

        document.addEventListener('keydown', onKeyDown)

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = previousOverflow
        }
    }, [isOpen, isLocked, onClose])
}
