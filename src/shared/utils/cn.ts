// Junta classes condicionais. Sem clsx/tailwind-merge: este projeto não tem as
// duas dependências do shadcn, e aqui as classes são escritas à mão, sem
// conflito de utilitário para resolver.
export const cn = (...classes: (string | false | null | undefined)[]): string =>
    classes.filter(Boolean).join(' ')
