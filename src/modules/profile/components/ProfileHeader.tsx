import React from 'react'
import { ShieldCheck } from '@phosphor-icons/react'
import ProfileBanner from './ProfileBanner'
import ProfileStats from './ProfileStats'
import FriendshipButton from '@/modules/friendship/components/FriendshipButton'
import type { User } from '../types/user'

interface ProfileHeaderProps {
    user: User
    userName: string
    isOwnProfile: boolean
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    user,
    userName,
    isOwnProfile,
}) => {
    return (
        <section className='overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'>
            <ProfileBanner />

            <div className='px-4 sm:px-6 pb-5'>
                {/* Avatar sobreposto à capa; no perfil dos outros, o botão de
                    amizade fica na mesma linha, encostado à direita. */}
                <div className='flex flex-wrap items-end justify-between gap-3 -mt-12 sm:-mt-16'>
                    {/* O tamanho fica no container: como item de flex a <img>
                        sozinha era achatada quando a linha apertava.
                        relative z-10 porque a capa é position:relative, sem isso
                        ela pinta por cima da metade de cima do avatar. */}
                    <div className='relative z-10 shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 ring-4 ring-white dark:ring-gray-900'>
                        <img
                            src={user.avatarUrl || '/avatar.png'}
                            alt={`Avatar de ${user.name}`}
                            className='w-full h-full object-cover'
                        />
                    </div>

                    {!isOwnProfile && (
                        <div className='flex items-center gap-2 ml-auto pb-1'>
                            <FriendshipButton userId={user.id} />
                        </div>
                    )}
                </div>

                <div className='mt-4 flex flex-col gap-1'>
                    <h1 className='text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        {user.name}
                    </h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>@{userName}</p>

                    <p className='mt-1 flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300'>
                        <ShieldCheck size={16} weight='fill' className='text-blue-500 shrink-0' />
                        <span>Membro da comunidade SecurityOn</span>
                    </p>
                </div>

                <div className='mt-4 pt-4 border-t border-gray-100 dark:border-gray-800'>
                    <ProfileStats counts={user._count} />
                </div>
            </div>
        </section>
    )
}

export default ProfileHeader
