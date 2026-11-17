import React from 'react'
import { Article } from '@phosphor-icons/react'
import { useFindArticleByUser } from '@/modules/articles/hooks/useFindArticleByUser'
import ArticleCard from '@/modules/articles/components/ArticleCard'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import Spinner from '@/shared/components/Spinner'
import EmptyState from '@/shared/components/EmptyState'

interface ProfileArticlesProps {
    userId: string | undefined
}

const ProfileArticles: React.FC<ProfileArticlesProps> = ({ userId }) => {

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useFindArticleByUser(userId!)

    const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

    const articles = data?.pages.flatMap(page => page.data) ?? []

    if (isLoading) {
        return (
            <div className='flex justify-center py-16'>
                <Spinner />
            </div>
        )
    }

    if (articles.length === 0) {
        return (
            <EmptyState
                icon={<Article size={40} weight='light' />}
                title='Nenhum artigo publicado'
                description='Os artigos escritos por este perfil aparecem aqui.'
            />
        )
    }

    return (
        <div className='flex flex-col gap-4 w-full'>
            {/* Duas colunas já bastam: a coluna do perfil é mais estreita que a
                página de Artigos, e três cards aqui virariam selos. */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {articles.map(article => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        variant='grid'
                    />
                ))}
            </div>
            <div ref={observerRef} className='flex justify-center py-6'>
                {isFetchingNextPage && <Spinner />}
            </div>
        </div>
    )
}

export default ProfileArticles
