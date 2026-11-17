import React, { useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import RiskMeter from './RiskMeter'
import { dangerConfig } from '../config/dangerConfig'
import { absoluteUrl, domainOf, excerptOf, isLongContent } from '../utils/complaintMeta'
import { formatFullDate, formatRelativeTime } from '@/shared/utils/formatRelativeTime'
import { shareLink } from '@/shared/utils/shareLink'
import { showError, showSuccess } from '@/shared/components/Toast'
import type { Complaint } from '../types/complaint'

// 'feed': card da listagem de denúncias, que define a largura da coluna central.
// 'compact': coluna estreita do perfil — mesmo card com respiro menor.
type ComplaintCardVariant = 'feed' | 'compact'

interface ComplaintCardProps {
    complaint: Complaint
    variant?: ComplaintCardVariant
}

const surfaceByVariant: Record<ComplaintCardVariant, string> = {
    feed: 'bg-gray-100 dark:bg-gray-900',
    compact: 'bg-white dark:bg-gray-900',
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, variant = 'feed' }) => {

    const { title, content, store, link, danger, createdAt } = complaint

    const [expanded, setExpanded] = useState(false)

    // danger é String no banco: um valor fora dos quatro níveis não pode derrubar o card.
    const level = danger && danger in dangerConfig ? danger : 'aviso'

    const isFeed = variant === 'feed'
    const isLong = isLongContent(content)

    const onShare = async () => {
        const result = await shareLink({
            title: title,
            text: store ? `${title} — ${store}` : title,
            // Sem página de detalhe, o destino útil é o site denunciado;
            // sem link, a própria listagem.
            url: link ? absoluteUrl(link) : `${window.location.origin}/complaint`,
        })

        if (result === 'copied') showSuccess('Link copiado')
        if (result === 'failed') showError('Não foi possível compartilhar')
    }

    const onCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(absoluteUrl(link!))
            showSuccess('Link do site copiado')
        } catch {
            showError('Não foi possível copiar o link')
        }
    }

    return (
        <article
            className={`
                relative w-full flex flex-col
                ${surfaceByVariant[variant]} ${isFeed ? 'p-4 sm:p-5' : 'p-4'}
                rounded-2xl border border-gray-200 dark:border-gray-800
                hover:border-gray-300 dark:hover:border-gray-700
                transition-colors duration-200
            `}
        >
            {/* O medidor fica ancorado no canto do card, não no fluxo: a linha de cima
                ora é a loja, ora o título, e no fluxo ele mudava de lugar junto.
                O pr nos blocos de texto é a faixa que fica reservada para ele. */}
            <div className={`absolute ${isFeed ? 'top-4 right-4 sm:top-5 sm:right-5' : 'top-4 right-4'}`}>
                <RiskMeter danger={level} />
            </div>

            {/* Quem foi denunciado abre o card: é por loja e por domínio que se procura
                aqui. Denúncia sem os dois (golpe por telefone, por exemplo) começa
                direto no título. */}
            {(store || link) && (
                <div className='min-w-0 flex flex-col gap-0.5 mb-2 pr-28'>
                    {store && (
                        <p className='text-[15px] font-semibold text-gray-900 dark:text-white truncate'>
                            {store}
                        </p>
                    )}

                    {link && (
                        <a
                            href={absoluteUrl(link)}
                            target='_blank'
                            rel='noopener noreferrer nofollow'
                            className='inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 min-w-0'
                        >
                            <span className='truncate'>{domainOf(link)}</span>
                            <ArrowUpRight size={14} weight='bold' className='shrink-0' />
                        </a>
                    )}
                </div>
            )}

            {/* O pr segue aqui mesmo quando a loja aparece acima: com loja sem site,
                aquela linha é baixa demais para cobrir a altura do medidor sozinha. */}
            <h3 className={`pr-28 font-bold tracking-tight leading-snug text-gray-900 dark:text-white ${isFeed ? 'text-[17px] sm:text-xl' : 'text-base'}`}>
                {title}
            </h3>

            {/* Relato inteiro no card, sem página de detalhe: longo demais abre no 'ver mais'
                em vez de cortar a informação que protege quem está lendo. */}
            <p className='mt-2 text-sm sm:text-[15px] leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line wrap-break-word'>
                {expanded || !isLong ? content : excerptOf(content)}
                {isLong && !expanded && (
                    <button
                        onClick={() => setExpanded(true)}
                        className='ml-1 font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200'
                    >
                        ver mais
                    </button>
                )}
            </p>

            {isLong && expanded && (
                <button
                    onClick={() => setExpanded(false)}
                    className='self-start mt-1 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200'
                >
                    ver menos
                </button>
            )}

            <div className='flex items-center gap-4 mt-4 text-sm'>
                <button
                    onClick={onShare}
                    className='font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200'
                >
                    Compartilhar
                </button>

                {link && (
                    <button
                        onClick={onCopyLink}
                        className='font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200'
                    >
                        Copiar link
                    </button>
                )}

                <time
                    dateTime={createdAt}
                    title={formatFullDate(createdAt)}
                    className='ml-auto shrink-0 text-gray-400 dark:text-gray-500'
                >
                    {formatRelativeTime(createdAt)}
                </time>
            </div>
        </article>
    )
}

export default ComplaintCard
