import React from 'react'
import { Sun, Moon } from '@phosphor-icons/react'
import { useLocation } from 'react-router-dom'
import useNavigateTo from '../hooks/useNavigateTo'
import LogoIcon from '@/shared/components/LogoIcon'
import { useTheme } from '@/shared/contexts/themeContext'
import { useUser } from '@/shared/contexts/userContext'

const HeaderAvatarSkeleton: React.FC = () => (
  <div className='w-9 h-9 md:w-11 md:h-11 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0 ml-1' />
)

const Header: React.FC = () => {
  const navigateTo = useNavigateTo();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, isLogged, isLoading } = useUser();

  const handleAvatarClick = () => {
    if (isLogged) {
      navigateTo(`/profile/${user?.id}`)
    } else {
      navigateTo('/login')
    }
  }

  return (
    <header className='flex lg:hidden sticky top-0 z-50 py-3 px-5 w-full justify-between items-center gap-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950'>

      {/* Logo + Brand */}
      <div className="flex items-center gap-1">
        <LogoIcon size={48} className="md:w-14 md:h-14" />
        <span className="text-xl md:text-2xl font-bold tracking-tight text-blue-600 dark:text-white">SecurityOn</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 md:gap-2">
        <button
          onClick={toggleTheme}
          aria-label="Alternar tema"
          className="p-2.5 md:p-3 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer"
        >
          {theme === 'dark' ? (
            <Moon size={22} weight="bold" className="md:w-7! md:h-7!" />
          ) : (
            <Sun size={22} weight="bold" className="text-amber-400 md:w-7! md:h-7!" />
          )}
        </button>

        {isLoading ? (
          <HeaderAvatarSkeleton />
        ) : (
          <button
            onClick={handleAvatarClick}
            className={`shrink-0 cursor-pointer ml-1 ${location.pathname === '/profile' ? 'hidden' : ''}`}
          >
            <img
              src={user?.avatarUrl ? user.avatarUrl : '/avatar.png'}
              alt={`${user?.name ?? 'User'} avatar`}
              className="rounded-full w-9 h-9 md:w-11 md:h-11 object-cover border border-gray-200 dark:border-gray-700"
            />
          </button>
        )}
      </div>

    </header>
  )
}

export default Header
