import React from 'react'
import ProfileBanner from '../ui/ProfileBanner'
import { PencilSimpleIcon } from '@phosphor-icons/react'
import ProfileInfo from '../ui/ProfileInfo'
import {useState} from 'react'

const ProfileContent: React.FC = () => {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  
  
  return (

    <main className='min-h-screen pb-32 md:pb-24 lg:pb-16 lg:py-8 lg:px-8 flex flex-col gap-6 bg-white dark:bg-gray-950'>
      <div className="w-full relative flex flex-col rounded-b-3xl">
        <ProfileBanner />
        <div className='bg-none h-30 rounded-t-3xl w-full flex flex-col items-start justify-start p-4 sm:p-6 pt-12 sm:pt-16 gap-4 sm:gap-6 md:gap-6 mb-8'>
            <div className='flex flex-col gap-1 mt-6'>
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white'>UserName</h1>
              <p className='text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300'>@UserName</p>
            </div>
            <div className='flex gap-3'>
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className={`px-3 py-2 md:px-4 md:py-2.5 rounded-lg hover:scale-105 transition-all duration-500 flex items-center gap-2 cursor-pointer group ${
                  isEditing 
                    ? 'bg-blue-600 dark:bg-blue-600' 
                    : 'bg-gray-100 dark:bg-gray-900 hover:bg-blue-600 dark:hover:bg-blue-600'
                }`}
              >
                <PencilSimpleIcon 
                  size={20} 
                  weight="regular" 
                  className={`transition-colors duration-300 ${
                    isEditing 
                      ? 'text-white' 
                      : 'text-blue-600 dark:text-gray-200 group-hover:text-white'
                  }`} 
                />
                <p className={`text-sm md:text-base lg:text-lg font-semibold cursor-pointer transition-colors duration-300 ${
                  isEditing 
                    ? 'text-white' 
                    : 'text-blue-600 dark:text-gray-200 group-hover:text-white'
                }`}>Editar</p>
              </button>
            </div>
            <ProfileInfo />
        </div>
        
      </div>
    </main>
  )
}

export default ProfileContent
