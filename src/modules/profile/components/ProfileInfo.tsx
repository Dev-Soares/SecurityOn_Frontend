import React from 'react'
import ProfilePosts from '@/modules/profile/components/ProfilePosts'
import ProfileComplaints from '@/modules/profile/components/ProfileComplaints'
import ProfileArticles from '@/modules/profile/components/ProfileArticles'
import FriendsTab from '@/modules/friendship/components/FriendsTab'
import type { ProfileTab } from '../types/tab'

interface ProfileInfoProps {
    userId: string | undefined
    isOwnProfile: boolean
    activeTab: ProfileTab
    onSelectTab: (tab: ProfileTab) => void
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userId, isOwnProfile, activeTab, onSelectTab }) => {

    const tabs: { key: ProfileTab; label: string }[] = [
        { key: 'posts', label: 'Posts' },
        { key: 'alerts', label: 'Denúncias' },
        { key: 'articles', label: 'Artigos' },
        { key: 'friends', label: 'Amigos' },
    ]

    const tabContent: Record<ProfileTab, React.ReactNode> = {
        posts: <ProfilePosts userId={userId} />,
        alerts: <ProfileComplaints userId={userId} />,
        articles: <ProfileArticles userId={userId} />,
        friends: <FriendsTab userId={userId} isOwnProfile={isOwnProfile} />,
    }

    return (
        <div className='w-full flex flex-col gap-4 min-w-0'>
            {/* A barra gruda no topo: em listas longas o usuário troca de aba sem
                voltar ao começo da página. No celular ela para abaixo do Header fixo. */}
            <nav className='sticky top-[72px] md:top-[84px] lg:top-4 z-20 flex gap-1 p-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm'>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => onSelectTab(tab.key)}
                        aria-current={activeTab === tab.key}
                        className={`
                            flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl
                            text-xs sm:text-sm font-semibold cursor-pointer
                            transition-colors duration-200
                            ${activeTab === tab.key
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }
                        `}
                    >
                        <span>{tab.label}</span>
                    </button>
                ))}
            </nav>

            {tabContent[activeTab]}
        </div>
    )
}

export default ProfileInfo
