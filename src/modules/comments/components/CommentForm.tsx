import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneRight } from '@phosphor-icons/react'
import { createCommentSchema, type CreateComment } from '../types/createComment'
import { useCreateComment } from '../hooks/useCreateComment'
import { useUser } from '@/shared/contexts/userContext'
import { showError } from '@/shared/components/Toast'
import ErrorText from '@/shared/components/ErrorText'
import Spinner from '@/shared/components/Spinner'

interface CommentFormProps {
    postId: string
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {

    const { isLogged } = useUser()
    const { mutate, isPending } = useCreateComment(postId)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createCommentSchema),
        defaultValues: { content: '' },
    })

    const onSubmit = (data: CreateComment) => {
        mutate(data.content, {
            onSuccess: () => reset(),
            onError: () => showError('Erro ao comentar'),
        })
    }

    if (!isLogged) {
        return (
            <p className='text-sm text-gray-400 dark:text-gray-500 py-2'>
                Entre na sua conta para comentar.
            </p>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-1.5'>
            <div className='flex items-end gap-2'>
                <textarea
                    {...register('content')}
                    maxLength={2000}
                    rows={1}
                    placeholder='Escreva um comentário...'
                    className='flex-1 min-h-11 max-h-32 py-3 px-4 bg-white dark:bg-gray-800 rounded-2xl text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors duration-200'
                />
                <button
                    type='submit'
                    disabled={isPending}
                    className='shrink-0 h-11 w-11 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200'
                >
                    {isPending
                        ? <Spinner size='sm' className='border-white border-t-transparent' />
                        : <PaperPlaneRight size={18} weight='bold' />}
                </button>
            </div>
            <ErrorText message={errors.content?.message} />
        </form>
    )
}

export default CommentForm
