import React from 'react'
import useNavigateTo from '../hooks/useNavigateTo'
import { DotsThree } from '@phosphor-icons/react'
import { useUser } from '../contexts/userContext'

const ProfileCardSkeleton: React.FC = () => (
  <div className='flex items-center gap-3 p-3 w-full rounded-full animate-pulse'>
    <div className='w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0' />
    <div className='flex flex-col gap-2 min-w-0 flex-1'>
      <div className='h-3.5 w-24 bg-gray-200 dark:bg-gray-700 rounded' />
      <div className='h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded' />
    </div>
    <div className='w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0' />
  </div>
)

const ProfileCard: React.FC = ({}) => {

  const { user, isLogged, isLoading } = useUser()

  const navigateTo = useNavigateTo();

  if (isLoading) return <ProfileCardSkeleton />

  return (
    <div className='flex items-center gap-3 p-3 w-full rounded-full hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors duration-200 cursor-pointer'
      onClick={ isLogged? () => navigateTo('/profile') : ()=> navigateTo('/login')}>
      <img src={user?.avatarUrl ? user.avatarUrl : '/avatar.png'} alt={`${user?.name} avatar`} className='w-11 h-11 rounded-full object-cover shrink-0' />
      <div className='flex flex-col min-w-0 flex-1'>
        <span className='font-bold text-sm text-gray-900 dark:text-white truncate'>{user ? user.name : 'Convidado'}</span>
        <span className='text-xs text-gray-500 dark:text-gray-400 truncate'>@{user ? user.name.toLowerCase().replace(/\s+/g, '') : 'convidado'}</span>

      </div>
      <button
        onClick={(e) => { e.stopPropagation(); }}
        className='p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer shrink-0'>
        <DotsThree size={20} weight="bold" className="text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  )
}

export default ProfileCard
