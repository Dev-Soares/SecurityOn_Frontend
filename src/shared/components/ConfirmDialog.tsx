import React from 'react'
import Modal from './Modal'
import Spinner from './Spinner'

interface ConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    isLoading?: boolean
    variant?: 'danger' | 'primary'
}

const variantMap = {
    danger: 'bg-red-500 hover:bg-red-600',
    primary: 'bg-blue-500 hover:bg-blue-600',
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    isLoading = false,
    variant = 'danger',
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} isLocked={isLoading} size='sm'>
            <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
                {message}
            </p>

            <div className='flex items-center justify-end gap-2 mt-6'>
                <button
                    onClick={onClose}
                    disabled={isLoading}
                    className='px-4 py-2 text-sm font-medium rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer disabled:cursor-not-allowed transition-colors duration-200'
                >
                    {cancelLabel}
                </button>
                <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={`px-5 py-2 text-sm font-semibold rounded-full text-white ${variantMap[variant]} disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200 min-w-[96px] flex items-center justify-center`}
                >
                    {isLoading ? <Spinner size='sm' className='border-white border-t-transparent' /> : confirmLabel}
                </button>
            </div>
        </Modal>
    )
}

export default ConfirmDialog
