import React from 'react'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import AuthorAvatar from './AuthorAvatar'
import { formatFullDate, formatRelativeTime } from '@/shared/utils/formatRelativeTime'
import type { ArticleAuthor } from '../types/article'

type ArticleAuthorLineProps = {
    author: ArticleAuthor
    createdAt: string
    readTime: string
    avatarSize?: number
}

// Assinatura do artigo: autor, quando saiu e quanto tempo leva para ler.
// Mesma linha no card do feed e no topo do artigo aberto.
const ArticleAuthorLine: React.FC<ArticleAuthorLineProps> = ({
    author,
    createdAt,
    readTime,
    avatarSize = 40,
}) => {
    const navigateTo = useNavigateTo()

    // O card inteiro é clicável e leva ao artigo — o clique no autor precisa parar aqui
    // antes de o pai abrir a leitura.
    const goToProfile = (e: React.MouseEvent) => {
        e.stopPropagation()
        navigateTo(`/profile/${author.id}`)
    }

    return (
        <div className='flex items-center gap-3 min-w-0'>
            <button onClick={goToProfile} className='cursor-pointer shrink-0' aria-label={`Perfil de ${author.name}`}>
                <AuthorAvatar author={author} size={avatarSize} />
            </button>

            <div className='flex flex-col min-w-0'>
                <button
                    onClick={goToProfile}
                    className='text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline truncate text-left'
                >
                    {author.name}
                </button>

                <div className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400'>
                    <time dateTime={createdAt} title={formatFullDate(createdAt)}>
                        {formatRelativeTime(createdAt)}
                    </time>
                    <span className='w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600' />
                    <span>{readTime} de leitura</span>
                </div>
            </div>
        </div>
    )
}

export default ArticleAuthorLine
