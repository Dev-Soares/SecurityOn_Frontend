import React from 'react'
import { Check, X, UserPlus } from '@phosphor-icons/react'
import { useFindReceivedRequests } from '../hooks/useFindReceivedRequests'
import { useAcceptFriendship } from '../hooks/useAcceptFriendship'
import { useRemoveFriendship } from '../hooks/useRemoveFriendship'
import { showError, showSuccess } from '@/shared/components/Toast'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import Spinner from '@/shared/components/Spinner'
import EmptyState from '@/shared/components/EmptyState'

interface FriendRequestsProps {
    // Só o dono do perfil vê os próprios pedidos recebidos.
    enabled: boolean
}

const FriendRequests: React.FC<FriendRequestsProps> = ({ enabled }) => {

    const navigateTo = useNavigateTo()

    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useFindReceivedRequests(enabled)

    // `variables` é o friendshipId da mutation em voo: com ele o spinner fica na
    // linha clicada, em vez de todas as linhas reagirem ao mesmo isPending.
    const { mutate: acceptRequest, isPending: isAccepting, variables: acceptingId } = useAcceptFriendship()
    const { mutate: removeFriendship, isPending: isRemoving, variables: removingId } = useRemoveFriendship()

    const isBusy = isAccepting || isRemoving

    const requests = data?.pages.flatMap(page => page.data) ?? []

    if (!enabled) return null

    if (isLoading) {
        return (
            <div className='flex justify-center py-16'>
                <Spinner />
            </div>
        )
    }

    if (requests.length === 0) {
        return (
            <EmptyState
                icon={<UserPlus size={40} weight='light' />}
                title='Nenhum pedido pendente'
                description='Quem pedir sua amizade aparece aqui para aceitar ou recusar.'
            />
        )
    }

    const onAccept = (id: string) => acceptRequest(id, {
        onSuccess: () => showSuccess('Pedido aceito'),
        onError: () => showError('Erro ao aceitar pedido'),
    })

    const onDecline = (id: string) => removeFriendship(id, {
        onSuccess: () => showSuccess('Pedido recusado'),
        onError: () => showError('Erro ao recusar pedido'),
    })

    return (
        <section className='flex flex-col gap-3 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'>
            <ul className='flex flex-col gap-2'>
                {requests.map(request => (
                    <li key={request.id} className='flex items-center gap-3'>
                        <button
                            onClick={() => navigateTo(`/profile/${request.requester.id}`)}
                            className='flex items-center gap-3 flex-1 min-w-0 cursor-pointer text-left rounded-xl px-2 py-1.5 -mx-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
                        >
                            <div className='w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-800'>
                                <img src='/avatar.png' alt={`${request.requester.name} avatar`} className='w-full h-full object-cover' />
                            </div>
                            <span className='text-sm font-semibold text-gray-900 dark:text-white truncate'>
                                {request.requester.name}
                            </span>
                        </button>

                        <div className='flex items-center gap-2 shrink-0'>
                            {/* min-w fixo: trocar o rótulo pelo spinner não encolhe o botão. */}
                            <button
                                onClick={() => onAccept(request.id)}
                                disabled={isBusy}
                                className='h-9 px-3 min-w-23 flex items-center justify-center gap-1.5 rounded-full bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200'
                            >
                                {isAccepting && acceptingId === request.id
                                    ? <Spinner size='sm' className='border-white/40 border-t-white' />
                                    : <><Check size={15} weight='bold' /> Aceitar</>
                                }
                            </button>
                            <button
                                onClick={() => onDecline(request.id)}
                                disabled={isBusy}
                                className='h-9 w-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:border-red-400 dark:hover:border-red-500 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200'
                                aria-label='Recusar pedido'
                            >
                                {isRemoving && removingId === request.id
                                    ? <Spinner size='sm' />
                                    : <X size={15} weight='bold' />
                                }
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className='self-center px-4 py-1.5 text-xs font-semibold text-blue-500 dark:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors duration-200 flex items-center justify-center min-w-[110px] min-h-[28px]'
                >
                    {isFetchingNextPage ? <Spinner size='sm' /> : 'Ver mais'}
                </button>
            )}
        </section>
    )
}

export default FriendRequests
