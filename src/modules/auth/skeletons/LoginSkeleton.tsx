import React from 'react'

const LoginSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col animate-pulse">
      {/* Header gradient area */}
      <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-b-3xl" />

      {/* Form area */}
      <div className="flex flex-col gap-6 px-8 pt-10">
        {/* Title */}
        <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-56 bg-gray-300/70 dark:bg-gray-700/70 rounded" />

        {/* Email field */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-12 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded-lg" />
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-12 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded-lg" />
        </div>

        {/* Forgot password */}
        <div className="h-4 w-36 bg-gray-300/70 dark:bg-gray-700/70 rounded self-end" />

        {/* Submit button */}
        <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded-lg" />

        {/* Create account link */}
        <div className="h-4 w-44 bg-gray-300/70 dark:bg-gray-700/70 rounded self-center" />
      </div>
    </div>
  )
}

export default LoginSkeleton
