import React from 'react'

const ArticleDetailSkeleton: React.FC = () => {
  return (
    <main className="pb-20 min-h-screen w-full animate-pulse">
      <div className="mx-auto max-w-3xl px-6 md:px-10 pt-6">

        {/* Top nav */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-lg" />
        </div>

        {/* Title */}
        <div className="space-y-3">
          <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-8 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

        {/* Hero image */}
        <div className="mt-8 rounded-xl overflow-hidden">
          <div className="w-full h-56 md:h-72 lg:h-80 bg-gray-300 dark:bg-gray-700 rounded-xl" />
        </div>

        {/* Article body */}
        <div className="mt-8 space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full bg-gray-300/70 dark:bg-gray-700/70 rounded" />
              <div className="h-4 w-full bg-gray-300/70 dark:bg-gray-700/70 rounded" />
              <div className="h-4 w-3/4 bg-gray-300/70 dark:bg-gray-700/70 rounded" />
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="mt-10 h-px bg-gray-200 dark:bg-gray-800" />

        {/* Bottom actions */}
        <div className="flex items-center justify-between mt-6">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </main>
  )
}

export default ArticleDetailSkeleton
