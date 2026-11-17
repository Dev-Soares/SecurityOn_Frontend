import React from 'react'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import { ArrowRight, ShareNetwork } from '@phosphor-icons/react'
import ArticleAuthorLine from './ArticleAuthorLine'
import { excerptOf, readTimeOf } from '../utils/articleMeta'
import { shareLink } from '@/shared/utils/shareLink'
import type { Article } from '../types/article'

// 'feature': primeiro artigo do feed — capa grande, título maior.
// 'row': resto do feed — texto à esquerda, miniatura à direita, como num feed profissional.
// 'grid': coluna estreita do perfil — card vertical compacto.
type ArticleCardVariant = 'feature' | 'row' | 'grid'

interface ArticleCardProps {
    article: Article
    variant?: ArticleCardVariant
}

const surfaceByVariant: Record<ArticleCardVariant, string> = {
    feature: 'bg-gray-100 dark:bg-gray-900',
    row: 'bg-gray-100 dark:bg-gray-900',
    grid: 'bg-white dark:bg-gray-900',
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'row' }) => {
    const navigateTo = useNavigateTo()

    const open = () => navigateTo(`/articles/${article.id}`)

    // O card todo é clicável: compartilhar não pode abrir o artigo junto.
    const onShare = (e: React.MouseEvent) => {
        e.stopPropagation()
        shareLink({
            title: article.title,
            text: article.title,
            url: `${window.location.origin}/articles/${article.id}`,
        })
    }

    const isFeature = variant === 'feature'
    const isRow = variant === 'row'

    const readTime = readTimeOf(article.content)
    const excerpt = excerptOf(article.content, isFeature ? 240 : 160)

    // Artigo antigo em cache (ou API sem o include do autor) não tem user:
    // o feed cai no userId em vez de quebrar o card inteiro.
    const author = article.user ?? { id: article.userId, name: 'Autor' }

    // Capa no topo no destaque e no grid; na linha ela vira miniatura ao lado do texto.
    const cover = article.bgUrl && !isRow && (
        <div className={`w-full overflow-hidden ${isFeature ? 'h-48 sm:h-64' : 'h-36'}`}>
            <img
                src={article.bgUrl}
                alt=''
                loading='lazy'
                className='w-full h-full object-cover bg-gray-200 dark:bg-gray-800 transition-transform duration-500 ease-out group-hover:scale-[1.03]'
            />
        </div>
    )

    return (
        <article
            onClick={open}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    open()
                }
            }}
            role='link'
            tabIndex={0}
            aria-label={article.title}
            className={`
                group w-full flex flex-col overflow-hidden cursor-pointer
                ${surfaceByVariant[variant]}
                rounded-2xl
                border border-gray-200 dark:border-gray-800
                hover:border-gray-300 dark:hover:border-gray-700
                focus-visible:outline-2 focus-visible:outline-blue-500
                transition-colors duration-200
            `}
        >
            {cover}

            <div className={`flex flex-col flex-1 p-4 ${isFeature || isRow ? 'sm:p-5' : ''}`}>
                <ArticleAuthorLine
                    author={author}
                    createdAt={article.createdAt}
                    readTime={readTime}
                    avatarSize={isFeature ? 40 : 36}
                />

                <div className='flex gap-3 sm:gap-5 mt-3.5 flex-1'>
                    <div className='flex-1 min-w-0'>
                        <h3
                            className={`
                                font-bold tracking-tight leading-snug
                                text-gray-900 dark:text-white
                                group-hover:text-blue-600 dark:group-hover:text-blue-400
                                transition-colors duration-200
                                ${isFeature ? 'text-lg sm:text-2xl line-clamp-3' : 'text-[15px] sm:text-lg line-clamp-2'}
                            `}
                        >
                            {article.title}
                        </h3>

                        <p
                            className={`
                                mt-2 leading-relaxed text-gray-600 dark:text-gray-400
                                ${isFeature ? 'text-sm line-clamp-3' : 'text-[13px] sm:text-sm line-clamp-2'}
                            `}
                        >
                            {excerpt}
                        </p>
                    </div>

                    {isRow && article.bgUrl && (
                        <div className='shrink-0 w-20 h-20 sm:w-40 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden'>
                            <img
                                src={article.bgUrl}
                                alt=''
                                loading='lazy'
                                className='w-full h-full object-cover bg-gray-200 dark:bg-gray-800'
                            />
                        </div>
                    )}
                </div>

                <div className='flex items-center justify-between pt-3 mt-3 sm:mt-4 border-t border-gray-200 dark:border-gray-800'>
                    <span className='flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2.5 transition-all duration-300'>
                        Ler artigo
                        <ArrowRight size={15} weight='bold' />
                    </span>

                    <button
                        onClick={onShare}
                        aria-label='Compartilhar artigo'
                        className='p-2 -mr-2 rounded-full cursor-pointer text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200'
                    >
                        <ShareNetwork size={18} weight='bold' />
                    </button>
                </div>
            </div>
        </article>
    )
}

export default ArticleCard
