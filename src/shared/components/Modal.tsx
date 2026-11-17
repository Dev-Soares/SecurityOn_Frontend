import React from 'react'
import { createPortal } from 'react-dom'
import { X } from '@phosphor-icons/react'
import { useDialogDismiss } from '../hooks/useDialogDismiss'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    // Trava o fechamento por backdrop/Esc enquanto uma mutation está em voo:
    // sair no meio deixa o usuário sem saber se a ação foi ou não.
    isLocked?: boolean
    size?: 'sm' | 'md'
}

const sizeMap = {
    sm: 'max-w-md',
    md: 'max-w-lg',
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, isLocked = false, size = 'md' }) => {

    useDialogDismiss(isOpen, onClose, isLocked)

    if (!isOpen) return null

    // z acima do diálogo de comentários: editar/excluir sempre abre por cima dele.
    // Portal pelo mesmo motivo — fixed dentro de um ancestral animado ficaria preso.
    return createPortal(
        <div className='fixed inset-0 z-60 flex items-center justify-center animate-fade-in'>
            <div
                className='absolute inset-0 bg-black/40 backdrop-blur-sm'
                onClick={isLocked ? undefined : onClose}
            />

            <div
                role='dialog'
                aria-modal='true'
                aria-label={title}
                className={`scrollbar-slim relative bg-white dark:bg-gray-900 rounded-2xl ${sizeMap[size]} w-full mx-4 max-h-[90dvh] overflow-y-auto p-6 z-10 border border-gray-200 dark:border-gray-800`}
            >
                <div className='flex justify-between items-center mb-5 gap-4'>
                    <h2 className='text-lg font-bold text-gray-900 dark:text-white'>
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        disabled={isLocked}
                        aria-label='Fechar'
                        className='p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 shrink-0'
                    >
                        <X size={20} weight='bold' />
                    </button>
                </div>

                {children}
            </div>
        </div>,
        document.body,
    )
}

export default Modal
