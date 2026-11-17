import React from 'react'
import { initialsOf } from '../utils/articleMeta'
import type { ArticleAuthor } from '../types/article'

type AuthorAvatarProps = {
    author: ArticleAuthor
    size?: number
    className?: string
}

// Sem foto cai nas iniciais em vez do boneco padrão: num feed de artigos o mesmo
// placeholder repetido em dez cards vira ruído visual.
const AuthorAvatar: React.FC<AuthorAvatarProps> = ({ author, size = 40, className = '' }) => {
    const style = { width: size, height: size }

    if (author.avatarUrl) {
        return (
            <img
                src={author.avatarUrl}
                alt={`${author.name} avatar`}
                style={style}
                className={`rounded-full object-cover shrink-0 bg-gray-200 dark:bg-gray-800 ${className}`}
            />
        )
    }

    return (
        <span
            style={style}
            aria-hidden
            className={`
                shrink-0 rounded-full flex items-center justify-center
                bg-blue-500/10 dark:bg-blue-400/10
                text-blue-600 dark:text-blue-400
                font-semibold select-none
                ${size <= 32 ? 'text-[11px]' : 'text-sm'}
                ${className}
            `}
        >
            {initialsOf(author.name)}
        </span>
    )
}

export default AuthorAvatar
