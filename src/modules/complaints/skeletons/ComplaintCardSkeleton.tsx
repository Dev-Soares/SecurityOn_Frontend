import React from 'react'

const ComplaintCardSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <>
    {Array.from({ length: count }).map((_, i) => (
    <div key={i} className="w-full flex flex-row bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse">
      {/* Left accent bar */}
      <div className="w-1 shrink-0 self-stretch bg-gray-300 dark:bg-gray-700" />

      <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1 min-w-0">
        {/* Badge + store + date row */}
        <div className="flex items-center gap-3">
          <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="h-3 w-20 bg-gray-300/70 dark:bg-gray-700/70 rounded" />
          <div className="h-3 w-24 bg-gray-300/70 dark:bg-gray-700/70 rounded ml-auto" />
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />

        {/* Content */}
        <div className="space-y-2">
          <div className="h-3.5 w-full bg-gray-300/70 dark:bg-gray-700/70 rounded" />
          <div className="h-3.5 w-5/6 bg-gray-300/70 dark:bg-gray-700/70 rounded" />
        </div>

        {/* Link */}
        <div className="h-3 w-20 bg-gray-300/70 dark:bg-gray-700/70 rounded mt-1" />
      </div>
    </div>
    ))}
    </>
  )
}

export default ComplaintCardSkeleton
