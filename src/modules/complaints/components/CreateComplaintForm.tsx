import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createComplaintSchema } from '../types/createComplaint';
import type { CreateComplaint } from '../types/createComplaint';
import { useCreateComplaint } from '../hooks/useCreateComplaint';
import { showSuccess, showError } from '@/shared/components/Toast';
import ErrorText from '@/shared/components/ErrorText';
import Spinner from '@/shared/components/Spinner';
import SelectDanger from './SelectDanger';
import useNavigateTo from '@/shared/hooks/useNavigateTo';

const CreateComplaintForm = () => {

    const { mutate, isPending } = useCreateComplaint()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<CreateComplaint>({
        resolver: zodResolver(createComplaintSchema),
        defaultValues: {
            title: '',
            store: '',
            content: '',
            link: '',
        }
    })

    const title = watch('title') ?? ''
    const store = watch('store') ?? ''
    const content = watch('content') ?? ''
    const link = watch('link') ?? ''
    const danger = watch('danger')

    const navigateTo = useNavigateTo()

    const onSubmit = (data: CreateComplaint) => {
        mutate(data, {
            onSuccess: () => {
                navigateTo('/complaint')
                showSuccess('Denúncia publicada com sucesso!')
            },
            onError: () => showError('Erro ao publicar a denúncia')
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:gap-5">

            <div className='flex flex-col gap-1.5 lg:gap-2'>
                <label htmlFor="title" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                    Título <span className='text-red-500'>*</span>
                </label>
                <input
                    id="title"
                    {...register('title')}
                    maxLength={200}
                    placeholder='Golpe na Loja X'
                    className="w-full p-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base"
                />
                <span className='text-xs text-gray-400 dark:text-gray-500'>{title.length}/200</span>
                <ErrorText message={errors.title?.message} />
            </div>

            <div className='flex flex-col gap-1.5 lg:gap-2'>
                <label htmlFor="store" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                    Nome da Loja/Empresa
                </label>
                <input
                    id="store"
                    {...register('store')}
                    maxLength={50}
                    placeholder='Loja X'
                    className="w-full p-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base"
                />
                <span className='text-xs text-gray-400 dark:text-gray-500'>{store.length}/50</span>
                <ErrorText message={errors.store?.message} />
            </div>

            <div className='flex flex-col gap-1.5 lg:gap-2'>
                <label htmlFor="danger" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                    Nível de Perigo <span className='text-red-500'>*</span>
                </label>
                <SelectDanger
                    value={danger || false}
                    onChange={(value) => setValue('danger', value, { shouldValidate: true })}
                />
                <ErrorText message={errors.danger?.message} />
            </div>

            <div className='flex flex-col gap-1.5 lg:gap-2'>
                <label htmlFor="content" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                    Descreva o Golpe <span className='text-red-500'>*</span>
                </label>
                <textarea
                    id="content"
                    {...register('content')}
                    maxLength={5000}
                    placeholder="Tentativa de golpe envolvendo..."
                    className="w-full min-h-32 p-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base resize-none"
                />
                <span className='text-xs text-gray-400 dark:text-gray-500'>{content.length}/5000</span>
                <ErrorText message={errors.content?.message} />
            </div>

            <div className='flex flex-col gap-1.5 lg:gap-2'>
                <label htmlFor="link" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                    Link para o site
                </label>
                <input
                    id="link"
                    {...register('link')}
                    maxLength={200}
                    placeholder='www.lojaexemplo.com/golpe'
                    className="w-full p-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base"
                />
                <span className='text-xs text-gray-400 dark:text-gray-500'>{link.length}/200</span>
                <ErrorText message={errors.link?.message} />
            </div>

            <button
                type='submit'
                disabled={isPending}
                className="w-full py-3 lg:py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-200 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] text-base lg:text-lg mt-4 flex items-center justify-center"
            >
                {isPending ? <Spinner size="sm" className="border-white border-t-transparent" /> : 'Publicar Denúncia'}
            </button>
        </form>
    )
}

export default CreateComplaintForm
