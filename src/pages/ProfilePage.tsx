import React, { useState } from 'react'
import ProfileBanner from '../modules/profile/components/ProfileBanner'
import { PencilSimple } from '@phosphor-icons/react'
import ProfileInfo from '../modules/profile/components/ProfileInfo'

const ProfilePage: React.FC = () => {

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <main className='min-h-screen pb-32 md:pb-24 lg:pb-16 flex flex-col bg-white dark:bg-gray-950'>
      <div className="w-full relative flex flex-col">
        <ProfileBanner />

        {/* Profile info area - offset for avatar */}
        <div className='px-6 sm:px-8 pt-20 lg:pt-24 flex flex-col gap-5'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col gap-0.5'>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1'>UserName</h1>
              <p className='text-base text-gray-500 dark:text-gray-400'>@UserName</p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full
                text-sm font-medium cursor-pointer
                transition-all duration-200
                ${isEditing
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600'
                }
              `}
            >
              <PencilSimple size={18} weight="bold" />
              <span className='text-base'>Editar</span>
            </button>
          </div>

          <ProfileInfo />
        </div>
      </div>
    </main>
  )
}

export default ProfilePage
