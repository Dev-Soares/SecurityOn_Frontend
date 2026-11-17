import React from 'react'
import { useFindCommentsByPost } from '../hooks/useFindCommentsByPost'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import Spinner from '@/shared/components/Spinner'
import ErrorMessage from '@/shared/components/ErrorMessage'

interface CommentListProps {
    postId: string
    postAuthorId: string
}

const CommentList: React.FC<CommentListProps> = ({ postId, postAuthorId }) => {

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
    } = useFindCommentsByPost(postId)

    const comments = data?.pages.flatMap(page => page.data) ?? []

    return (
        <div className='flex flex-col gap-4 border-t border-gray-200 dark:border-gray-800 pt-4 pb-2 -mx-2 px-2'>
            <CommentForm postId={postId} />

            {isLoading && (
                <div className='flex justify-center py-4'>
                    <Spinner size='sm' />
                </div>
            )}

            {isError && (
                <ErrorMessage
                    message='Não foi possível carregar os comentários.'
                    onRetry={() => refetch()}
                />
            )}

            {!isLoading && !isError && comments.length === 0 && (
                <p className='text-sm text-gray-400 dark:text-gray-500 text-center py-2'>
                    Nenhum comentário ainda. Seja o primeiro.
                </p>
            )}

            {comments.length > 0 && (
                <div className='flex flex-col gap-4'>
                    {comments.map(comment => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            postAuthorId={postAuthorId}
                        />
                    ))}
                </div>
            )}

            {/* Paginação por botão: um observer dentro de cada post do feed
                dispararia fetch de comentário em tudo que passa pela tela. */}
            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className='self-center px-4 py-1.5 text-xs font-semibold text-blue-500 dark:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center min-w-[140px] min-h-[28px]'
                >
                    {isFetchingNextPage ? <Spinner size='sm' /> : 'Ver mais comentários'}
                </button>
            )}
        </div>
    )
}

export default CommentList
