import React from 'react'

const ProfileSkeleton: React.FC = () => {
  return (
    <main className="min-h-screen pb-32 md:pb-24 lg:pb-16 lg:py-8 lg:px-8 flex flex-col gap-6 bg-white dark:bg-gray-950 animate-pulse">
      <div className="w-full relative flex flex-col rounded-b-3xl">

        {/* Banner */}
        <div className="bg-gray-300 dark:bg-gray-700 h-40 lg:h-56 rounded-b-2xl lg:rounded-b-xl" />

        {/* Avatar */}
        <div className="absolute top-26 lg:top-38 left-6 sm:left-8">
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white dark:border-gray-950 bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="bg-none h-30 rounded-t-3xl w-full flex flex-col items-start justify-start p-4 sm:p-6 pt-12 sm:pt-16 gap-4 sm:gap-6 md:gap-6 mb-8">
          {/* Name + username */}
          <div className="flex flex-col gap-2 mt-6">
            <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-5 w-32 bg-gray-300/70 dark:bg-gray-700/70 rounded" />
          </div>

          {/* Edit button */}
          <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg" />

          {/* Tabs */}
          <nav className="flex border-b w-full border-gray-200 dark:border-gray-800">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-[33.33%] pb-3 flex justify-center">
                <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </nav>
        </div>
      </div>
    </main>
  )
}

export default ProfileSkeleton
