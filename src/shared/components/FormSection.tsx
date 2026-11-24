import React from 'react'
import { WarningCircle } from '@phosphor-icons/react'

interface FormSectionProps {
    title: string
    description?: string
    // Linha acima da seção, para separar um bloco do anterior.
    divided?: boolean
    children: React.ReactNode
}

/** Bloco padrão de formulário: título e descrição sempre acima dos campos. */
export const FormSection: React.FC<FormSectionProps> = ({ title, description, divided, children }) => (
    <section className={`flex flex-col gap-4 ${divided ? 'border-t border-border pt-6' : ''}`}>
        <div className='flex flex-col gap-0.5'>
            {/* Azul nos títulos de seção: o do painel é neutro, então o azul aqui
                marca onde cada bloco começa sem disputar com ele. */}
            <h2 className='text-base font-bold text-primary'>{title}</h2>
            {description && <p className='text-sm text-pretty text-muted-foreground'>{description}</p>}
        </div>

        {children}
    </section>
)

/** Erro de envio do formulário, exibido acima das ações. */
export const FormError: React.FC<{ message?: string | null }> = ({ message }) => {
    if (!message) return null

    return (
        <p role='alert' className='flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive'>
            <WarningCircle size={16} weight='bold' className='shrink-0' />
            {message}
        </p>
    )
}

/** Título da página: na cor primária, com descrição opcional abaixo. */
export const PageHeader: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
    <header className='flex flex-col gap-1'>
        <h1 className='text-3xl font-black tracking-tight text-primary'>{title}</h1>
        {description && <p className='text-sm text-muted-foreground'>{description}</p>}
    </header>
)
