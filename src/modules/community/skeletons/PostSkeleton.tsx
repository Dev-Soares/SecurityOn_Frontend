import React from 'react'

const PostSkeleton: React.FC<{ count?: number }> = ({ count = 2 }) => {
  return (
    <>
    {Array.from({ length: count }).map((_, i) => (
    <div key={i} className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col rounded-2xl overflow-hidden w-full md:w-[70%] xl:w-[50%] animate-pulse">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 shrink-0" />
        <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* Mídia */}
      <div className="px-5">
        <div className="w-full h-72 rounded-xl bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* Ações */}
      <div className="flex items-center gap-5 px-6 pt-5">
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* Curtidas e legenda */}
      <div className="flex flex-col gap-2 px-5 pt-4 pb-5">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-full bg-gray-300/70 dark:bg-gray-700/70 rounded" />
        <div className="h-4 w-2/3 bg-gray-300/70 dark:bg-gray-700/70 rounded" />
      </div>
    </div>
    ))}
    </>
  )
}

export default PostSkeleton
