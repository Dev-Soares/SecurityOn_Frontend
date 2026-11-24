type Dados = {
    title: string
    text: string
    url: string
}

// 'shared' saiu pela folha de compartilhamento do sistema, 'copied' caiu no
// clipboard (navegador de desktop, que não tem navigator.share), 'failed' quando
// nem isso deu, aí quem chamou decide o que avisar.
export type ShareResult = 'shared' | 'copied' | 'failed'

export const shareLink = async (dados: Dados): Promise<ShareResult> => {
    if (navigator.share) {
        try {
            await navigator.share(dados)
            return 'shared'
        } catch (error) {
            // Cancelar a folha de compartilhamento rejeita a promise: não é erro,
            // e cair no clipboard depois disso copiaria sem o usuário pedir.
            if (error instanceof DOMException && error.name === 'AbortError') return 'failed'
        }
    }

    try {
        await navigator.clipboard.writeText(dados.url)
        return 'copied'
    } catch {
        return 'failed'
    }
}
