import React from 'react'
import type { UserCounts } from '../types/user'

interface ProfileStatsProps {
    counts: UserCounts
}

// Os quatro números vêm no mesmo GET /user/:id, como subconsultas de COUNT.
const ProfileStats: React.FC<ProfileStatsProps> = ({ counts }) => {

    const stats = [
        { label: 'Posts', value: counts.posts },
        { label: 'Denúncias', value: counts.complaints },
        { label: 'Artigos', value: counts.articles },
        { label: 'Amigos', value: counts.friends },
    ]

    return (
        <ul className='flex flex-wrap items-center gap-x-6 gap-y-2'>
            {stats.map(stat => (
                <li key={stat.label} className='flex items-baseline gap-1.5'>
                    <span className='text-base font-bold text-gray-900 dark:text-white'>{stat.value}</span>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>{stat.label}</span>
                </li>
            ))}
        </ul>
    )
}

export default ProfileStats
