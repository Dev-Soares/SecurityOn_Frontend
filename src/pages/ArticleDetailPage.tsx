import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, ShareNetwork, CalendarBlank } from '@phosphor-icons/react'
import useGetArticle from '@/modules/articles/hooks/useGetArticle'
import ArticleDetailSkeleton from '@/modules/articles/skeletons/ArticleDetailSkeleton'
import ErrorMessage from '@/shared/utils/ErrorMessage'
import { shareLink } from '@/shared/utils/shareLink'

const ArticleDetailPage: React.FC = () => {

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  const { data: article, isLoading, error, refetch } = useGetArticle(String(id))

  if (isLoading) return <ArticleDetailSkeleton />

  if (error || !article) {
    return (
      <main className='pb-20 min-h-screen w-full'>
        <div className='mx-auto max-w-3xl px-6 md:px-10 pt-6'>
          <button
            onClick={() => navigate('/articles')}
            className='
              flex items-center gap-2 mb-8
              text-sm font-medium cursor-pointer
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-gray-200
              transition-colors duration-200
            '
          >
            <ArrowLeft size={18} weight="bold" />
            <span>Voltar</span>
          </button>
          <ErrorMessage
            title="Erro ao carregar artigo"
            message="Não foi possível encontrar este artigo. Verifique sua conexão e tente novamente."
            onRetry={() => refetch()}
          />
        </div>
      </main>
    )
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const paragraphs = article.content.split('\n').filter((p: string) => p.trim() !== '')

  const readTime = `${Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200))} min`

  return (
    <main className='pb-20 min-h-screen w-full'>
      <div className='mx-auto max-w-3xl px-6 md:px-10 pt-6'>

        {/* Top nav */}
        <div className='flex items-center justify-between mb-8'>
          <button
            onClick={() => navigate('/articles')}
            className='
              flex items-center gap-2
              text-sm font-medium cursor-pointer
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-gray-200
              transition-colors duration-200
            '
          >
            <ArrowLeft size={18} weight="bold" />
            <span>Voltar</span>
          </button>

          <button
            onClick={() => shareLink({ 
              title: article.title, text: article.title, url: window.location.href 
            })}
            className='
              p-2 rounded-lg cursor-pointer
              text-gray-400 dark:text-gray-500
              hover:text-gray-600 dark:hover:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800/50
              transition-all duration-200
            '
            aria-label='Compartilhar'
          >
            <ShareNetwork size={20} weight="bold" />
          </button>
        </div>

        {/* Title */}
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white'>
          {article.title}
        </h1>

        {/* Meta row */}
        <div className='flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400'>
          <div className='flex items-center gap-1.5'>
            <CalendarBlank size={14} weight="bold" />
            <span>{formattedDate}</span>
          </div>

          <span className='w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600' />

          <div className='flex items-center gap-1.5'>
            <Clock size={14} weight="bold" />
            <span>{readTime} de leitura</span>
          </div>
        </div>

        {/* Hero image */}
        {article.bgUrl && (
          <div className='mt-8 rounded-xl overflow-hidden'>
            <img
              src={article.bgUrl}
              alt={article.title}
              className='w-full h-56 md:h-72 lg:h-80 object-cover'
            />
          </div>
        )}

        {/* Article body */}
        <article className='mt-8 space-y-5'>
          {paragraphs.map((paragraph: string, index: number) => (
            <p
              key={index}
              className='text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300'
            >
              {paragraph}
            </p>
          ))}
        </article>

        {/* Bottom divider */}
        <div className='mt-10 h-px bg-gray-200 dark:bg-gray-800' />

        {/* Bottom actions */}
        <div className='flex items-center justify-between mt-6'>
          <button
            onClick={() => navigate('/articles')}
            className='
              flex items-center gap-2
              text-sm font-medium cursor-pointer
              text-blue-600 dark:text-blue-400
              hover:text-blue-700 dark:hover:text-blue-300
              transition-colors duration-200
            '
          >
            <ArrowLeft size={16} weight="bold" />
            <span>Todos os artigos</span>
          </button>

          <button
            onClick={() => shareLink({ 
              title: article.title, text: article.title, url: window.location.href
             })}
            className='
              flex items-center gap-2
              px-4 py-2 rounded-full
              text-sm font-medium cursor-pointer
              bg-blue-500 hover:bg-blue-600
              text-white
              transition-colors duration-200
            '
          >
            <ShareNetwork size={16} weight="bold" />
            <span className='hidden sm:inline'>Compartilhar</span>
          </button>
        </div>
      </div>
    </main>
  )
}

export default ArticleDetailPage
