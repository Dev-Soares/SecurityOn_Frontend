import React from 'react'
import { HeartIcon, ChatCircleIcon, ShareNetworkIcon } from '@phosphor-icons/react'


type PostProps = {
    username: string;
    content: string;
    timestamp: string;
    userAvatarUrl?: string | null;
    imgUrl?: string | null;
}

const Post: React.FC<PostProps> = ({ username, content, timestamp, userAvatarUrl, imgUrl }) => {

  return (
    <div className='bg-gray-100 dark:bg-gray-900 dark:border-gray-700 border-2 border-gray-300 h-auto px-6 flex flex-col rounded-md gap-2 w-full pt-8 md:w-[70%] xl:w-[50%] shadow-md'>
        <div className='flex flex-row gap-2 justify-start items-center border-t border-t-gray-300 dark:border-t-gray-700 py-4'>
            <div className='rounded-full w-[13%] 2xl:w-[10%] border-2 border-gray-200'>{userAvatarUrl ? <img src={userAvatarUrl} alt="User avatar" className='rounded-full' /> : <img src="avatar.png" alt="Default avatar" className='rounded-full' />}</div>
            <div className='flex flex-col'>
                <p className='font-semibold text-lg text-blue-500 dark:text-white'>{username}</p>
                <p className='text-sm text-gray-500 dark:text-gray-300'>{timestamp}</p>
            </div>
        </div>
        <div className='flex flex-col gap-4'>
            <p className='text-md font-medium text-gray-900 dark:text-gray-100'>{content}</p>
            {imgUrl && <img src={imgUrl} alt="Post image" className='w-full h-auto rounded-md' />}
        </div>
        <div className='flex flex-row gap-2 justify-around items-center border-t border-t-gray-300 dark:border-t-gray-700 py-2.5 mt-2'>
            <button className='flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'>
                <HeartIcon size={24} weight="regular" className='text-gray-600 dark:text-gray-300' />
            </button>
            <button className='flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'>
                <ChatCircleIcon size={24} weight="regular" className='text-gray-600 dark:text-gray-300' />
            </button>
            <button className='flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'>
                <ShareNetworkIcon size={24} weight="regular" className='text-gray-600 dark:text-gray-300' />
            </button>
        </div>
      
    </div>
  )
}

export default Post
