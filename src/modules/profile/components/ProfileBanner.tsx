import React from 'react'

interface ProfileBannerProps {
    userImgUrl?: string
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({ userImgUrl }) => {

    const mainUrl = userImgUrl ? userImgUrl : "/avatar.png"
    
    return (
        <>
            <div className='bg-blue-600 h-40 lg:h-60 rounded-b-3xl lg:rounded-xl'>
            </div>
            <button className='absolute rounded-full w-34 h-34 z-50 top-1/2 left-1/5 md:left-1/8 lg:left-1/6 md:w-40 md:h-40 transform -translate-x-1/2 -translate-y-1/2  xl:w-50 xl:h-50 xl:left-1/8 border-none self-start shadow-md'>
                <img src={mainUrl} alt="" className='rounded-full' />
            </button>
        </>
    )
}

export default ProfileBanner
