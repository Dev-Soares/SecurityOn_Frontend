import React from 'react'
import { useFindPostByUser } from '@/modules/community/hooks/useFindPostByUser'
import Post from '@/modules/community/components/Post'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import Spinner from '@/shared/utils/Spinner'

interface ProfilePostsProps {
    userId: string | undefined
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({ userId }) => {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFindPostByUser(userId!)

    const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

    const posts = data?.pages.flatMap(page => page.data) ?? []

    if (posts.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-16 gap-2'>
                <p className='text-gray-400 dark:text-gray-500 text-base'>Nenhum post ainda</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center gap-4 w-full py-4'>
            {posts.map(post => (
                <Post
                    key={post.id}
                    userId={post.userId}
                    content={post.content}
                    timestamp={post.createdAt}
                    imgUrl={post.imgUrl}
                    userAvatarUrl={null}
                />
            ))}
            <div ref={observerRef} className='flex justify-center py-8'>
                {isFetchingNextPage && <Spinner  />}
            </div>
        </div>
    )
}

export default ProfilePosts
