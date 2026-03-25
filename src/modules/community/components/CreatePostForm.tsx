
import { createPostSchema } from '../types/createPost';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePost } from '../hooks/useCreatePost';
import { showSuccess, showError } from '@/shared/components/Toast';
import type { CreatePost } from '../types/createPost';
import ErrorText from '@/shared/components/ErrorText';
import Spinner from '@/shared/components/Spinner';
import { useModalPost } from '../contexts/modalPostContext';

const CreatePostForm = () => {

    const { mutate, isPending } = useCreatePost()
    const { close } = useModalPost()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(createPostSchema)
    })

    const onSubmit = (data: CreatePost) => {
        mutate(data, {
            onSuccess: () => {
                showSuccess('Post publicado com sucesso!')
                close()
            },
            onError: () => showError('Erro ao publicar o post')
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <textarea
                {...register('content')}
                placeholder="O que você está pensando?"
                className="w-full min-h-32 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-white text-sm leading-relaxed border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors duration-200"
            />
            <ErrorText message={errors.content?.message} />

            <div className="flex justify-end items-center pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center min-w-[90px]"
                >
                    {isPending ? <Spinner size="sm" className="border-white border-t-transparent" /> : 'Publicar'}
                </button>
            </div>
        </form>
    )
}

export default CreatePostForm
