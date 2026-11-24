import React from 'react'
import { Handshake, SignIn } from '@phosphor-icons/react'
import FriendsTab from '@/modules/friendship/components/FriendsTab'
import Spinner from '@/shared/components/Spinner'
import EmptyState from '@/shared/components/EmptyState'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import { useUser } from '@/shared/contexts/userContext'

const FriendsPage: React.FC = () => {

  const navigateTo = useNavigateTo()

  const { user, isLoading, isLogged } = useUser()

  return (
    <main className='pt-8 lg:pt-16 pb-28 md:pb-16'>
      <div className='mx-auto w-full max-w-2xl px-3 sm:px-4 flex flex-col gap-3 sm:gap-4'>

        <header className='px-1'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Amigos</h1>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
            Pedidos recebidos e suas conexões
          </p>
        </header>

        {isLoading && (
          <div className='flex justify-center py-16'>
            <Spinner />
          </div>
        )}

        {/* A aba é a mesma do perfil, só que sempre no contexto do usuário logado. */}
        {!isLoading && isLogged && (
          <FriendsTab userId={user!.id} isOwnProfile />
        )}

        {!isLoading && !isLogged && (
          <div className='flex flex-col items-center'>
            <EmptyState
              icon={<Handshake size={40} weight='light' />}
              title='Entre para ver seus amigos'
              description='Pedidos de amizade e conexões aparecem aqui depois do login.'
            />
            <button
              onClick={() => navigateTo('/login')}
              className='-mt-8 flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-sm shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer'
            >
              <SignIn size={18} weight='bold' />
              Entrar
            </button>
          </div>
        )}

      </div>
    </main>
  )
}

export default FriendsPage
