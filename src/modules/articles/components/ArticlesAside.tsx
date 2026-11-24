import React from 'react'
import { Clock, ShieldCheck } from '@phosphor-icons/react'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import { readTimeOf } from '../utils/articleMeta'
import { formatRelativeTime } from '@/shared/utils/formatRelativeTime'
import type { Article } from '../types/article'

interface ArticlesAsideProps {
    articles: Article[]
}

// Coluna da direita do feed: o que saiu por último e por que o assunto importa.
// Só aparece em telas largas, abaixo disso o feed ocupa a largura toda.
const ArticlesAside: React.FC<ArticlesAsideProps> = ({ articles }) => {
    const navigateTo = useNavigateTo()

    const latest = articles.slice(0, 5)

    // O mt alinha o topo da coluna com o primeiro card do feed, abaixo do título
    // e da busca. O sticky assume a partir daí, quando a página rola.
    return (
        <aside className='hidden xl:flex flex-col gap-4 w-80 shrink-0 sticky top-8 self-start mt-[7.5rem]'>
            {latest.length > 0 && (
                <section className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-5'>
                    <h2 className='text-sm font-bold text-gray-900 dark:text-white'>Publicados recentemente</h2>

                    <ul className='flex flex-col mt-3 -mx-2'>
                        {latest.map((article) => (
                            <li key={article.id}>
                                <button
                                    onClick={() => navigateTo(`/articles/${article.id}`)}
                                    className='w-full text-left px-2 py-2.5 rounded-lg cursor-pointer hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors duration-200 group'
                                >
                                    <p className='text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200'>
                                        {article.title}
                                    </p>
                                    <span className='flex items-center gap-1.5 mt-1 text-xs text-gray-500 dark:text-gray-400'>
                                        <span className='truncate max-w-32'>{article.user?.name ?? 'Autor'}</span>
                                        <span className='w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600' />
                                        <Clock size={12} weight='bold' />
                                        <span>{readTimeOf(article.content)}</span>
                                        <span className='w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600' />
                                        <span>{formatRelativeTime(article.createdAt)}</span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-5'>
                <div className='flex items-center gap-2'>
                    <ShieldCheck size={20} weight='fill' className='text-blue-500' />
                    <h2 className='text-sm font-bold text-gray-900 dark:text-white'>Sobre os artigos</h2>
                </div>
                <p className='mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
                    Conteúdo escrito pela comunidade sobre golpes, prevenção e proteção digital.
                    Leu algo que ajudou? Compartilhe com quem precisa.
                </p>
            </section>
        </aside>
    )
}

export default ArticlesAside
