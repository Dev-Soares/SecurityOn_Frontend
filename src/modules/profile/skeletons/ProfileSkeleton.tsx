import React from 'react'

const ProfileSkeleton: React.FC = () => {
  return (
    <main className='min-h-screen pb-28 md:pb-20 lg:pb-10 bg-gray-50 dark:bg-gray-950 animate-pulse'>
      <div className='mx-auto w-full max-w-5xl px-3 sm:px-6 py-4 sm:py-6 flex flex-col gap-4 xl:grid xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-6 xl:items-start'>

        {/* Cabeçalho */}
        <section className='xl:col-span-2 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'>
          <div className='h-28 sm:h-40 lg:h-48 w-full bg-gray-200 dark:bg-gray-800' />

          <div className='px-4 sm:px-6 pb-5'>
            <div className='flex items-end justify-between gap-3 -mt-12 sm:-mt-16'>
              <div className='w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-300 dark:bg-gray-700 ring-4 ring-white dark:ring-gray-900' />
              <div className='h-10 w-36 rounded-full bg-gray-200 dark:bg-gray-800' />
            </div>

            <div className='mt-4 flex flex-col gap-2'>
              <div className='h-6 w-48 rounded bg-gray-300 dark:bg-gray-700' />
              <div className='h-4 w-32 rounded bg-gray-200 dark:bg-gray-800' />
              <div className='h-4 w-56 rounded bg-gray-200 dark:bg-gray-800' />
            </div>

            <div className='mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-4 gap-2'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='h-12 rounded-xl bg-gray-200 dark:bg-gray-800' />
              ))}
            </div>
          </div>
        </section>

        {/* Trilho lateral */}
        <aside className='flex flex-col gap-4 xl:col-start-2 xl:row-start-2'>
          <div className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex flex-col gap-3'>
            <div className='h-4 w-24 rounded bg-gray-300 dark:bg-gray-700' />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='h-9 rounded-xl bg-gray-200 dark:bg-gray-800' />
            ))}
          </div>
        </aside>

        {/* Abas + conteúdo */}
        <div className='min-w-0 flex flex-col gap-4 xl:col-start-1 xl:row-start-2'>
          <div className='flex gap-1 p-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='flex-1 h-10 rounded-xl bg-gray-200 dark:bg-gray-800' />
            ))}
          </div>

          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 flex flex-col gap-4'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800' />
                <div className='h-4 w-32 rounded bg-gray-200 dark:bg-gray-800' />
              </div>
              <div className='h-40 rounded-xl bg-gray-200 dark:bg-gray-800' />
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}

export default ProfileSkeleton
