import React from 'react'
import { UsersThree } from '@phosphor-icons/react'
import { useFindFriends } from '../hooks/useFindFriends'
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import Spinner from '@/shared/components/Spinner'
import EmptyState from '@/shared/components/EmptyState'

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
            <EmptyState
                icon={<UsersThree size={40} weight='light' />}
                title='Nenhum amigo ainda'
                description='As conexões aceitas por este perfil aparecem aqui.'
            />
        )
    }

    return (
        <div className='flex flex-col gap-4 w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {friends.map(friend => (
                    <button
                        key={friend.friendshipId}
                        onClick={() => navigateTo(`/profile/${friend.user.id}`)}
                        className='flex items-center gap-3 p-3 rounded-2xl cursor-pointer text-left border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-sm transition-all duration-200'
                    >
                        <div className='w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-800'>
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
            </div>

            <div ref={observerRef} className='flex justify-center py-6'>
                {isFetchingNextPage && <Spinner />}
            </div>
        </div>
    )
}

export default FriendsList
