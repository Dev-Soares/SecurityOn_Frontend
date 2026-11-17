import React from 'react'
import { useFindFriends } from '../hooks/useFindFriends'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import Spinner from '@/shared/components/Spinner'

interface FriendsListProps {
    userId: string | undefined
}

const FriendsList: React.FC<FriendsListProps> = ({ userId }) => {

    const navigateTo = useNavigateTo()

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useFindFriends(userId!)

    const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

    const friends = data?.pages.flatMap(page => page.data) ?? []

    if (isLoading) {
        return (
            <div className='flex justify-center py-16'>
                <Spinner />
            </div>
        )
    }

    if (friends.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-16 gap-2'>
                <p className='text-gray-400 dark:text-gray-500 text-base'>Nenhum amigo ainda</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-2 w-full py-4'>
            {friends.map(friend => (
                <button
                    key={friend.friendshipId}
                    onClick={() => navigateTo(`/profile/${friend.user.id}`)}
                    className='flex items-center gap-3 p-3 rounded-2xl cursor-pointer text-left hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200'
                >
                    <div className='w-11 h-11 rounded-full overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-800'>
                        <img src='/avatar.png' alt={`${friend.user.name} avatar`} className='w-full h-full object-cover' />
                    </div>
                    <div className='flex flex-col min-w-0'>
                        <span className='text-sm font-semibold text-gray-900 dark:text-white truncate'>{friend.user.name}</span>
                        <span className='text-xs text-gray-500 dark:text-gray-400'>
                            Amigos desde {new Date(friend.friendsSince).toLocaleDateString('pt-BR')}
                        </span>
                    </div>
                </button>
            ))}

            <div ref={observerRef} className='flex justify-center py-8'>
                {isFetchingNextPage && <Spinner />}
            </div>
        </div>
    )
}

export default FriendsList
