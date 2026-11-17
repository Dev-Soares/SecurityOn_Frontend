import React from 'react'

interface EmptyStateProps {
    icon: React.ReactNode
    title: string
    description: string
}

// Lista vazia não é conteúdo: não ganha card nem fundo próprio. Só o ícone em
// traço fino e o texto, centrados no espaço que a lista ocuparia.
const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => (
    <div className='flex flex-col items-center justify-center text-center gap-3 py-20 px-6'>
        <span aria-hidden className='text-gray-400 dark:text-gray-500'>
            {icon}
        </span>

        <div className='flex flex-col gap-1'>
            <p className='text-[15px] font-semibold text-gray-700 dark:text-gray-200'>{title}</p>
            <p className='text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-[34ch]'>{description}</p>
        </div>
    </div>
)

export default EmptyState
