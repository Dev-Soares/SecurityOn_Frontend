import React from 'react'

type CountBadgeVariant = 'solid' | 'soft' | 'onPrimary' | 'overlay'

interface CountBadgeProps {
    // Já vem formatado pelo hook (ex.: '3', '10+'); null/'' não renderiza nada.
    value: string | null | undefined
    variant?: CountBadgeVariant
    // O que o número conta, lido por leitor de tela junto do valor.
    label?: string
    className?: string
}

// Selo chapado: sem sombra, sem anel. Altura fixa e largura mínima quadrada
// fazem '1' e '10+' terem o mesmo desenho de pílula, e tabular-nums mantém os
// dígitos na mesma largura, então o número não "pula" quando o total muda.
const baseStyle = 'inline-flex items-center justify-center shrink-0 h-4.5 min-w-4.5 px-1.5 rounded-full text-[11px] font-semibold leading-none tabular-nums'

const variantMap: Record<CountBadgeVariant, string> = {
    solid: 'bg-blue-500 text-white',
    soft: 'bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-300',
    // Sobre fundo azul (aba ativa): translúcido em vez de um segundo azul.
    onPrimary: 'bg-white/25 text-white',
    // Sobreposto a um ícone: o anel da cor do fundo recorta o selo do ícone.
    overlay: 'bg-blue-500 text-white ring-2 ring-white dark:ring-gray-950',
}

const CountBadge: React.FC<CountBadgeProps> = ({ value, variant = 'solid', label = 'pedidos pendentes', className = '' }) => {

    if (!value) return null

    return (
        <span
            role='status'
            aria-label={`${value} ${label}`}
            className={`${baseStyle} ${variantMap[variant]} ${className}`}
        >
            {value}
        </span>
    )
}

export default CountBadge
