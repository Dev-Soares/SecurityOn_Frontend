import React, { useMemo } from 'react'
import { ShieldCheck } from '@phosphor-icons/react'
import { dangerConfig, dangerLevels } from '../config/dangerConfig'
import type { DangerType } from '../config/dangerConfig'
import type { Complaint } from '../types/complaint'

interface ComplaintsAsideProps {
    complaints: Complaint[]
}

// Coluna da direita do feed: o que a lista já carregada diz em números.
// Tudo é derivado das denúncias em memória, a API não tem rota de agregação,
// então os totais acompanham o que o scroll infinito trouxe até agora.
const ComplaintsAside: React.FC<ComplaintsAsideProps> = ({ complaints }) => {

    const byDanger = useMemo(() => {
        const counts: Record<DangerType, number> = { aviso: 0, cuidado: 0, perigo: 0, critico: 0 }

        complaints.forEach(({ danger }) => {
            const level = danger ?? 'aviso'
            if (level in counts) counts[level] += 1
        })

        return counts
    }, [complaints])

    const total = complaints.length

    // O mt alinha o topo da coluna com o primeiro card do feed, abaixo do título
    // e da busca. O sticky assume a partir daí, quando a página rola.
    return (
        <aside className='hidden xl:flex flex-col gap-4 w-80 shrink-0 sticky top-8 self-start mt-[8.5rem]'>

            {total > 0 && (
                <section className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-5'>
                    <h2 className='text-sm font-bold text-gray-900 dark:text-white'>Por nível de perigo</h2>
                    <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
                        {total} denúncia{total !== 1 ? 's' : ''} carregada{total !== 1 ? 's' : ''}
                    </p>

                    <ul className='flex flex-col gap-2.5 mt-4'>
                        {dangerLevels.map((level) => {
                            const config = dangerConfig[level]
                            const count = byDanger[level]
                            const share = total > 0 ? Math.round((count / total) * 100) : 0

                            return (
                                <li key={level}>
                                    <p className='flex items-center gap-2 text-xs'>
                                        <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                                        <span className='font-semibold text-gray-700 dark:text-gray-300'>
                                            {config.label}
                                        </span>
                                        <span className='ml-auto text-gray-500 dark:text-gray-400'>{count}</span>
                                    </p>

                                    <span className='block mt-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden'>
                                        <span
                                            className={`block h-full rounded-full ${config.bar} transition-all duration-500`}
                                            style={{ width: `${share}%` }}
                                        />
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            )}

            <section className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-5'>
                <div className='flex items-center gap-2'>
                    <ShieldCheck size={20} weight='fill' className='text-blue-500' />
                    <h2 className='text-sm font-bold text-gray-900 dark:text-white'>Como denunciar bem</h2>
                </div>
                <ul className='mt-2.5 flex flex-col gap-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
                    <li>Diga o nome da loja ou empresa e, se tiver, o link do site.</li>
                    <li>Conte o que aconteceu na ordem: como chegaram em você e o que pediram.</li>
                    <li>Escolha o nível de perigo pelo risco real de quem cair no golpe.</li>
                    <li>Não publique dados pessoais seus nem de terceiros.</li>
                </ul>
            </section>
        </aside>
    )
}

export default ComplaintsAside
