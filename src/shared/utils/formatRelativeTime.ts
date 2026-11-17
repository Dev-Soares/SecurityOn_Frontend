// Tempo curto no cabeçalho do post: "agora", "12 min", "4 h", "3 d".
// Acima de uma semana vira data, que já é mais legível que "63 d".
export const formatRelativeTime = (isoDate: string): string => {
    const date = new Date(isoDate)
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

    if (seconds < 60) return 'agora'

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} min`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} h`

    const days = Math.floor(hours / 24)
    if (days < 7) return `${days} d`

    const isSameYear = date.getFullYear() === new Date().getFullYear()

    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        ...(isSameYear ? {} : { year: 'numeric' }),
    })
}

// Data completa, para o title do elemento — o tempo relativo perde a informação exata.
export const formatFullDate = (isoDate: string): string =>
    new Date(isoDate).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
