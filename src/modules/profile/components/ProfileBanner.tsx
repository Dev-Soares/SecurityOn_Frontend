import React from 'react'

interface ProfileBannerProps {
    userImgUrl?: string
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({ userImgUrl }) => {

    const mainUrl = userImgUrl ? userImgUrl : "/avatar.png"

    return (
        <>
            <div className='bg-blue-500 h-40 lg:h-56 rounded-b-2xl lg:rounded-b-xl' />
            <div className='absolute top-26 lg:top-38 left-6 sm:left-8'>
                <div className='w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-950 bg-gray-200 dark:bg-gray-800'>
                    <img src={mainUrl} alt="Avatar" className='w-full h-full object-cover' />
                </div>
            </div>
        </>
    )
}

export default ProfileBanner
