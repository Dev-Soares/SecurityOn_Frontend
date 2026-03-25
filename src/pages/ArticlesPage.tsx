import React from 'react'
import ArticleCard from '@/modules/articles/components/ArticleCard'
import SearchBar from '@/shared/components/SearchBar'
import useFindAllArticles from '@/modules/articles/hooks/useFindAllArticles'
import ArticleCardSkeleton from '@/modules/articles/skeletons/ArticleCardSkeleton'
import ErrorMessage from '@/shared/components/ErrorMessage'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import Spinner from '@/shared/components/Spinner'

const ArticlesPage: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useFindAllArticles()

  const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

  const articles = data?.pages.flatMap((page) => page.data) ?? []

  return (
    <main className='pb-16 pt-4'>
      <div className='p-2 flex justify-center items-center'>
        <SearchBar />
      </div>

      <div className='px-4 xl:px-8 mt-6 max-w-6xl mx-auto'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Artigos</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Leia sobre segurança e proteção</p>
      </div>

      <div className='p-2 px-4 xl:px-8 flex flex-wrap justify-center gap-6 mt-4 max-w-6xl mx-auto'>
        {isLoading && ( <ArticleCardSkeleton count={9}/> ) }

        {isError && (
          <div className="w-full">
            <ErrorMessage
              message="Não foi possível carregar os artigos."
              onRetry={() => refetch()}
            />
          </div>
        )}

        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.content.substring(0, 150) + '...'}
            bgUrl={article.bgUrl ?? ''}
            imgUrl={article.imgUrl}
            id={String(article.id)}
            slug={String(article.id)}
          />
        ))}
      </div>

      <div ref={observerRef} className='flex justify-center py-8'>
        {isFetchingNextPage && (
          <Spinner />
        )}
      </div>
    </main>
  )
}

export default ArticlesPage
