import React from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { cn } from '@/shared/utils/cn'
import { dangerConfig, dangerLevels } from '../config/dangerConfig'

interface DangerScaleProps {
    // register('danger') do react-hook-form, espalhado em cada radio.
    registration: UseFormRegisterReturn
    labelledBy?: string
    describedBy?: string
    invalid?: boolean
}

// Os quatro níveis são uma escala, e o card do feed já mostra isso em traços.
// Escolher aqui é apontar um ponto da mesma escala: cada opção acende os traços
// até o seu nível, na cor que o card vai usar.
const DangerScale: React.FC<DangerScaleProps> = ({ registration, labelledBy, describedBy, invalid }) => (
    <div
        role='radiogroup'
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        className='grid grid-cols-2 gap-2 sm:grid-cols-4'
    >
        {dangerLevels.map((level, index) => {

            const config = dangerConfig[level]

            return (
                <label
                    key={level}
                    className={cn(
                        'flex cursor-pointer flex-col gap-2 rounded-lg border bg-card p-3 transition-colors',
                        invalid ? 'border-destructive' : 'border-input',
                        'hover:border-ring/60',
                        'has-checked:border-primary has-checked:bg-primary/5',
                        'has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50',
                    )}
                >
                    <input type='radio' value={level} className='sr-only' {...registration} />

                    <span aria-hidden className='flex items-center gap-1'>
                        {dangerLevels.map((_, segment) => (
                            <span
                                key={segment}
                                className={cn(
                                    'h-1 flex-1 rounded-full',
                                    segment <= index ? config.bar : 'bg-muted',
                                )}
                            />
                        ))}
                    </span>

                    <span className={cn('text-sm font-bold', config.text)}>{config.label}</span>

                    <span className='text-xs leading-snug text-muted-foreground'>{config.description}</span>
                </label>
            )
        })}
    </div>
)

export default DangerScale
