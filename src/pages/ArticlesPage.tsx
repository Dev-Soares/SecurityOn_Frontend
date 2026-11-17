import React, { useMemo, useState } from 'react'
import ArticleCard from '@/modules/articles/components/ArticleCard'
import ArticlesAside from '@/modules/articles/components/ArticlesAside'
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

  const [search, setSearch] = useState('')

  const articles = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  )

  // Filtro local, sobre o que já foi carregado — a API ainda não tem busca de artigo.
  // O autor entra no termo: num feed se procura tanto pelo assunto quanto por quem escreveu.
  const visibleArticles = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return articles

    return articles.filter(({ title, content, user }) =>
      `${title} ${content} ${user?.name ?? ''}`.toLowerCase().includes(term),
    )
  }, [articles, search])

  const isSearching = search.trim().length > 0

  const [feature, ...rest] = visibleArticles

  return (
    <main className='pb-16 pt-5 sm:pt-8'>
      <div className='mx-auto w-full max-w-6xl px-3 sm:px-4 xl:px-8 flex gap-8'>

        {/* Feed */}
        <div className='flex-1 min-w-0 max-w-2xl mx-auto xl:mx-0 flex flex-col gap-3 sm:gap-4'>

          <header className='px-1'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Artigos</h1>
            <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
              Leia sobre segurança e proteção
            </p>
          </header>

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder='Buscar por título, conteúdo ou autor...'
          />

          {isLoading && (
            <div className='flex flex-col gap-3 sm:gap-4'>
              <ArticleCardSkeleton count={4} />
            </div>
          )}

          {isError && (
            <ErrorMessage
              message='Não foi possível carregar os artigos.'
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !isError && visibleArticles.length === 0 && (
            <div className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 py-16 px-6 text-center'>
              <p className='text-gray-500 dark:text-gray-400'>
                {isSearching
                  ? `Nenhum artigo encontrado para "${search.trim()}".`
                  : 'Nenhum artigo publicado ainda.'}
              </p>
            </div>
          )}

          {visibleArticles.length > 0 && (
            <div className='flex flex-col gap-3 sm:gap-4'>
              {/* O primeiro artigo abre o feed em destaque — menos durante a busca,
                  onde nenhum resultado é mais importante que os outros. */}
              <ArticleCard
                key={feature.id}
                article={feature}
                variant={isSearching ? 'row' : 'feature'}
              />

              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} variant='row' />
              ))}
            </div>
          )}

          <div ref={observerRef} className='flex justify-center py-8'>
            {isFetchingNextPage && <Spinner />}
          </div>
        </div>

        <ArticlesAside articles={articles} />
      </div>
    </main>
  )
}

export default ArticlesPage
