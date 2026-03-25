import React from 'react'
import { useFindArticleByUser } from '@/modules/articles/hooks/useFindArticleByUser'
import ArticleCard from '@/modules/articles/components/ArticleCard'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import Spinner from '@/shared/utils/Spinner'

interface ProfileArticlesProps {
    userId: string | undefined
}

const ProfileArticles: React.FC<ProfileArticlesProps> = ({ userId }) => {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFindArticleByUser(userId!)

    const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

    const articles = data?.pages.flatMap(page => page.data) ?? []

    if (articles.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-16 gap-2'>
                <p className='text-gray-400 dark:text-gray-500 text-base'>Nenhum artigo ainda</p>
            </div>
        )
    }

    return (
        <div className='flex flex-wrap justify-center gap-6 w-full py-4 px-4'>
            {articles.map(article => (
                <ArticleCard
                    key={article.id}
                    id={String(article.id)}
                    title={article.title}
                    description={article.content}
                    bgUrl={article.bgUrl ?? ''}
                    slug={String(article.id)}
                />
            ))}
            <div ref={observerRef} className='flex justify-center py-8'>
                {isFetchingNextPage && <Spinner  />}
            </div>
        </div>
    )
}

export default ProfileArticles
