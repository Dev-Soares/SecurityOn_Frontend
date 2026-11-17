import React from 'react'
import { ChatCircleText } from '@phosphor-icons/react'
import { useFindPostByUser } from '@/modules/community/hooks/useFindPostByUser'
import Post from '@/modules/community/components/Post'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import Spinner from '@/shared/components/Spinner'
import EmptyState from '@/shared/components/EmptyState'

interface ProfilePostsProps {
    userId: string | undefined
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({ userId }) => {

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useFindPostByUser(userId!)

    const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

    const posts = data?.pages.flatMap(page => page.data) ?? []

    if (isLoading) {
        return (
            <div className='flex justify-center py-16'>
                <Spinner />
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <EmptyState
                icon={<ChatCircleText size={40} weight='light' />}
                title='Nenhum post publicado'
                description='Os posts publicados por este perfil aparecem aqui.'
            />
        )
    }

    return (
        <div className='flex flex-col gap-4 w-full'>
            {posts.map(post => (
                <Post key={post.id} post={post} userAvatarUrl={null} variant='full' />
            ))}
            <div ref={observerRef} className='flex justify-center py-6'>
                {isFetchingNextPage && <Spinner />}
            </div>
        </div>
    )
}

export default ProfilePosts
