import React from 'react'

const PostSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 h-auto px-6 flex flex-col rounded-2xl gap-4 w-full pt-6 pb-2 md:w-[70%] xl:w-[50%] animate-pulse">
      {/* Header */}
      <div className="flex flex-row gap-3 items-center">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 shrink-0" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 w-20 bg-gray-300/70 dark:bg-gray-700/70 rounded" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 mt-1">
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300/70 dark:bg-gray-700/70 rounded" />
          <div className="h-4 w-full bg-gray-300/70 dark:bg-gray-700/70 rounded" />
          <div className="h-4 w-2/3 bg-gray-300/70 dark:bg-gray-700/70 rounded" />
        </div>
        {/* Image placeholder */}
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-xl" />
      </div>

      {/* Actions */}
      <div className="flex flex-row items-center justify-around border-t border-gray-200 dark:border-gray-800 py-3 mt-2 -mx-2">
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  )
}

export default PostSkeleton
