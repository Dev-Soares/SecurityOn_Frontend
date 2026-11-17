import React, { useEffect, useRef, useState } from 'react'
import { PencilSimple, Trash } from '@phosphor-icons/react'
import type { Comment } from '../types/comment'
import { COMMENT_MAX_LENGTH } from '../types/createComment'
import { useDeleteComment } from '../hooks/useDeleteComment'
import { useUpdateComment } from '../hooks/useUpdateComment'
import { useUser } from '@/shared/contexts/userContext'
import { showError, showSuccess } from '@/shared/components/Toast'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import Spinner from '@/shared/components/Spinner'
import Modal from '@/shared/components/Modal'
import ConfirmDialog from '@/shared/components/ConfirmDialog'

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
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

    // Envolve bolha e menu: clique dentro dessa árvore não conta como clique fora,
    // então o próprio clique na bolha fecha o menu pelo toggle, sem corrida com o listener.
    const menuRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Textarea cresce com o texto até o teto do CSS. Altura fixa deixava um comentário
    // de três linhas rolando dentro de uma caixa de quatro.
    useEffect(() => {
        const textarea = textareaRef.current
        if (!isEditing || !textarea) return

        // scrollHeight nunca encolhe sozinho: zera a altura antes de medir, senão
        // apagar texto mantém a caixa esticada.
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }, [draft, isEditing])

    const { mutate: removeComment, isPending: isRemoving } = useDeleteComment(comment.postId)
    const { mutate: updateComment, isPending: isUpdating } = useUpdateComment(comment.postId)

    const isAuthor = user?.id === comment.userId
    const canDelete = isAuthor || user?.id === postAuthorId
    const hasActions = isAuthor || canDelete

    useEffect(() => {
        if (!isMenuOpen) return

        const onPointerDown = (event: MouseEvent | TouchEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) setIsMenuOpen(false)
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsMenuOpen(false)
        }

        document.addEventListener('mousedown', onPointerDown)
        document.addEventListener('touchstart', onPointerDown)
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.removeEventListener('mousedown', onPointerDown)
            document.removeEventListener('touchstart', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [isMenuOpen])

    const toggleMenu = () => {
        // Selecionar o texto do comentário termina em click na bolha. Sem isso,
        // toda seleção abriria o menu por cima do que o usuário acabou de marcar.
        if (window.getSelection()?.toString()) return
        setIsMenuOpen(open => !open)
    }

    const formattedDate = new Date(comment.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    })

    const onDelete = () => {
        removeComment(comment.id, {
            onSuccess: () => {
                showSuccess('Comentário removido')
                setIsConfirmingDelete(false)
            },
            onError: () => {
                showError('Erro ao remover comentário')
                setIsConfirmingDelete(false)
            },
        })
    }

    const startEdit = () => {
        setDraft(comment.content)
        setIsEditing(true)
        setIsMenuOpen(false)
    }

    const startDelete = () => {
        setIsConfirmingDelete(true)
        setIsMenuOpen(false)
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

            <div ref={menuRef} className='flex-1 min-w-0 flex flex-col gap-1 relative'>
                <div
                    onClick={hasActions ? toggleMenu : undefined}
                    onKeyDown={hasActions ? (event) => {
                        if (event.target !== event.currentTarget) return
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            toggleMenu()
                        }
                    } : undefined}
                    role={hasActions ? 'button' : undefined}
                    tabIndex={hasActions ? 0 : undefined}
                    aria-haspopup={hasActions ? 'menu' : undefined}
                    aria-expanded={hasActions ? isMenuOpen : undefined}
                    className={`bg-white dark:bg-gray-800 rounded-2xl px-4 py-2.5 flex flex-col gap-1 transition-colors duration-200 ${hasActions ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500' : ''}`}
                >
                    <div className='flex items-center justify-between gap-2'>
                        <button
                            onClick={(event) => {
                                event.stopPropagation()
                                navigateTo(`/profile/${comment.userId}`)
                            }}
                            className='text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline text-left truncate'
                        >
                            {comment.user.name}
                        </button>
                        <span className='text-xs text-gray-400 dark:text-gray-500 shrink-0'>{formattedDate}</span>
                    </div>

                    <p className='text-sm text-gray-800 dark:text-gray-200 leading-relaxed wrap-break-word'>
                        {comment.content}
                    </p>
                </div>

                {hasActions && isMenuOpen && (
                    <div
                        role='menu'
                        className='absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800'
                    >
                        {isAuthor && (
                            <button
                                role='menuitem'
                                onClick={startEdit}
                                className='w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200'
                            >
                                <PencilSimple size={15} weight='bold' /> Editar
                            </button>
                        )}
                        {canDelete && (
                            <button
                                role='menuitem'
                                onClick={startDelete}
                                className='w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors duration-200'
                            >
                                <Trash size={15} weight='bold' /> Excluir
                            </button>
                        )}
                    </div>
                )}
            </div>

            <Modal
                isOpen={isEditing}
                onClose={cancelEdit}
                title='Editar comentário'
                isLocked={isUpdating}
            >
                <textarea
                    ref={textareaRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    maxLength={COMMENT_MAX_LENGTH}
                    rows={3}
                    autoFocus
                    // overflow-hidden: a caixa cresce com o texto, então não há o que rolar.
                    // Com teto de 500 caracteres o pior caso ainda cabe no modal.
                    className='scrollbar-none w-full min-h-[84px] overflow-hidden p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-900 dark:text-white leading-relaxed border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 resize-none transition-colors duration-200'
                />

                <div className='flex items-center justify-between gap-2 mt-4'>
                    <span className={`text-xs ${draft.length >= COMMENT_MAX_LENGTH ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`}>
                        {draft.length}/{COMMENT_MAX_LENGTH}
                    </span>

                    <div className='flex items-center gap-2'>
                        <button
                            onClick={cancelEdit}
                            disabled={isUpdating}
                            className='px-4 py-2 text-sm font-medium rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer disabled:cursor-not-allowed transition-colors duration-200'
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onSaveEdit}
                            disabled={isUpdating}
                            className='px-5 py-2 text-sm font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200 min-w-[88px] flex items-center justify-center'
                        >
                            {isUpdating ? <Spinner size='sm' className='border-white border-t-transparent' /> : 'Salvar'}
                        </button>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog
                isOpen={isConfirmingDelete}
                onClose={() => setIsConfirmingDelete(false)}
                onConfirm={onDelete}
                title='Excluir comentário'
                message='Este comentário será removido definitivamente. Não dá para desfazer.'
                confirmLabel='Excluir'
                isLoading={isRemoving}
            />
        </div>
    )
}

export default CommentItem
