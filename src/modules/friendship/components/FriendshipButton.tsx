import React, { useState } from 'react'
import { UserPlus, UserMinus, Check, X, Clock } from '@phosphor-icons/react'
import { useFriendshipStatus } from '../hooks/useFriendshipStatus'
import { useSendFriendRequest } from '../hooks/useSendFriendRequest'
import { useAcceptFriendship } from '../hooks/useAcceptFriendship'
import { useRemoveFriendship } from '../hooks/useRemoveFriendship'
import { useUser } from '@/shared/contexts/userContext'
import { showError, showSuccess } from '@/shared/components/Toast'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import Spinner from '@/shared/components/Spinner'
import ConfirmDialog from '@/shared/components/ConfirmDialog'

interface FriendshipButtonProps {
    userId: string
    // Nome de exibição do outro perfil, usado no texto da confirmação.
    userName?: string
}

const baseStyle = 'flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 disabled:cursor-not-allowed min-h-[38px]'

interface SwapLabelProps {
    idle: React.ReactNode
    hover: React.ReactNode
}

// Os dois rótulos ocupam a MESMA célula do grid: a largura do botão é sempre a
// do maior dos dois, então o hover não empurra layout. A troca é crossfade de
// opacidade, não corte seco de texto.
const SwapLabel: React.FC<SwapLabelProps> = ({ idle, hover }) => (
    <span className='grid place-items-center'>
        <span className='col-start-1 row-start-1 flex items-center gap-2 whitespace-nowrap opacity-100 group-hover:opacity-0 transition-opacity duration-200'>
            {idle}
        </span>
        <span className='col-start-1 row-start-1 flex items-center gap-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
            {hover}
        </span>
    </span>
)

const FriendshipButton: React.FC<FriendshipButtonProps> = ({ userId, userName }) => {

    const { user, isLogged } = useUser()
    const navigateTo = useNavigateTo()

    // Desfazer amizade é destrutivo e silencioso do outro lado: confirma antes.
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const isSelf = user?.id === userId

    const { data: status, isLoading } = useFriendshipStatus(userId, isLogged && !isSelf)

    const { mutate: sendRequest, isPending: isSending } = useSendFriendRequest()
    const { mutate: acceptRequest, isPending: isAccepting } = useAcceptFriendship()
    const { mutate: removeFriendship, isPending: isRemoving } = useRemoveFriendship()

    const isPending = isSending || isAccepting || isRemoving

    // Perfil próprio não tem botão de amizade; o backend devolve relation 'self'.
    if (isSelf) return null

    if (!isLogged) {
        return (
            <button onClick={() => navigateTo('/login')} className={`${baseStyle} bg-blue-500 text-white hover:bg-blue-600`}>
                <UserPlus size={18} weight='bold' />
                <span>Adicionar</span>
            </button>
        )
    }

    if (isLoading || !status) {
        return (
            <div className={`${baseStyle} border border-gray-200 dark:border-gray-800 justify-center min-w-[132px]`}>
                <Spinner size='sm' />
            </div>
        )
    }

    const onSend = () => sendRequest(userId, {
        onSuccess: () => showSuccess('Pedido de amizade enviado'),
        onError: () => showError('Erro ao enviar pedido de amizade'),
    })

    const onAccept = () => {
        if (!status.friendshipId) return
        acceptRequest(status.friendshipId, {
            onSuccess: () => showSuccess('Pedido aceito'),
            onError: () => showError('Erro ao aceitar pedido'),
        })
    }

    const onRemove = (message: string, onSettled?: () => void) => {
        if (!status.friendshipId) return
        removeFriendship(status.friendshipId, {
            onSuccess: () => showSuccess(message),
            onError: () => showError('Erro ao remover amizade'),
            onSettled,
        })
    }

    if (status.relation === 'friends') {
        return (
            <>
                <button
                    onClick={() => setIsConfirmOpen(true)}
                    disabled={isPending}
                    className={`${baseStyle} group border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-400 dark:hover:border-red-500 hover:text-red-500 dark:hover:text-red-400 min-w-[132px]`}
                >
                    {isRemoving ? <Spinner size='sm' /> : (
                        <SwapLabel
                            idle={<><Check size={18} weight='bold' /><span>Amigos</span></>}
                            hover={<><UserMinus size={18} weight='bold' /><span>Desfazer</span></>}
                        />
                    )}
                </button>

                <ConfirmDialog
                    isOpen={isConfirmOpen}
                    onClose={() => setIsConfirmOpen(false)}
                    onConfirm={() => onRemove('Amizade desfeita', () => setIsConfirmOpen(false))}
                    title={userName ? `Desfazer amizade com ${userName}?` : 'Desfazer amizade?'}
                    message='Vocês deixarão de ser amigos. Para voltar a ser, será preciso um novo pedido de amizade.'
                    confirmLabel='Desfazer'
                    isLoading={isRemoving}
                    variant='danger'
                />
            </>
        )
    }

    if (status.relation === 'pending_sent') {
        return (
            <button
                onClick={() => onRemove('Pedido cancelado')}
                disabled={isPending}
                className={`${baseStyle} group border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-red-400 dark:hover:border-red-500 hover:text-red-500 dark:hover:text-red-400 min-w-[132px]`}
            >
                {isRemoving ? <Spinner size='sm' /> : (
                    <SwapLabel
                        idle={<><Clock size={18} weight='bold' /><span>Pendente</span></>}
                        hover={<><X size={18} weight='bold' /><span>Cancelar</span></>}
                    />
                )}
            </button>
        )
    }

    if (status.relation === 'pending_received') {
        return (
            <div className='flex items-center gap-2'>
                <button
                    onClick={onAccept}
                    disabled={isPending}
                    className={`${baseStyle} bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 justify-center min-w-[100px]`}
                >
                    {isAccepting ? <Spinner size='sm' className='border-white border-t-transparent' /> : (
                        <>
                            <Check size={18} weight='bold' />
                            <span>Aceitar</span>
                        </>
                    )}
                </button>
                <button
                    onClick={() => onRemove('Pedido recusado')}
                    disabled={isPending}
                    className={`${baseStyle} border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:border-red-400 dark:hover:border-red-500 justify-center`}
                >
                    {isRemoving ? <Spinner size='sm' /> : <X size={18} weight='bold' />}
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={onSend}
            disabled={isPending}
            className={`${baseStyle} bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 justify-center min-w-[132px]`}
        >
            {isSending ? <Spinner size='sm' className='border-white border-t-transparent' /> : (
                <>
                    <UserPlus size={18} weight='bold' />
                    <span>Adicionar</span>
                </>
            )}
        </button>
    )
}

export default FriendshipButton
