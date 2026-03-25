import React, { useState } from 'react'
import ProfilePosts from '@/modules/profile/components/ProfilePosts'
import ProfileComplaints from '@/modules/profile/components/ProfileComplaints'
import ProfileArticles from '@/modules/profile/components/ProfileArticles'

interface ProfileInfoProps {
    userId: string | undefined
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userId }) => {

    const [activeTab, setActiveTab] = useState<'posts' | 'alerts' | 'articles'>('posts');

    const tabs = [
        { key: 'posts' as const, label: 'Posts' },
        { key: 'alerts' as const, label: 'Denúncias' },
        { key: 'articles' as const, label: 'Artigos' },
    ]

    const tabContent = {
        posts: <ProfilePosts userId={userId} />,
        alerts: <ProfileComplaints userId={userId} />,
        articles: <ProfileArticles userId={userId} />,
    }

    return (
        <div className='w-full flex flex-col gap-8'>
            <nav className='flex border-b w-full border-gray-200 dark:border-gray-800'>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        className={`cursor-pointer relative px-2 pb-3 w-[33.33%] text-base lg:text-lg font-medium transition-colors duration-200 ${
                            activeTab === tab.key
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        <span
                            className={`
                                absolute left-0 bottom-0 h-[2px] bg-blue-500 dark:bg-blue-400
                                transition-all duration-300 rounded-t-sm
                                ${activeTab === tab.key ? 'w-full' : 'w-0'}
                            `}
                        />
                        {tab.label}
                    </button>
                ))}
            </nav>
            {tabContent[activeTab]}
        </div>
    )
}

export default ProfileInfo
