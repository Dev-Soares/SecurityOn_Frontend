import React from 'react'
import { cn } from '@/shared/utils/cn'

type Variant = 'default' | 'outline' | 'ghost'
type Size = 'default' | 'lg'

type ButtonProps = {
    variant?: Variant
    size?: Size
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const base =
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent ' +
    'font-bold whitespace-nowrap transition-all outline-none select-none ' +
    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 ' +
    'active:translate-y-px disabled:pointer-events-none disabled:opacity-50'

const byVariant: Record<Variant, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/85',
    outline: 'border-border bg-background text-foreground hover:bg-muted',
    ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
}

const bySize: Record<Size, string> = {
    default: 'h-10 px-4 text-sm',
    lg: 'h-12 w-full px-5 text-base',
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', size = 'default', className, ...rest }) => (
    <button className={cn(base, byVariant[variant], bySize[size], className)} {...rest} />
)

export default Button
