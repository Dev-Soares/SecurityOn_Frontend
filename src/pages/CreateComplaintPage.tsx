import React, { useState } from 'react'
import Waves from '../shared/components/Waves'
import SelectDanger from '../modules/complaints/components/SelectDanger'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'

type DangerType = 'aviso' | 'cuidado' | 'perigo' | 'critico'

const CreateComplaintPage: React.FC = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [link, setLink] = useState('')
    const [store, setStore] = useState('')
    const [danger, setDanger] = useState<DangerType | false>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aqui você processaria os dados da denúncia
        console.log({ title, content, link, store, danger })
        // Redireciona de volta para a página de denúncias
        navigate('/complaint')
    }

    return (
        <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className='bg-linear-to-r from-blue-700 to-indigo-700 flex flex-col lg:flex-row h-full'>
                <Waves title="Fazer Denúncia" />

                <div className='flex flex-col justify-start items-center z-10 w-full bg-gray-100 dark:bg-gray-900 rounded-t-3xl md:rounded-t-4xl lg:pl-8 lg:rounded-t-none pt-15 lg:w-[50%] lg:h-screen lg:overflow-y-auto lg:shadow-2xl lg:border lg:border-gray-200 dark:lg:border-gray-700'>
                    <div className='w-full max-w-md px-6 pb-8'>
                        <button
                            onClick={() => navigate('/complaint')}
                            className='hidden lg:flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6'
                        >
                            <ArrowLeft size={20} weight="bold" />
                            <span className='font-medium'>Voltar</span>
                        </button>

                        <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>Fazer Denúncia</h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="title" className='text-lg text-gray-900 dark:text-white font-semibold'>
                                    Título <span className='text-red-600 dark:text-red-500'>*</span>
                                </label>
                                <input
                                    id="title"
                                    value={title}
                                    required
                                    maxLength={80}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='Golpe na Loja X'
                                    className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg text-gray-950 dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                                />
                                <span className='text-xs text-gray-500 dark:text-gray-400'>{title.length}/80 caracteres</span>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="store" className='text-lg text-gray-900 dark:text-white font-semibold'>
                                    Nome da Loja/Empresa
                                </label>
                                <input
                                    id="store"
                                    value={store}
                                    maxLength={50}
                                    onChange={(e) => setStore(e.target.value)}
                                    placeholder='Loja X'
                                    className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg text-gray-950 dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                                />
                                <span className='text-xs text-gray-500 dark:text-gray-400'>{store.length}/50 caracteres</span>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="danger" className='text-lg text-gray-900 dark:text-white font-semibold'>
                                    Nível de Perigo <span className='text-red-600 dark:text-red-500'>*</span>
                                </label>
                                <SelectDanger 
                                    value={danger}
                                    onChange={setDanger}
                                    required
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="content" className='text-lg text-gray-900 dark:text-white font-semibold'>
                                    Descreva o Golpe <span className='text-red-600 dark:text-red-500'>*</span>
                                </label>
                                <textarea
                                    id="content"
                                    value={content}
                                    required
                                    maxLength={500}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Tentativa de golpe envolvendo..."
                                    className="w-full min-h-32 p-4 bg-white dark:bg-gray-800 rounded-lg text-gray-950 dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 resize-none"
                                />
                                <span className='text-xs text-gray-500 dark:text-gray-400'>{content.length}/500 caracteres</span>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="link" className='text-lg text-gray-900 dark:text-white font-semibold'>
                                    Link para o site
                                </label>
                                <input
                                    id="link"
                                    value={link}
                                    maxLength={200}
                                    onChange={(e) => setLink(e.target.value)}
                                    placeholder='www.lojaexemplo.com/golpe'
                                    className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg text-gray-950 dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                                />
                                <span className='text-xs text-gray-500 dark:text-gray-400'>{link.length}/200 caracteres</span>
                            </div>

                            <button
                                type='submit'
                                disabled={!content.trim() || !title.trim() || !danger}
                                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer hover:translate-y-[-2px] mt-6"
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
