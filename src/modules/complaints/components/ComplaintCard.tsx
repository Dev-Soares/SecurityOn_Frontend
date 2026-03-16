import React from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { dangerConfig } from '../config/dangerConfig';
import type { DangerType } from '../config/dangerConfig';


interface ComplaintCardProps {
    title: string;
    store?: string;
    content: string;
    link?: string;
    date: string;
    danger?: DangerType;
}



const ComplaintCard: React.FC<ComplaintCardProps> = ({ title, store, content, link, date, danger = 'aviso' }) => {

    const config = dangerConfig[danger]

    const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })

    return (
        <article className="group relative w-full flex flex-row bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">

            {/* Left accent bar */}
            <div className={`w-1 shrink-0 self-stretch ${config.bar}`} />

            <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.badge}`}>
                        {config.label}
                    </span>
                    {store && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">{store}</span>
                    )}
                    <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">{formattedDate}</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug">{title}</h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                    {content}
                </p>

                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors mt-1"
                    >
                        <ArrowUpRight size={14} weight="bold" className="shrink-0" />
                        <span>Ver site</span>
                    </a>
                )}
            </div>
        </article>
    )
}

export default ComplaintCard
