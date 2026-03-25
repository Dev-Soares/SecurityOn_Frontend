import React, { useState } from 'react'
import Waves from '@/shared/components/Waves'
import SelectDanger from '@/modules/complaints/components/SelectDanger'
import useNavigateTo from '@/shared/hooks/useNavigateTo'

type DangerType = 'aviso' | 'cuidado' | 'perigo' | 'critico'

const CreateComplaintPage: React.FC = () => {
    const navigateTo = useNavigateTo()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [link, setLink] = useState('')
    const [store, setStore] = useState('')
    const [danger, setDanger] = useState<DangerType | false>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ title, content, link, store, danger })
        navigateTo('/complaint')
    }

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950">
            <div className='bg-linear-to-r from-blue-700 to-blue-900 flex flex-col lg:flex-row h-full'>
                <Waves title="Fazer Denúncia" />

                <div className='flex flex-col justify-start items-center z-10 w-full bg-white dark:bg-gray-950 rounded-t-3xl md:rounded-t-4xl lg:rounded-t-none lg:w-[50%] lg:h-screen lg:overflow-y-auto'>
                    <div className='w-full max-w-md px-6 lg:px-8 py-10 lg:py-12'>
                        <div className='flex flex-col gap-1 lg:gap-2 mb-8'>
                            <h1 className='text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white'>Fazer Denúncia</h1>
                            <p className='text-sm lg:text-lg text-gray-500 dark:text-gray-400'>Ajude a comunidade reportando golpes e fraudes</p>
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
                                    maxLength={80}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='Golpe na Loja X'
                                    className="w-full p-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base"
                                />
                                <span className='text-xs text-gray-400 dark:text-gray-500'>{title.length}/80</span>
                            </div>

                            <div className='flex flex-col gap-1.5 lg:gap-2'>
                                <label htmlFor="store" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                                    Nome da Loja/Empresa
                                </label>
                                <input
                                    id="store"
                                    value={store}
                                    maxLength={50}
                                    onChange={(e) => setStore(e.target.value)}
                                    placeholder='Loja X'
                                    className="w-full p-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base"
                                />
                                <span className='text-xs text-gray-400 dark:text-gray-500'>{store.length}/50</span>
                            </div>

                            <div className='flex flex-col gap-1.5 lg:gap-2'>
                                <label htmlFor="danger" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                                    Nível de Perigo <span className='text-red-500'>*</span>
                                </label>
                                <SelectDanger
                                    value={danger}
                                    onChange={setDanger}
                                    required
                                />
                            </div>

                            <div className='flex flex-col gap-1.5 lg:gap-2'>
                                <label htmlFor="content" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                                    Descreva o Golpe <span className='text-red-500'>*</span>
                                </label>
                                <textarea
                                    id="content"
                                    value={content}
                                    required
                                    maxLength={500}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Tentativa de golpe envolvendo..."
                                    className="w-full min-h-32 p-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base resize-none"
                                />
                                <span className='text-xs text-gray-400 dark:text-gray-500'>{content.length}/500</span>
                            </div>

                            <div className='flex flex-col gap-1.5 lg:gap-2'>
                                <label htmlFor="link" className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>
                                    Link para o site
                                </label>
                                <input
                                    id="link"
                                    value={link}
                                    maxLength={200}
                                    onChange={(e) => setLink(e.target.value)}
                                    placeholder='www.lojaexemplo.com/golpe'
                                    className="w-full p-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm lg:text-base"
                                />
                                <span className='text-xs text-gray-400 dark:text-gray-500'>{link.length}/200</span>
                            </div>

                            <button
                                type='submit'
                                disabled={!content.trim() || !title.trim() || !danger}
                                className="w-full py-3 lg:py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-200 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] text-base lg:text-lg mt-4"
                            >
                                Publicar Denúncia
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CreateComplaintPage
