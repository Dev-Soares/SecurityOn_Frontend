import React from 'react'

const SignupSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col animate-pulse">
      {/* Header gradient area */}
      <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-b-3xl" />

      {/* Form area */}
      <div className="flex flex-col gap-6 px-8 pt-10">
        {/* Title */}
        <div className="h-8 w-44 bg-gray-300 dark:bg-gray-700 rounded" />

        {/* Progress bar */}
        <div className="flex gap-2">
          <div className="h-1.5 flex-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="h-1.5 flex-1 bg-gray-300/50 dark:bg-gray-700/50 rounded-full" />
          <div className="h-1.5 flex-1 bg-gray-300/50 dark:bg-gray-700/50 rounded-full" />
        </div>

        {/* Field 1 */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-12 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded-lg" />
        </div>

        {/* Field 2 */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-12 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded-lg" />
        </div>

        {/* Next button */}
        <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded-lg" />

        {/* Login link */}
        <div className="h-4 w-48 bg-gray-300/70 dark:bg-gray-700/70 rounded self-center" />
      </div>
    </div>
  )
}

export default SignupSkeleton
