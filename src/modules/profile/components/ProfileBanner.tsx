import React from 'react'

interface ProfileBannerProps {
    coverUrl?: string
}

// Capa do perfil. Sem imagem salva no backend, o gradiente é o estado padrão —
// e não um buraco cinza.
const ProfileBanner: React.FC<ProfileBannerProps> = ({ coverUrl }) => {
    return (
        <div className='relative h-28 sm:h-40 lg:h-48 w-full overflow-hidden bg-gradient-to-br from-blue-700 via-blue-500 to-sky-400'>
            {coverUrl && (
                <img src={coverUrl} alt='' className='absolute inset-0 w-full h-full object-cover' />
            )}
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_15%_120%,rgba(255,255,255,0.45),transparent_55%)]' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_85%_-20%,rgba(255,255,255,0.25),transparent_50%)]' />
        </div>
    )
}

export default ProfileBanner
