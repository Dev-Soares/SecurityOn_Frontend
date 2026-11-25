import React, { useState } from 'react'
import FriendRequests from './FriendRequests'
import FriendsList from './FriendsList'
import { usePendingRequestsBadge } from '../hooks/usePendingRequestsBadge'
import CountBadge from '@/shared/components/CountBadge'

interface FriendsTabProps {
    userId: string | undefined
    isOwnProfile: boolean
}

type FriendsView = 'friends' | 'requests'

// Pedidos recebidos e lista de amigos são o mesmo assunto, mas não cabem na
// mesma tela: um switch alterna entre os dois. Só o dono do perfil vê pedidos,
// para visitante, a lista aparece sozinha, sem switch.
const FriendsTab: React.FC<FriendsTabProps> = ({ userId, isOwnProfile }) => {

    const [view, setView] = useState<FriendsView>('friends')

    const pendingBadge = usePendingRequestsBadge()

    if (!isOwnProfile) return <FriendsList userId={userId} />

    const views: { key: FriendsView; label: string; badge?: string | null }[] = [
        { key: 'friends', label: 'Meus amigos' },
        { key: 'requests', label: 'Pedidos', badge: pendingBadge },
    ]

    return (
        <div className='flex flex-col gap-4 w-full min-w-0'>
            <div className='flex gap-1 p-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'>
                {views.map(item => (
                    <button
                        key={item.key}
                        onClick={() => setView(item.key)}
                        aria-current={view === item.key}
                        className={`
                            flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl
                            text-xs sm:text-sm font-semibold cursor-pointer
                            transition-colors duration-200
                            ${view === item.key
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }
                        `}
                    >
                        <span>{item.label}</span>
                        <CountBadge
                            value={item.badge}
                            variant={view === item.key ? 'onPrimary' : 'soft'}
                        />
                    </button>
                ))}
            </div>

            {view === 'friends'
                ? <FriendsList userId={userId} />
                : <FriendRequests enabled />
            }
        </div>
    )
}

export default FriendsTab
