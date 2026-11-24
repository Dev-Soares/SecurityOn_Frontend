export type DangerType = 'aviso' | 'cuidado' | 'perigo' | 'critico'

interface DangerConfig {
    label: string
    // Texto curto do nível, usado no select de criação.
    description: string
    // Posição na escala, preenche o medidor de risco do card.
    rank: 1 | 2 | 3 | 4
    text: string
    // Preenchimento: segmentos do medidor, barras do resumo lateral.
    bar: string
    dot: string
}

export const dangerConfig: Record<DangerType, DangerConfig> = {
    aviso: {
        label: 'Aviso',
        description: 'Requer atenção',
        rank: 1,
        text: 'text-yellow-700 dark:text-yellow-400',
        bar: 'bg-yellow-400',
        dot: 'bg-yellow-500',
    },
    cuidado: {
        label: 'Cuidado',
        description: 'Risco moderado',
        rank: 2,
        text: 'text-orange-700 dark:text-orange-400',
        bar: 'bg-orange-500',
        dot: 'bg-orange-500',
    },
    perigo: {
        label: 'Perigo',
        description: 'Risco alto',
        rank: 3,
        text: 'text-red-700 dark:text-red-400',
        bar: 'bg-red-500',
        dot: 'bg-red-500',
    },
    critico: {
        label: 'Crítico',
        description: 'Risco extremo',
        rank: 4,
        text: 'text-red-800 dark:text-red-300',
        bar: 'bg-red-700',
        dot: 'bg-red-700',
    },
}

// Ordem de severidade, usada nos filtros e no resumo da coluna lateral,
// que leem os níveis do próprio config em vez de repetir a lista.
export const dangerLevels: DangerType[] = ['aviso', 'cuidado', 'perigo', 'critico']

export const DANGER_STEPS = dangerLevels.length
