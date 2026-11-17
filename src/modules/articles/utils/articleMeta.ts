// 200 palavras por minuto é a média de leitura adulta — o mesmo número que
// Medium e LinkedIn usam no selo de "x min de leitura".
export const readTimeOf = (content: string): string =>
  `${Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))} min`

// Resumo do card. Corta no limite de palavra para não terminar no meio de uma.
export const excerptOf = (content: string, max = 180): string => {
  const flat = content.replace(/\s+/g, ' ').trim()
  if (flat.length <= max) return flat
  const cut = flat.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

// Iniciais para o avatar de quem não tem foto — melhor que um boneco genérico
// repetido em todos os cards do feed.
export const initialsOf = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
