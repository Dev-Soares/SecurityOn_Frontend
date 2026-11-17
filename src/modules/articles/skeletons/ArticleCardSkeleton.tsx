import React from 'react'

// Espelha o card de linha do feed: assinatura em cima, texto à esquerda,
// miniatura à direita e rodapé — para a lista não pular quando os dados chegam.
const ArticleCardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className='
            w-full flex flex-col p-4 sm:p-5
            bg-gray-100 dark:bg-gray-900
            border border-gray-200 dark:border-gray-800
            rounded-2xl animate-pulse
          '
        >
          {/* Assinatura */}
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 shrink-0' />
            <div className='flex flex-col gap-2'>
              <div className='h-3 w-28 bg-gray-300 dark:bg-gray-700 rounded' />
              <div className='h-2.5 w-36 bg-gray-300/70 dark:bg-gray-700/70 rounded' />
            </div>
          </div>

          {/* Texto + miniatura */}
          <div className='flex gap-3 sm:gap-5 mt-3.5'>
            <div className='flex-1 flex flex-col gap-2.5'>
              <div className='h-4 w-4/5 bg-gray-300 dark:bg-gray-700 rounded' />
              <div className='h-4 w-3/5 bg-gray-300 dark:bg-gray-700 rounded' />
              <div className='h-3 w-full bg-gray-300/70 dark:bg-gray-700/70 rounded mt-1' />
              <div className='h-3 w-5/6 bg-gray-300/70 dark:bg-gray-700/70 rounded' />
            </div>
            <div className='shrink-0 w-20 h-20 sm:w-40 sm:h-28 rounded-lg sm:rounded-xl bg-gray-300 dark:bg-gray-700' />
          </div>

          {/* Rodapé */}
          <div className='flex items-center justify-between pt-3 mt-3 sm:mt-4 border-t border-gray-200 dark:border-gray-800'>
            <div className='h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded' />
            <div className='h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700' />
          </div>
        </div>
      ))}
    </>
  )
}

export default ArticleCardSkeleton
