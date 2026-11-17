import React from 'react'
import { DANGER_STEPS } from '../config/dangerConfig'

// Espelha o layout do ComplaintCard: identidade do denunciado à esquerda,
// medidor de risco à direita, título, relato e a linha de ações.
const ComplaintCardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className='w-full flex flex-col p-4 sm:p-5 bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 animate-pulse'
        >
          <div className='flex items-start justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <div className='h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded' />
              <div className='h-3.5 w-40 bg-gray-300/70 dark:bg-gray-700/70 rounded' />
            </div>

            <div className='shrink-0 flex flex-col items-end gap-2'>
              <div className='h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded' />
              <div className='flex items-center gap-1'>
                {Array.from({ length: DANGER_STEPS }).map((_, step) => (
                  <div key={step} className='w-4 h-1 rounded-full bg-gray-300 dark:bg-gray-700' />
                ))}
              </div>
            </div>
          </div>

          <div className='h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mt-3' />

          <div className='flex flex-col gap-2 mt-3'>
            <div className='h-3.5 w-full bg-gray-300/70 dark:bg-gray-700/70 rounded' />
            <div className='h-3.5 w-11/12 bg-gray-300/70 dark:bg-gray-700/70 rounded' />
            <div className='h-3.5 w-2/3 bg-gray-300/70 dark:bg-gray-700/70 rounded' />
          </div>

          <div className='flex items-center gap-4 mt-4'>
            <div className='h-3.5 w-24 bg-gray-300/70 dark:bg-gray-700/70 rounded' />
            <div className='h-3.5 w-20 bg-gray-300/70 dark:bg-gray-700/70 rounded' />
            <div className='h-3.5 w-10 bg-gray-300/70 dark:bg-gray-700/70 rounded ml-auto' />
          </div>
        </div>
      ))}
    </>
  )
}

export default ComplaintCardSkeleton
