import React, { useMemo, useState } from 'react'
import { Plus, Flag } from '@phosphor-icons/react'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import ComplaintCard from '@/modules/complaints/components/ComplaintCard'
import ComplaintsAside from '@/modules/complaints/components/ComplaintsAside'
import ComplaintCardSkeleton from '@/modules/complaints/skeletons/ComplaintCardSkeleton'
import SearchBar from '@/shared/components/SearchBar'
import ErrorMessage from '@/shared/components/ErrorMessage'
import useFindAllComplaints from '@/modules/complaints/hooks/useFindAllComplaints'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import Spinner from '@/shared/components/Spinner'

const ComplaintsPage: React.FC = () => {

  const navigateTo = useNavigateTo()

  const [search, setSearch] = useState('')

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useFindAllComplaints()

  const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

  const complaints = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  )

  // Busca local, sobre o que já foi carregado — a API ainda não tem busca de
  // denúncia. A loja entra no termo: é por ela que se procura aqui.
  const visible = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return complaints

    return complaints.filter(({ title, content, store }) =>
      `${title} ${content} ${store ?? ''}`.toLowerCase().includes(term),
    )
  }, [complaints, search])

  const isSearching = search.trim().length > 0

  return (
    <main className='pt-5 sm:pt-8 pb-28 md:pb-16'>
      <div className='mx-auto w-full max-w-6xl px-3 sm:px-4 xl:px-8 flex gap-8'>

        {/* Feed */}
        <div className='flex-1 min-w-0 max-w-2xl mx-auto xl:mx-0 flex flex-col gap-3 sm:gap-4'>

          <header className='flex items-start justify-between gap-4 px-1'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Denúncias</h1>
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                Golpes e fraudes reportados pela comunidade
              </p>
            </div>

            <button
              onClick={() => navigateTo('/create-complaint')}
              className='hidden lg:flex shrink-0 items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-sm shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer'
            >
              <Plus size={18} weight='bold' />
              Fazer denúncia
            </button>
          </header>

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder='Buscar por loja, título ou relato...'
          />

          {isLoading && (
            <div className='flex flex-col gap-3 sm:gap-4'>
              <ComplaintCardSkeleton count={4} />
            </div>
          )}

          {isError && (
            <ErrorMessage
              message='Não foi possível carregar as denúncias.'
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !isError && visible.length === 0 && (
            <div className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 py-16 px-6 flex flex-col items-center text-center'>
              <span className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500'>
                <Flag size={24} weight='bold' />
              </span>
              <p className='mt-4 text-gray-500 dark:text-gray-400'>
                {isSearching
                  ? `Nenhuma denúncia encontrada para "${search.trim()}".`
                  : 'Nenhuma denúncia publicada ainda.'}
              </p>
              {isSearching && (
                <button
                  onClick={() => setSearch('')}
                  className='mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer'
                >
                  Limpar busca
                </button>
              )}
            </div>
          )}

          {visible.length > 0 && (
            <div className='flex flex-col gap-3 sm:gap-4'>
              {visible.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          )}

          <div ref={observerRef} className='flex justify-center py-8'>
            {isFetchingNextPage && <Spinner />}
          </div>
        </div>

        <ComplaintsAside complaints={complaints} />
      </div>

      {/* Ação principal no mobile, acima da navegação de baixo. */}
      <button
        onClick={() => navigateTo('/create-complaint')}
        className='lg:hidden fixed bottom-24 right-4 z-20 flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg cursor-pointer transition-colors duration-200'
      >
        <Plus size={20} weight='bold' />
        Denunciar
      </button>
    </main>
  )
}

export default ComplaintsPage
