import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileHeader from '@/modules/profile/components/ProfileHeader'
import ProfileInfo from '@/modules/profile/components/ProfileInfo'
import ProfileAbout from '@/modules/profile/components/ProfileAbout'
import ProfileSkeleton from '@/modules/profile/skeletons/ProfileSkeleton'
import ErrorMessage from '@/shared/components/ErrorMessage'
import useGetUser from '@/modules/profile/hooks/useGetUser'
import { useUser } from '@/shared/contexts/userContext'
import type { ProfileTab } from '@/modules/profile/types/tab'

const ProfilePage: React.FC = () => {

  const { id } = useParams<{ id: string }>()

  const { data: user, isError, refetch } = useGetUser(id!)

  const { user: loggedUser } = useUser()

  // A aba vive na página porque dois lugares a controlam: as abas e os números
  // (header e coluna lateral), que funcionam como atalho.
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts')

  if (isError) {
    return (
      <main className='min-h-screen bg-gray-50 dark:bg-gray-950 flex items-start justify-center px-4 py-16'>
        <div className='w-full max-w-md'>
          <ErrorMessage message='Não foi possível carregar este perfil.' onRetry={() => refetch()} />
        </div>
      </main>
    )
  }

  if (!user) return <ProfileSkeleton />

  const userName = user.name.toLowerCase().replace(/\s/g, '')
  const isOwnProfile = loggedUser?.id === user.id

  return (
    <main className='min-h-screen pb-28 md:pb-20 lg:pb-10 bg-gray-50 dark:bg-gray-950'>
      {/* Uma coluna no celular; a partir de xl, conteúdo à esquerda e um
          trilho fixo à direita, o cabeçalho atravessa as duas colunas. */}
      <div className='mx-auto w-full max-w-5xl px-3 sm:px-6 pt-8 pb-4 sm:pb-6 lg:pt-16 flex flex-col gap-4 xl:grid xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-6 xl:items-start'>

        <div className='xl:col-span-2'>
          <ProfileHeader
            user={user}
            userName={userName}
            isOwnProfile={isOwnProfile}
          />
        </div>

        <aside className='flex flex-col gap-4 xl:col-start-2 xl:row-start-2 xl:self-start xl:sticky xl:top-4'>
          <ProfileAbout
            user={user}
            userName={userName}
            isOwnProfile={isOwnProfile}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />
        </aside>

        <div className='min-w-0 xl:col-start-1 xl:row-start-2'>
          <ProfileInfo
            userId={id}
            isOwnProfile={isOwnProfile}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />
        </div>

      </div>
    </main>
  )
}

export default ProfilePage
