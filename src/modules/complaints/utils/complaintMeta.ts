// O link vem do formulário como o usuário digitou, "www.loja.com/golpe" é comum.
// Sem protocolo o href virava caminho relativo e o "Ver site" abria a própria aplicação.
export const absoluteUrl = (link: string): string =>
    /^https?:\/\//i.test(link) ? link : `https://${link}`

// Domínio para rotular o link no card: num feed, "loja-falsa-exemplo.com" diz mais
// que a URL inteira, e o resto do caminho só estoura a largura do card.
export const domainOf = (link: string): string => {
    try {
        return new URL(absoluteUrl(link)).hostname.replace(/^www\./, '')
    } catch {
        return link
    }
}

// Limite de caracteres a partir do qual o card mostra "ver mais" em vez do texto todo.
export const EXCERPT_LIMIT = 280

export const isLongContent = (content: string): boolean => content.length > EXCERPT_LIMIT

// Corta no fim da última palavra inteira, para o trecho não terminar no meio de uma.
export const excerptOf = (content: string): string => {
    if (!isLongContent(content)) return content

    const cut = content.slice(0, EXCERPT_LIMIT)
    const lastSpace = cut.lastIndexOf(' ')

    return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}
