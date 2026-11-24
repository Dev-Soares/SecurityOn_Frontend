import React from 'react'
import type { Icon } from '@phosphor-icons/react'
import { cn } from '@/shared/utils/cn'

export const fieldSurface =
    'w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm text-foreground ' +
    'outline-none transition-colors placeholder:text-muted-foreground ' +
    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 ' +
    'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-[3px] aria-[invalid=true]:ring-destructive/20 ' +
    'disabled:cursor-not-allowed disabled:opacity-50'

interface FieldShellProps {
    id: string
    label: string
    hint?: string
    error?: string
    optional?: boolean
    // Dica acima do controle. Para campo alto (textarea), embaixo ela fica longe
    // demais de onde se escreve para ainda servir de orientação.
    hintAbove?: boolean
    count?: { value: number; max: number }
    children: React.ReactNode
}

// A partir de quanto do limite o contador aparece. Antes disso é um número que
// não ajuda em nada embaixo de cada campo.
const NEAR_LIMIT = 0.8

// Casca do campo: rótulo em caixa alta, dica ou erro embaixo, contador só perto
// do limite. Mesmo desenho do FormField do template.
export const FieldShell: React.FC<FieldShellProps> = ({ id, label, hint, error, optional, hintAbove, count, children }) => {

    const nearLimit = Boolean(count) && count!.value >= count!.max * NEAR_LIMIT

    const hintNode = hint && !error && (
        <span id={`${id}-hint`} className='text-xs leading-relaxed text-muted-foreground'>
            {hint}
        </span>
    )

    return (
        <div className='flex flex-col gap-1.5'>
            <div className='flex items-baseline justify-between gap-3'>
                <label
                    htmlFor={id}
                    className='text-base font-bold text-foreground'
                >
                    {label}
                    {optional && <span className='ml-1.5 text-sm font-medium text-muted-foreground'>(opcional)</span>}
                </label>

                {nearLimit && (
                    <span
                        role='status'
                        className={cn(
                            'shrink-0 text-xs tabular-nums',
                            count!.value >= count!.max ? 'font-bold text-destructive' : 'text-muted-foreground',
                        )}
                    >
                        {count!.value}/{count!.max}
                    </span>
                )}
            </div>

            {hintAbove && hintNode}

            {children}

            {error ? (
                <span id={`${id}-error`} role='alert' className='text-xs font-semibold text-destructive'>
                    {error}
                </span>
            ) : (!hintAbove && hintNode)}
        </div>
    )
}

type FormFieldProps = Omit<FieldShellProps, 'children'> & {
    icon?: Icon
} & React.InputHTMLAttributes<HTMLInputElement>

/** Input de uma linha com rótulo, ícone opcional à esquerda e erro acessível. */
const FormField: React.FC<FormFieldProps> = ({ id, label, hint, error, optional, count, icon: Icon, className, ...rest }) => (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} count={count}>
        <div className='relative'>
            {Icon && (
                <Icon
                    aria-hidden
                    size={16}
                    className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground opacity-70'
                />
            )}

            <input
                id={id}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                className={cn(fieldSurface, Icon && 'pl-9', className)}
                {...rest}
            />
        </div>
    </FieldShell>
)

export default FormField
