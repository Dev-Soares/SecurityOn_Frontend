import React, { useState } from 'react'
import { ThumbsUp, ChatCircle } from '@phosphor-icons/react'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import { useUser } from '@/shared/contexts/userContext'
import { useToggleLike } from '@/modules/likes/hooks/useToggleLike'
import PostCommentsDialog from './PostCommentsDialog'
import { showError } from '@/shared/components/Toast'
import { formatFullDate, formatRelativeTime } from '@/shared/utils/formatRelativeTime'
import type { Post as PostType } from '../types/post'

type PostProps = {
    post: PostType;
    userAvatarUrl?: string | null;
    // 'feed' é o card da Comunidade, que define a própria largura no meio da
    // página. 'full' ocupa a coluna em que for montado, é o caso do perfil.
    variant?: 'feed' | 'full';
}

const surfaceByVariant = {
    feed: 'w-full md:w-[70%] xl:w-[50%] bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800',
    full: 'w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800',
}

const Post: React.FC<PostProps> = ({ post, userAvatarUrl, variant = 'feed' }) => {

    const navigateTo = useNavigateTo()
    const { isLogged } = useUser()

    const [showComments, setShowComments] = useState(false)

    // Uma imagem que não carrega ocupa zero altura e some do card, mas o imgUrl
    // continua preenchido, o texto iria para o rodapé como legenda de uma imagem
    // que ninguém vê. Ao falhar, o card passa a se comportar como um post só de texto.
    const [imgFailed, setImgFailed] = useState(false)
    const hasImage = Boolean(post.imgUrl) && !imgFailed

    const { mutate: toggleLike } = useToggleLike()

    const goToProfile = () => navigateTo(`/profile/${post.userId}`)

    const onToggleLike = () => {
        if (!isLogged) {
            showError('Entre na sua conta para curtir')
            return
        }
        toggleLike({ postId: post.id, liked: post.liked })
    }

    // Com imagem, o texto é legenda: vem depois dela, prefixado pelo autor.
    // Sem imagem o texto é o próprio conteúdo do card: sobe para cima das ações, maior,
    // e sem repetir o nome que já está logo acima no cabeçalho.
    const caption = hasImage ? (
        <p className='text-base text-gray-800 dark:text-gray-200 leading-relaxed wrap-break-word'>
            <button
                onClick={goToProfile}
                className='font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline mr-1.5'
            >
                {post.user.name}
            </button>
            {post.content}
        </p>
    ) : (
        <p className='text-base text-gray-800 dark:text-gray-200 leading-relaxed wrap-break-word'>
            {post.content}
        </p>
    )

    return (
        <article className={`border flex flex-col rounded-2xl overflow-hidden ${surfaceByVariant[variant]}`}>
            {/* Cabeçalho */}
            <div className='flex items-center gap-3 px-5 pt-5 pb-4'>
                <button
                    onClick={goToProfile}
                    className='shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 cursor-pointer'
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
                        className='text-base font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline truncate'
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

            {/* Mídia: recuada da borda, acompanhando o padding do card.
                max-h evita que uma imagem em retrato empurre o resto do feed para fora da tela. */}
            {hasImage ? (
                <div className='px-5'>
                    <img
                        src={post.imgUrl!}
                        alt=''
                        loading='lazy'
                        onError={() => setImgFailed(true)}
                        className='w-full max-h-56 sm:max-h-72 object-cover rounded-xl bg-gray-200 dark:bg-gray-800'
                    />
                </div>
            ) : (
                <div className='px-5 pb-1'>{caption}</div>
            )}

            {/* Ações: alinhadas à esquerda, sob a imagem.
                px-3 compensa o padding interno dos botões e alinha o ícone à coluna do texto. */}
            <div className='flex items-center gap-1 px-3 pt-3'>
                <button
                    onClick={onToggleLike}
                    className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 group'
                    aria-label={post.liked ? 'Descurtir post' : 'Curtir post'}
                    aria-pressed={post.liked}
                >
                    <ThumbsUp
                        size={24}
                        weight={post.liked ? 'fill' : 'regular'}
                        className={`${post.liked
                            ? 'text-blue-500'
                            : 'text-gray-600 dark:text-gray-300 group-hover:text-blue-500'} transition-colors duration-200`}
                    />
                </button>

                <button
                    onClick={() => setShowComments(true)}
                    className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 group'
                    aria-label='Ver comentários'
                    aria-haspopup='dialog'
                >
                    <ChatCircle
                        size={24}
                        weight='regular'
                        className='text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-200'
                    />
                    {post._count.comments > 0 && (
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                            {post._count.comments}
                        </span>
                    )}
                </button>
            </div>

            {/* Curtidas, e a legenda só no card com imagem, sem imagem o texto
                já foi renderizado acima das ações. */}
            <div className='flex flex-col gap-1.5 px-5 pt-1 pb-5'>
                {post._count.likes > 0 && (
                    <p className='text-sm font-semibold text-gray-900 dark:text-white'>
                        {post._count.likes} {post._count.likes === 1 ? 'curtida' : 'curtidas'}
                    </p>
                )}

                {hasImage && caption}
            </div>

            {/* Montado só ao abrir: o hook de comentários busca no mount. */}
            {showComments && (
                <PostCommentsDialog
                    post={post}
                    userAvatarUrl={userAvatarUrl}
                    isOpen={showComments}
                    onClose={() => setShowComments(false)}
                />
            )}
        </article>
    )
}

export default Post
