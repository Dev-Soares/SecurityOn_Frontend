import React from 'react'
import { BellIcon } from '@phosphor-icons/react'
import { useNavigate, useLocation } from 'react-router-dom'

type headerProps = {
    userImg: string | null;
}

const Header: React.FC<headerProps> = ({ userImg }) => {

    

  const navigate = useNavigate();
  
    const imgURL = userImg ? userImg : "avatar.png";
    const location = useLocation();

  return (
    <header className='flex lg:hidden p-3 px-5 w-full justify-between items-center gap-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950'>
      <button onClick={() => navigate('profile')}
      className={`w-full h-full justify-center items-center ${location.pathname === '/profile' ? 'hidden' : ''}`}>
        <img src={imgURL} alt="User avatar" className='rounded-full w-12 h-12 object-cover border-gray-300 border-2' />
      </button>
              
        <button className='relative p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200 ml-auto cursor-pointer'>
            <BellIcon size={32} weight="regular" className='text-gray-700 dark:text-gray-200' />
        </button>
    </header>
  )
}

export default Header
