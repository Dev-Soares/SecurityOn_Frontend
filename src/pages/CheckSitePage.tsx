import React, { useMemo, useState } from 'react'
import axios from 'axios'
import { MagnifyingGlass, ShieldCheck, Warning, Plus } from '@phosphor-icons/react'
import { useComplaintSheet } from '@/modules/complaints/contexts/complaintSheetContext'
import useFindComplaintByLink from '@/modules/complaints/hooks/useFindComplaintByLink'
import ComplaintCard from '@/modules/complaints/components/ComplaintCard'
import ComplaintCardSkeleton from '@/modules/complaints/skeletons/ComplaintCardSkeleton'
import ErrorMessage from '@/shared/components/ErrorMessage'
import { dangerConfig } from '@/modules/complaints/config/dangerConfig'
import type { DangerType } from '@/modules/complaints/config/dangerConfig'

// Erro de endereço: o servidor recusa o que não forma host ("loja", "localhost").
// É correção de campo, não falha de carregamento, e não oferece "tentar novamente".
const isInvalidAddress = (error: unknown): boolean =>
    axios.isAxiosError(error) && error.response?.status === 400

const messageForError = (error: unknown): string => {
    if (!isInvalidAddress(error)) {
        return 'Não foi possível consultar a base de denúncias agora. Tente novamente.'
    }

    const message = (error as { response?: { data?: { message?: unknown } } }).response?.data?.message

    // O filtro global devolve "Bad Request Exception" quando a recusa vem do
    // ValidationPipe, e não da mensagem escrita no serviço: isso não se mostra na tela.
    return typeof message === 'string' && message !== 'Bad Request Exception'
        ? message
        : 'Informe um endereço de site válido.'
}

const CheckSitePage: React.FC = () => {

    const { open: openComplaintSheet } = useComplaintSheet()

    const [input, setInput] = useState('')
    // Só o endereço submetido alimenta a consulta, verificar é um ato do visitante,
    // e cada tecla digitada não deve virar uma busca no servidor.
    const [submitted, setSubmitted] = useState('')

    const { data, isFetching, isError, error, refetch } = useFindComplaintByLink(submitted)

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        setSubmitted(input.trim())
    }

    // Pior nível entre as denúncias do site: é o que resume o risco no topo.
    const worstDanger = useMemo<DangerType>(() => {
        const levels = (data?.data ?? [])
            .map(({ danger }) => (danger && danger in dangerConfig ? danger : 'aviso'))

        return levels.reduce<DangerType>(
            (worst, level) => (dangerConfig[level].rank > dangerConfig[worst].rank ? level : worst),
            'aviso',
        )
    }, [data])

    const showResult = Boolean(data) && !isFetching && !isError

    return (
        <main className='pt-8 lg:pt-16 pb-28 md:pb-16'>
            <div className='mx-auto w-full max-w-2xl px-3 sm:px-4 xl:px-8 flex flex-col gap-4 sm:gap-5'>

                <header className='px-1'>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Verificar site</h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                        Cole o endereço e veja se a comunidade já denunciou esse site.
                    </p>
                </header>

                <form
                    onSubmit={onSubmit}
                    className='flex flex-col sm:flex-row gap-3'
                >
                    <label className='flex items-center gap-3 flex-1 min-w-0 px-4 py-3 rounded-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 focus-within:border-blue-500 transition-colors duration-200'>
                        <MagnifyingGlass size={20} weight='bold' className='shrink-0 text-gray-400 dark:text-gray-500' />
                        <input
                            type='text'
                            inputMode='url'
                            autoComplete='off'
                            autoCapitalize='none'
                            spellCheck={false}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='loja-exemplo.com.br'
                            aria-label='Endereço do site'
                            className='w-full bg-transparent outline-none text-sm lg:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500'
                        />
                    </label>

                    <button
                        type='submit'
                        disabled={input.trim().length === 0}
                        className='shrink-0 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer'
                    >
                        Verificar
                    </button>
                </form>

                {isFetching && (
                    <div className='flex flex-col gap-3 sm:gap-4'>
                        <ComplaintCardSkeleton count={2} />
                    </div>
                )}

                {isError && (
                    <ErrorMessage
                        title='Não foi possível verificar'
                        message={messageForError(error)}
                        onRetry={isInvalidAddress(error) ? undefined : () => refetch()}
                    />
                )}

                {showResult && data!.found && (
                    <>
                        <section className='rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 p-5'>
                            <div className='flex items-center gap-3'>
                                <span className='shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40'>
                                    <Warning size={22} weight='fill' className='text-red-500 dark:text-red-400' />
                                </span>
                                <div className='min-w-0'>
                                    <h2 className='font-bold text-red-800 dark:text-red-300'>
                                        {data!.total} denúncia{data!.total !== 1 ? 's' : ''} contra este site
                                    </h2>
                                    <p className='text-sm text-red-600 dark:text-red-400/80 truncate'>
                                        {data!.domain}. Maior nível relatado:{' '}
                                        <span className='font-semibold'>{dangerConfig[worstDanger].label}</span>
                                    </p>
                                </div>
                            </div>

                            <p className='mt-3 text-sm leading-relaxed text-red-700 dark:text-red-300/90'>
                                Leia os relatos antes de comprar ou informar qualquer dado. Denúncia é relato
                                de quem usou o site, não decisão judicial, mas trate como alerta sério.
                            </p>
                        </section>

                        <div className='flex flex-col gap-3 sm:gap-4'>
                            {data!.data.map((complaint) => (
                                <ComplaintCard key={complaint.id} complaint={complaint} />
                            ))}
                        </div>
                    </>
                )}

                {showResult && !data!.found && (
                    <>
                        {/* Resultado vazio não é conteúdo: sem moldura de card, para não
                            competir com o roteiro de checagem, que é o que a tela entrega aqui. */}
                        <div className='py-10 px-6 flex flex-col items-center text-center'>
                            <span className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-500'>
                                <ShieldCheck size={24} weight='bold' />
                            </span>

                            <h2 className='mt-4 text-lg font-bold text-gray-900 dark:text-white'>
                                Nenhuma denúncia por aqui ainda
                            </h2>
                            <p className='mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
                                Procuramos por <span className='font-semibold text-gray-700 dark:text-gray-300'>{data!.domain}</span>.
                                {/* O recado mais importante da tela: ausência de denúncia não é aprovação. */}
                                {' '}Não é atestado de segurança. Site de golpe recém-criado também não tem denúncia.
                            </p>
                        </div>

                        <section className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-5 flex flex-col sm:flex-row sm:items-center gap-4'>
                            <div className='min-w-0 flex-1'>
                                <h2 className='font-bold text-gray-900 dark:text-white'>Já caiu nesse site?</h2>
                                <p className='mt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
                                    Sua denúncia é o que faz a próxima pessoa que colar esse endereço aqui ver o aviso.
                                </p>
                            </div>

                            <button
                                onClick={openComplaintSheet}
                                className='shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-sm shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer'
                            >
                                <Plus size={18} weight='bold' />
                                Fazer denúncia
                            </button>
                        </section>
                    </>
                )}

                {!submitted && !isFetching && (
                    <p className='px-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
                        Funciona com o endereço inteiro ou só com o domínio: protocolo, "www", caminho e
                        parâmetros são ignorados na busca. Subdomínio do site denunciado também casa.
                    </p>
                )}
            </div>
        </main>
    )
}

export default CheckSitePage
