import React, { useState } from 'react'
import { useUser } from '@/shared/contexts/userContext'
import MobileDrawer from './MobileDrawer'

const HeaderAvatarSkeleton: React.FC = () => (
  <div className='w-9 h-9 md:w-11 md:h-11 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0' />
)

const Header: React.FC = () => {
  const { user, isLoading } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
    <header className='flex lg:hidden sticky top-0 z-50 py-3 px-5 w-full justify-start items-center gap-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950'>

      {isLoading ? (
        <HeaderAvatarSkeleton />
      ) : (
        <button
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={isDrawerOpen}
          className="shrink-0 cursor-pointer"
        >
          <img
            src={user?.avatarUrl ? user.avatarUrl : '/avatar.png'}
            alt={`${user?.name ?? 'User'} avatar`}
            className="rounded-full w-9 h-9 md:w-11 md:h-11 object-cover border border-gray-200 dark:border-gray-700"
          />
        </button>
      )}

    </header>

    <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}

export default Header
