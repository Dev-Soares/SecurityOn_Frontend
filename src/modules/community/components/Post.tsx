import React, { useState } from 'react'
import { Heart, ChatCircle } from '@phosphor-icons/react'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import { useUser } from '@/shared/contexts/userContext'
import { useToggleLike } from '@/modules/likes/hooks/useToggleLike'
import CommentList from '@/modules/comments/components/CommentList'
import { showError } from '@/shared/components/Toast'
import type { Post as PostType } from '../types/post'

type PostProps = {
    post: PostType;
    userAvatarUrl?: string | null;
}

const Post: React.FC<PostProps> = ({ post, userAvatarUrl }) => {

    const navigateTo = useNavigateTo()
    const { isLogged } = useUser()

    const [showComments, setShowComments] = useState(false)

    const { mutate: toggleLike } = useToggleLike()

    const formattedDate = new Date(post.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

    const onToggleLike = () => {
        if (!isLogged) {
            showError('Entre na sua conta para curtir')
            return
        }
        toggleLike({ postId: post.id, liked: post.liked })
    }

  return (
    <div className='bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 h-auto px-6 flex flex-col rounded-2xl gap-4 w-full pt-6 pb-2 md:w-[70%] xl:w-[50%]'>
        <button
        onClick={ () => navigateTo(`/profile/${post.userId}`)}
        className='flex flex-row gap-3 items-center cursor-pointer rounded-xl px-3 py-2 -mx-3 hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200'>
            <div className='w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-800'>
                <img
                    src={userAvatarUrl || "/avatar.png"}
                    alt={`${post.user.name} avatar`}
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='flex flex-col text-left'>
                <p className='font-semibold text-base text-gray-900 dark:text-white'>{post.user.name}</p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{formattedDate}</p>
            </div>
        </button>

        <div className='flex flex-col gap-3 mt-1'>
            <p className='text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-2 wrap-break-word'>{post.content}</p>
            {post.imgUrl && (
                <img
                    src={post.imgUrl}
                    alt="Post image"
                    className='w-full h-auto rounded-xl object-cover'
                />
            )}
        </div>

        <div className='flex flex-row items-center justify-around border-t border-gray-200 dark:border-gray-800 py-1.5 mt-2 -mx-2'>
            <button
                onClick={onToggleLike}
                className='flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 group'
                aria-label={post.liked ? 'Descurtir post' : 'Curtir post'}
            >
                <Heart
                    size={22}
                    weight={post.liked ? 'fill' : 'regular'}
                    className={`${post.liked
                        ? 'text-red-500'
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-red-500'} transition-colors duration-200`}
                />
                <span className={`text-sm ${post.liked ? 'text-red-500 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {post._count.likes}
                </span>
            </button>
            <button
                onClick={() => setShowComments(!showComments)}
                className='flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 group'
                aria-label='Ver comentários'
            >
                <ChatCircle
                    size={22}
                    weight={showComments ? 'fill' : 'regular'}
                    className={`${showComments
                        ? 'text-blue-500'
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500'} transition-colors duration-200`}
                />
                <span className={`text-sm ${showComments ? 'text-blue-500 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {post._count.comments}
                </span>
            </button>
        </div>

        {/* Montado só ao abrir: o hook de comentários busca no mount. */}
        {showComments && (
            <CommentList postId={post.id} postAuthorId={post.userId} />
        )}
    </div>
  )
}

export default Post
