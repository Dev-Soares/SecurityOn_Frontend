import React from 'react'
import type { UserCounts } from '../types/user'

interface ProfileStatsProps {
    counts: UserCounts
}

// Os quatro números vêm no mesmo GET /user/:id, como subconsultas de COUNT.
// Aqui são só leitura: quem troca de aba é a barra logo abaixo.
const ProfileStats: React.FC<ProfileStatsProps> = ({ counts }) => {

    const stats = [
        { label: 'Posts', value: counts.posts },
        { label: 'Denúncias', value: counts.complaints },
        { label: 'Artigos', value: counts.articles },
        { label: 'Amigos', value: counts.friends },
    ]

    return (
        <ul className='grid grid-cols-4 gap-1 sm:gap-2'>
            {stats.map(stat => (
                <li key={stat.label} className='flex flex-col items-center gap-0.5 px-1 py-2'>
                    <span className='text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-none'>
                        {stat.value}
                    </span>
                    <span className='text-[11px] sm:text-xs text-gray-500 dark:text-gray-400'>
                        {stat.label}
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default ProfileStats
