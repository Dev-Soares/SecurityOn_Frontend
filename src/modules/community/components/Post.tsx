import React from 'react'
import { Heart, ChatCircle } from '@phosphor-icons/react'
import useGetUser from '@/modules/profile/hooks/useGetUser'
import PostSkeleton from '../skeletons/PostSkeleton'
import useNavigateTo from '@/shared/hooks/useNavigateTo'


type PostProps = {
    userId: string;
    content: string;
    timestamp: string;
    userAvatarUrl?: string | null;
    imgUrl?: string | null;
}

const Post: React.FC<PostProps> = ({ userId, content, timestamp, userAvatarUrl, imgUrl }) => {

    const {data: user } = useGetUser(userId)

    const navigateTo = useNavigateTo()

    if (!user) return <PostSkeleton />

    const formattedDate = new Date(timestamp).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

  return (
    <div className='bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 h-auto px-6 flex flex-col rounded-2xl gap-4 w-full pt-6 pb-2 md:w-[70%] xl:w-[50%]'>
        <button
        onClick={ () => navigateTo(`/profile/${userId}`)}
        className='flex flex-row gap-3 items-center cursor-pointer rounded-xl px-3 py-2 -mx-3 hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200'>
            <div className='w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-800'>
                <img
                    src={userAvatarUrl || "/avatar.png"}
                    alt={`${user.name} avatar`}
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='flex flex-col text-left'>
                <p className='font-semibold text-base text-gray-900 dark:text-white'>{user.name}</p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{formattedDate}</p>
            </div>
        </button>

        <div className='flex flex-col gap-3 mt-1'>
            <p className='text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-2'>{content}</p>
            {imgUrl && (
                <img
                    src={imgUrl}
                    alt="Post image"
                    className='w-full h-auto rounded-xl object-cover'
                />
            )}
        </div>

        <div className='flex flex-row items-center justify-around border-t border-gray-200 dark:border-gray-800 py-1.5 mt-2 -mx-2'>
            <button className='flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 group'>
                <Heart size={22} weight="regular" className='text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors duration-200' />
            </button>
            <button className='flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 group'>
                <ChatCircle size={22} weight="regular" className='text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-200' />
            </button>
        </div>
    </div>
  )
}

export default Post
