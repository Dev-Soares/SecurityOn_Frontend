export type DangerType = 'aviso' | 'cuidado' | 'perigo' | 'critico'

export const dangerConfig: Record<DangerType, {
    label: string
    badge: string
    bar: string
}> = {
    aviso: {
        label: 'Aviso',
        badge: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        bar: 'bg-yellow-400',
    },
    cuidado: {
        label: 'Cuidado',
        badge: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        bar: 'bg-orange-500',
    },
    perigo: {
        label: 'Perigo',
        badge: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        bar: 'bg-red-500',
    },
    critico: {
        label: 'Crítico',
        badge: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
        bar: 'bg-red-700',
    },
}