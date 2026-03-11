import React, { useState } from 'react'

const ProfileInfo: React.FC = () => {

    const [activeTab, setActiveTab] = useState<'posts' | 'alerts' | 'articles'>('posts');

    return (
        <>
            <nav className='flex  mt-2 border-b w-full border-gray-200 dark:border-gray-800'>
                <button
                    className={` cursor-pointer relative px-2 pb-2 w-[33.33%] text-lg lg:text-xl lg:pb-4 font-medium transition-colors duration-200 ${activeTab === 'alerts' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                    onClick={() => setActiveTab('posts')}
                >
                    <span
                        className={`
                      absolute left-0 bottom-0 h-[2px] bg-blue-600 dark:bg-blue-500
                      transition-all duration-300 rounded-t-sm 
                      ${activeTab === 'posts' ? 'w-full' : 'w-0'}
                    `}
                    />
                    Posts
                </button>
                <button
                    className={` cursor-pointer relative px-2 pb-2 w-[33.33%] text-lg lg:text-xl lg:pb-4 font-medium transition-colors duration-200 ${activeTab === 'alerts' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                    onClick={() => setActiveTab('alerts')}
                >
                    <span
                        className={`
                      absolute left-0 bottom-0 h-[2px] bg-blue-600 dark:bg-blue-500
                      transition-all duration-300 rounded-t-sm 
                      ${activeTab === 'alerts' ? 'w-full' : 'w-0'}
                    `}
                    />
                    Denúncias
                </button>
                <button
                    className={`cursor-pointer relative px-2 pb-2 w-[33.33%] text-lg lg:text-xl lg:pb-4 font-medium transition-colors duration-200 ${activeTab === 'articles' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                    onClick={() => setActiveTab('articles')}
                >
                    <span
                        className={`
                      absolute left-0 bottom-0 h-[2px] bg-blue-600 dark:bg-blue-500
                      transition-all duration-300 rounded-t-sm 
                      ${activeTab === 'articles' ? 'w-full' : 'w-0'}
                    `}
                    />
                    Artigos
                </button>
            </nav>
        </>
    )
}

export default ProfileInfo
