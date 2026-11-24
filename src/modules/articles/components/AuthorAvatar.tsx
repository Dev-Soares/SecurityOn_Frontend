import React from 'react'
import type { ArticleAuthor } from '../types/article'

type AuthorAvatarProps = {
    author: ArticleAuthor
    size?: number
    className?: string
}

// Mesma assinatura visual do feed de posts: foto de perfil quando existe,
// e o avatar padrão quando não, nunca iniciais.
const AuthorAvatar: React.FC<AuthorAvatarProps> = ({ author, size = 40, className = '' }) => (
    <img
        src={author.avatarUrl || '/avatar.png'}
        alt={`${author.name} avatar`}
        style={{ width: size, height: size }}
        className={`rounded-full object-cover shrink-0 bg-gray-200 dark:bg-gray-800 ${className}`}
    />
)

export default AuthorAvatar
