import React from 'react'
import { useNavigate } from 'react-router-dom'

type ProfileCardProps = {
    username?: string
    avatarUrl?: string 
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
    username = "Convidado",
    avatarUrl= "/avatar.png"}) => {

  const navigate = useNavigate();

  return (
    <div className='flex gap-2 justify-start items-center p-2  w-full pt-4'>
      <button onClick={() => navigate('/profile')} className='hover:scale-105 transition-transform duration-300 cursor-pointer'>
        <img src={avatarUrl} alt={`${username}'s avatar`} className='w-15 h-15 rounded-full border-2 border-gray-300 dark:border-gray-700' />
      </button>
        
        <div className='mt-2 flex flex-col justify-center items-start'>
            <p className='font-semibold text-lg'>{username}</p>
            <button onClick={() => navigate('/profile')} className='cursor-pointer text-md text-blue-500 dark:text-blue-400 hover:underline ml-1'>Ver Perfil</button>
        </div>     
    </div>
  )
}

export default ProfileCard
