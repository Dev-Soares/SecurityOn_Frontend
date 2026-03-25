import React from 'react'
import { Sun, Moon } from '@phosphor-icons/react'
import { useLocation } from 'react-router-dom'
import useNavigateTo from '../hooks/useNavigateTo'
import LogoIcon from '@/shared/components/LogoIcon'
import { useTheme } from '@/shared/contexts/themeContext'

type headerProps = {
    userImg: string | null;
}

const Header: React.FC<headerProps> = ({ userImg }) => {
  const navigateTo = useNavigateTo();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const imgURL = userImg ? userImg : "avatar.png";

  return (
    <header className='flex lg:hidden py-3 px-5 w-full justify-between items-center gap-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950'>

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

        <button
          onClick={() => navigateTo('profile')}
          className={`shrink-0 cursor-pointer ml-1 ${location.pathname === '/profile' ? 'hidden' : ''}`}
        >
          <img src={imgURL} alt="User avatar" className="rounded-full w-9 h-9 md:w-11 md:h-11 object-cover border border-gray-200 dark:border-gray-700" />
        </button>
      </div>

    </header>
  )
}

export default Header
