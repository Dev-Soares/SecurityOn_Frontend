import React, { useState } from 'react'
import Waves from '@/shared/components/Waves'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import { useCreateArticle } from '@/modules/articles/hooks/useCreateArticle'

const CreateArticlePage: React.FC = () => {
    const navigateTo = useNavigateTo()
    const { mutate: createArticle, isPending } = useCreateArticle()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [bgUrl, setBgUrl] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createArticle(
            { title, content, bgUrl: bgUrl || undefined },
            { onSuccess: () => navigateTo('/articles') }
        )
    }

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950">
            <div className='bg-linear-to-r from-blue-700 to-blue-900 flex flex-col lg:flex-row h-full'>
                <Waves title="Criar Artigo" />

                <div className='flex flex-col justify-start items-center z-10 w-full bg-white dark:bg-gray-950 rounded-t-3xl md:rounded-t-4xl lg:rounded-t-none lg:w-[50%] lg:h-screen lg:overflow-y-auto'>
                    <div className='w-full max-w-md px-6 lg:px-8 py-10 lg:py-12'>
                        <div className='flex flex-col gap-1 lg:gap-2 mb-8'>
                            <h1 className='text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white'>Criar Artigo</h1>
                            <p className='text-sm lg:text-lg text-gray-500 dark:text-gray-400'>Compartilhe conhecimento sobre segurança</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-5">

                            <div className='flex flex-col gap-1.5 lg:gap-2'>
                                <label htmlFor="title" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                                    Título <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    id="title"
                                    value={title}
                                    required
                                    maxLength={120}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='Dicas de Segurança Residencial'
                                    className="w-full p-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base"
                                />
                                <span className='text-xs text-gray-400 dark:text-gray-500'>{title.length}/120</span>
                            </div>

                            <div className='flex flex-col gap-1.5 lg:gap-2'>
                                <label htmlFor="content" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                                    Conteúdo <span className='text-red-500'>*</span>
                                </label>
                                <textarea
                                    id="content"
                                    value={content}
                                    required
                                    maxLength={5000}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Escreva o conteúdo do seu artigo aqui..."
                                    className="w-full min-h-48 p-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base resize-none"
                                />
                                <span className='text-xs text-gray-400 dark:text-gray-500'>{content.length}/5000</span>
                            </div>

                            <div className='flex flex-col gap-1.5 lg:gap-2'>
                                <label htmlFor="bgUrl" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                                    URL da Imagem de Capa
                                </label>
                                <input
                                    id="bgUrl"
                                    value={bgUrl}
                                    maxLength={500}
                                    onChange={(e) => setBgUrl(e.target.value)}
                                    placeholder='https://exemplo.com/imagem.jpg'
                                    className="w-full p-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base"
                                />
                                <span className='text-xs text-gray-400 dark:text-gray-500'>{bgUrl.length}/500</span>
                            </div>

                            <button
                                type='submit'
                                disabled={!content.trim() || !title.trim() || isPending}
                                className="w-full py-3 lg:py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-200 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] text-base lg:text-lg mt-4"
                            >
                                {isPending ? 'Publicando...' : 'Publicar Artigo'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CreateArticlePage
