import React from 'react'

const ArticleCardSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <>
    {Array.from({ length: count }).map((_, i) => (
    <div key={i}
      className="
        flex flex-col
        w-full sm:w-[calc(50%-16px)] xl:w-[calc(33.333%-20px)]
        bg-gray-200 dark:bg-gray-800/60
        rounded-2xl overflow-hidden
        border border-gray-300/60 dark:border-gray-700/40
        animate-pulse
      "
    >
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700" />

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />

        {/* Description */}
        <div className="h-3 w-full bg-gray-300/70 dark:bg-gray-700/70 rounded" />
        <div className="h-3 w-5/6 bg-gray-300/70 dark:bg-gray-700/70 rounded" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-300/50 dark:border-gray-700/50">
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 w-10 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
    ))}
    </>
  )
}

export default ArticleCardSkeleton
