import React, { useState } from 'react'
import { PencilSimple, Trash, X } from '@phosphor-icons/react'
import type { Comment } from '../types/comment'
import { useDeleteComment } from '../hooks/useDeleteComment'
import { useUpdateComment } from '../hooks/useUpdateComment'
import { useUser } from '@/shared/contexts/userContext'
import { showError, showSuccess } from '@/shared/components/Toast'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import Spinner from '@/shared/components/Spinner'

interface CommentItemProps {
    comment: Comment
    // Autor do post também pode apagar comentário, igual à regra do backend.
    postAuthorId: string
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, postAuthorId }) => {

    const { user } = useUser()
    const navigateTo = useNavigateTo()

    const [isEditing, setIsEditing] = useState(false)
    const [draft, setDraft] = useState(comment.content)

    const { mutate: removeComment, isPending: isRemoving } = useDeleteComment(comment.postId)
    const { mutate: updateComment, isPending: isUpdating } = useUpdateComment(comment.postId)

    const isAuthor = user?.id === comment.userId
    const canDelete = isAuthor || user?.id === postAuthorId

    const formattedDate = new Date(comment.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    })

    const onDelete = () => {
        removeComment(comment.id, {
            onSuccess: () => showSuccess('Comentário removido'),
            onError: () => showError('Erro ao remover comentário'),
        })
    }

    const onSaveEdit = () => {
        const content = draft.trim()

        if (!content) {
            showError('Comentário não pode ficar vazio')
            return
        }

        updateComment({ id: comment.id, content }, {
            onSuccess: () => {
                showSuccess('Comentário atualizado')
                setIsEditing(false)
            },
            onError: () => showError('Erro ao atualizar comentário'),
        })
    }

    const cancelEdit = () => {
        setDraft(comment.content)
        setIsEditing(false)
    }

    return (
        <div className='flex gap-3'>
            <button
                onClick={() => navigateTo(`/profile/${comment.userId}`)}
                className='shrink-0 w-9 h-9 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 cursor-pointer'
            >
                <img src='/avatar.png' alt={`${comment.user.name} avatar`} className='w-full h-full object-cover' />
            </button>

            <div className='flex-1 min-w-0 flex flex-col gap-1'>
                <div className='bg-white dark:bg-gray-800 rounded-2xl px-4 py-2.5 flex flex-col gap-1'>
                    <div className='flex items-center justify-between gap-2'>
                        <button
                            onClick={() => navigateTo(`/profile/${comment.userId}`)}
                            className='text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline text-left truncate'
                        >
                            {comment.user.name}
                        </button>
                        <span className='text-xs text-gray-400 dark:text-gray-500 shrink-0'>{formattedDate}</span>
                    </div>

                    {isEditing ? (
                        <div className='flex flex-col gap-2 pt-1'>
                            <textarea
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                maxLength={2000}
                                rows={2}
                                className='w-full p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 resize-none transition-colors duration-200'
                            />
                            <div className='flex items-center gap-2 justify-end'>
                                <button
                                    onClick={cancelEdit}
                                    className='px-3 py-1.5 text-xs font-medium rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 flex items-center gap-1'
                                >
                                    <X size={14} weight='bold' /> Cancelar
                                </button>
                                <button
                                    onClick={onSaveEdit}
                                    disabled={isUpdating}
                                    className='px-4 py-1.5 text-xs font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200 min-w-[68px] flex items-center justify-center'
                                >
                                    {isUpdating ? <Spinner size='sm' className='border-white border-t-transparent' /> : 'Salvar'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className='text-sm text-gray-800 dark:text-gray-200 leading-relaxed wrap-break-word'>
                            {comment.content}
                        </p>
                    )}
                </div>

                {!isEditing && (isAuthor || canDelete) && (
                    <div className='flex items-center gap-3 px-2'>
                        {isAuthor && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className='flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200'
                            >
                                <PencilSimple size={13} weight='bold' /> Editar
                            </button>
                        )}
                        {canDelete && (
                            <button
                                onClick={onDelete}
                                disabled={isRemoving}
                                className='flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer disabled:cursor-not-allowed transition-colors duration-200'
                            >
                                <Trash size={13} weight='bold' /> Excluir
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentItem
