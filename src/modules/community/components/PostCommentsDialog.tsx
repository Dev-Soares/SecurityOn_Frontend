import React from 'react'
import { createPortal } from 'react-dom'
import { ThumbsUp, X } from '@phosphor-icons/react'
import CommentList from '@/modules/comments/components/CommentList'
import CommentForm from '@/modules/comments/components/CommentForm'
import { useToggleLike } from '@/modules/likes/hooks/useToggleLike'
import { useUser } from '@/shared/contexts/userContext'
import { showError } from '@/shared/components/Toast'
import { useDialogDismiss } from '@/shared/hooks/useDialogDismiss'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import { formatFullDate, formatRelativeTime } from '@/shared/utils/formatRelativeTime'
import type { Post as PostType } from '../types/post'

interface PostCommentsDialogProps {
    post: PostType
    userAvatarUrl?: string | null
    isOpen: boolean
    onClose: () => void
}

// Mobile: folha subindo do rodapé, 85% da altura. Desktop: post à esquerda,
// comentários à direita. Mesma árvore, as duas formas saem dos breakpoints.
const PostCommentsDialog: React.FC<PostCommentsDialogProps> = ({ post, userAvatarUrl, isOpen, onClose }) => {

    const { isLogged } = useUser()
    const navigateTo = useNavigateTo()
    const { mutate: toggleLike } = useToggleLike()

    useDialogDismiss(isOpen, onClose)

    if (!isOpen) return null

    const goToProfile = () => {
        onClose()
        navigateTo(`/profile/${post.userId}`)
    }

    const onToggleLike = () => {
        if (!isLogged) {
            showError('Entre na sua conta para curtir')
            return
        }
        toggleLike({ postId: post.id, liked: post.liked })
    }

    const authorRow = (
        <div className='flex items-center gap-3 min-w-0'>
            <button
                onClick={goToProfile}
                className='shrink-0 w-9 h-9 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 cursor-pointer'
            >
                <img
                    src={userAvatarUrl || '/avatar.png'}
                    alt={`${post.user.name} avatar`}
                    className='w-full h-full object-cover'
                />
            </button>

            <div className='min-w-0 flex items-center gap-1.5'>
                <button
                    onClick={goToProfile}
                    className='text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline truncate'
                >
                    {post.user.name}
                </button>
                <span className='text-gray-400 dark:text-gray-600 text-sm'>·</span>
                <time
                    dateTime={post.createdAt}
                    title={formatFullDate(post.createdAt)}
                    className='text-sm text-gray-500 dark:text-gray-400 shrink-0'
                >
                    {formatRelativeTime(post.createdAt)}
                </time>
            </div>
        </div>
    )

    // Portal: o diálogo nasce dentro do card do post, e um ancestral com transform
    // (a própria animação de abertura, por exemplo) prenderia o position: fixed nele.
    return createPortal(
        <div className='fixed inset-0 z-50 flex items-end md:items-center md:justify-center'>
            {/* Sem backdrop-blur: desfocar a tela inteira a cada frame enquanto o painel
                anima derruba o fps da abertura. O escurecimento já separa o diálogo do fundo. */}
            <div
                className='absolute inset-0 bg-black/60 animate-fade-in'
                onClick={onClose}
            />

            <div
                role='dialog'
                aria-modal='true'
                aria-label={`Comentários do post de ${post.user.name}`}
                className='relative z-10 flex flex-col w-full h-[85dvh] rounded-t-2xl bg-white dark:bg-gray-900 overflow-hidden animate-sheet-up will-change-transform
                           md:h-[85vh] md:max-h-[760px] md:w-[92vw] md:max-w-5xl md:flex-row md:rounded-2xl md:animate-zoom-in md:border md:border-gray-200 md:dark:border-gray-800'
            >
                {/* Coluna da mídia: só no desktop e só quando o post tem imagem.
                    No mobile o post continua visível no feed atrás da folha. */}
                {post.imgUrl && (
                    <div className='hidden md:flex md:w-[55%] bg-black items-center justify-center'>
                        <img
                            src={post.imgUrl}
                            alt=''
                            className='max-h-full max-w-full object-contain'
                        />
                    </div>
                )}

                <div className='flex flex-col flex-1 min-w-0'>
                    {/* Alça: sinaliza a folha arrastável do mobile. */}
                    <div className='md:hidden flex justify-center pt-2.5 pb-1 shrink-0'>
                        <div className='h-1.5 w-10 rounded-full bg-gray-300 dark:bg-gray-700' />
                    </div>

                    {/* Divisória só no mobile: no desktop o texto do post logo abaixo já
                        traz a sua, e as duas linhas juntas picotavam o cabeçalho. */}
                    <div className='flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 md:border-b-0 shrink-0'>
                        {/* No desktop o cabeçalho identifica o post; no mobile o post está
                            atrás da folha, então basta o título. */}
                        <span className='md:hidden text-base font-semibold text-gray-900 dark:text-white'>
                            Comentários
                        </span>
                        <div className='hidden md:flex min-w-0'>{authorRow}</div>

                        <button
                            onClick={onClose}
                            aria-label='Fechar'
                            className='p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 shrink-0'
                        >
                            <X size={20} weight='bold' />
                        </button>
                    </div>

                    <div className='scrollbar-slim flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4'>
                        {/* O texto do post abre a coluna de comentários no desktop,
                            como primeira "fala" da conversa. */}
                        <p className='hidden md:block text-base text-gray-800 dark:text-gray-200 leading-relaxed wrap-break-word pb-4 border-b border-gray-200 dark:border-gray-800'>
                            <button
                                onClick={goToProfile}
                                className='font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline mr-1.5'
                            >
                                {post.user.name}
                            </button>
                            {post.content}
                        </p>

                        <CommentList postId={post.id} postAuthorId={post.userId} />
                    </div>

                    <div className='border-t border-gray-200 dark:border-gray-800 px-4 py-3 shrink-0 flex flex-col gap-2'>
                        {/* Curtir fica no diálogo porque no desktop o card do feed está coberto. */}
                        <div className='hidden md:flex items-center gap-2'>
                            <button
                                onClick={onToggleLike}
                                className='flex items-center gap-2 px-2 py-1.5 -ml-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group'
                                aria-label={post.liked ? 'Descurtir post' : 'Curtir post'}
                                aria-pressed={post.liked}
                            >
                                <ThumbsUp
                                    size={22}
                                    weight={post.liked ? 'fill' : 'regular'}
                                    className={`${post.liked
                                        ? 'text-blue-500'
                                        : 'text-gray-600 dark:text-gray-300 group-hover:text-blue-500'} transition-colors duration-200`}
                                />
                            </button>

                            {post._count.likes > 0 && (
                                <span className='text-sm font-semibold text-gray-900 dark:text-white'>
                                    {post._count.likes} {post._count.likes === 1 ? 'curtida' : 'curtidas'}
                                </span>
                            )}
                        </div>

                        <CommentForm postId={post.id} />
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    )
}

export default PostCommentsDialog
