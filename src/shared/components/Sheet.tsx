import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from '@phosphor-icons/react'
import { useDialogDismiss } from '../hooks/useDialogDismiss'

interface SheetProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description?: string
    children: React.ReactNode
    // Trava o fechamento por backdrop/Esc enquanto uma mutation está em voo:
    // sair no meio deixa a pessoa sem saber se a ação foi ou não.
    isLocked?: boolean
}

// Painel que entra pela direita, por cima da tela atual. É o Modal da casa
// deitado na borda: mesmo backdrop, mesmo Esc, mesma trava de scroll — o que
// muda é a forma, que aqui precisa caber um formulário inteiro sem virar uma
// caixa quadrada no meio da tela.
const Sheet: React.FC<SheetProps> = ({ isOpen, onClose, title, description, children, isLocked = false }) => {

    useDialogDismiss(isOpen, onClose, isLocked)

    const panelRef = useRef<HTMLElement>(null)

    // O foco entra no painel ao abrir: sem isso o Tab continua passeando pelo
    // feed atrás do backdrop.
    useEffect(() => {
        if (isOpen) panelRef.current?.focus()
    }, [isOpen])

    if (!isOpen) return null

    return createPortal(
        <div className='fixed inset-0 z-60 flex justify-end'>
            <div
                className='absolute inset-0 animate-fade-in bg-black/40 backdrop-blur-sm'
                onClick={isLocked ? undefined : onClose}
            />

            <aside
                ref={panelRef}
                role='dialog'
                aria-modal='true'
                aria-label={title}
                tabIndex={-1}
                className='relative z-10 flex h-dvh w-full max-w-xl animate-sheet-right flex-col border-l border-border bg-background shadow-2xl shadow-black/20 outline-none sm:rounded-l-2xl'
            >
                {/* O cabeçalho é a única superfície tingida do painel: separa o que
                    é moldura do que é formulário, sem precisar de uma linha extra. */}
                <header className='flex items-start justify-between gap-4 border-b border-border bg-muted/40 px-5 py-4 sm:rounded-tl-2xl sm:px-6'>
                    <div className='min-w-0'>
                        <h2 className='text-lg font-bold tracking-tight text-foreground'>{title}</h2>
                        {description && (
                            <p className='mt-0.5 text-sm text-muted-foreground'>{description}</p>
                        )}
                    </div>

                    <button
                        type='button'
                        onClick={onClose}
                        disabled={isLocked}
                        aria-label='Fechar'
                        className='shrink-0 cursor-pointer rounded-lg p-1.5 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed'
                    >
                        <X size={20} weight='bold' />
                    </button>
                </header>

                {/* O conteúdo preenche o que sobra e manda no próprio respiro e
                    na própria rolagem: formulário longo precisa rolar os campos e
                    deixar a ação parada embaixo, e isso só funciona se as duas
                    partes forem irmãs aqui dentro. */}
                <div className='flex min-h-0 flex-1 flex-col'>
                    {children}
                </div>
            </aside>
        </div>,
        document.body,
    )
}

export default Sheet
