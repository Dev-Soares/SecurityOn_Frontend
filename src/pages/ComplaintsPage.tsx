import React, { useState } from 'react'
import { Plus } from '@phosphor-icons/react'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import ComplaintCard from '@/modules/complaints/components/ComplaintCard'
import ComplaintCardSkeleton from '@/modules/complaints/skeletons/ComplaintCardSkeleton'
import ErrorMessage from '@/shared/utils/ErrorMessage'
import useFindAllComplaints from '@/modules/complaints/hooks/useFindAllComplaints'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import Spinner from '@/shared/utils/Spinner'


type DangerFilter = 'todos' | 'aviso' | 'cuidado' | 'perigo' | 'critico'

const filters: { value: DangerFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'aviso', label: 'Aviso' },
  { value: 'cuidado', label: 'Cuidado' },
  { value: 'perigo', label: 'Perigo' },
  { value: 'critico', label: 'Crítico' },
]


const ComplaintsPage: React.FC = () => {

  const navigateTo = useNavigateTo()
  const [activeFilter, setActiveFilter] = useState<DangerFilter>('todos')

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

  const complaints = data?.pages.flatMap((page) => page.data) ?? []
  const filtered = activeFilter === 'todos' ? complaints : complaints.filter(c => c.danger === activeFilter)

  return (
    <main className='min-h-screen pb-28 md:pb-16 lg:pb-0 lg:py-8 lg:px-8 flex flex-col items-center gap-6 bg-white dark:bg-gray-950'>

      {/* Header */}
      <div className='w-full max-w-4xl px-4 pt-4'>
        <div className='flex items-center justify-between'>
          <div className='mt-8'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Denúncias da Comunidade</h1>
            <p className='text-sm text-gray-500 dark:text-gray-400 mt-0.5'>Ajude a proteger outros usuários reportando golpes e fraudes</p>
          </div>
          <button onClick={() => navigateTo('/create-complaint')} className='hidden lg:flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer text-sm'>
            <Plus size={18} weight="bold" />
            Fazer Denúncia
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className='w-full max-w-4xl px-4 flex flex-col gap-2'>
        <div className='flex items-center gap-2 flex-wrap'>
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                ${activeFilter === f.value
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {!isLoading && !isError && (
          <span className='text-xs text-gray-400 dark:text-gray-500'>{filtered.length} denúncia{filtered.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {/* FAB mobile */}
      <button onClick={() => navigateTo('/create-complaint')} className='lg:hidden fixed bottom-24 right-4 flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-lg cursor-pointer z-10'>
        <Plus size={20} weight="bold" />
        Denunciar
      </button>

        <div className='flex flex-col gap-4 w-full max-w-2xl px-4 mt-8'>
          {isLoading && (
            <ComplaintCardSkeleton count={6} />
          )}

          {isError && (
            <ErrorMessage
              message="Não foi possível carregar as denúncias."
              onRetry={() => refetch()}
            />
          )}

          {filtered.map((c) => (
            <ComplaintCard
              key={c.id}
              title={c.title}
              content={c.content}
              date={c.createdAt}
              danger={c.danger}
              store={c.store}
              link={c.link}
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

export default ComplaintsPage
