import React from 'react'
import { ChatCircleText, Flag, Article, UsersThree, Envelope, At } from '@phosphor-icons/react'
import type { User } from '../types/user'
import type { ProfileTab } from '../types/tab'

interface ProfileAboutProps {
    user: User
    userName: string
    isOwnProfile: boolean
    activeTab: ProfileTab
    onSelectTab: (tab: ProfileTab) => void
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({ user, userName, isOwnProfile, activeTab, onSelectTab }) => {

    const activity: { label: string; value: number; tab: ProfileTab; icon: React.ReactNode }[] = [
        { label: 'Posts', value: user._count.posts, tab: 'posts', icon: <ChatCircleText size={18} weight='bold' /> },
        { label: 'Denúncias', value: user._count.complaints, tab: 'alerts', icon: <Flag size={18} weight='bold' /> },
        { label: 'Artigos', value: user._count.articles, tab: 'articles', icon: <Article size={18} weight='bold' /> },
        { label: 'Amigos', value: user._count.friends, tab: 'friends', icon: <UsersThree size={18} weight='bold' /> },
    ]

    return (
        <div className='flex flex-col gap-4'>
            <section className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4'>
                <h2 className='text-base font-bold text-gray-900 dark:text-white'>
                    Atividade
                </h2>

                <ul className='mt-3 flex flex-col'>
                    {activity.map(item => (
                        <li key={item.label}>
                            <button
                                type='button'
                                onClick={() => onSelectTab(item.tab)}
                                className={`
                                    w-full flex items-center gap-3 px-2 py-2 rounded-xl cursor-pointer text-left
                                    transition-colors duration-200
                                    ${activeTab === item.tab
                                        ? 'bg-blue-50 dark:bg-blue-500/10'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800/70'
                                    }
                                `}
                            >
                                <span className={`
                                    flex items-center justify-center w-9 h-9 rounded-full shrink-0
                                    ${activeTab === item.tab
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                    }
                                `}>
                                    {item.icon}
                                </span>
                                <span className='flex-1 text-sm font-medium text-gray-700 dark:text-gray-200'>
                                    {item.label}
                                </span>
                                <span className='text-sm font-bold text-gray-900 dark:text-white'>
                                    {item.value}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            <section className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4'>
                <h2 className='text-base font-bold text-gray-900 dark:text-white'>
                    Sobre
                </h2>

                <ul className='mt-3 flex flex-col gap-3'>
                    <li className='flex items-center gap-3 min-w-0'>
                        <At size={18} weight='bold' className='text-gray-400 dark:text-gray-500 shrink-0' />
                        <span className='text-sm text-gray-700 dark:text-gray-200 truncate'>{userName}</span>
                    </li>

                    {/* E-mail é dado de contato: só aparece no próprio perfil. */}
                    {isOwnProfile && (
                        <li className='flex items-center gap-3 min-w-0'>
                            <Envelope size={18} weight='bold' className='text-gray-400 dark:text-gray-500 shrink-0' />
                            <span className='text-sm text-gray-700 dark:text-gray-200 truncate' title={user.email}>
                                {user.email}
                            </span>
                        </li>
                    )}
                </ul>
            </section>
        </div>
    )
}

export default ProfileAbout
