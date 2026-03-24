import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Clock } from '@phosphor-icons/react'

interface ArticleCardProps {
    title: string
    description: string
    bgUrl: string
    id: string
    slug: string
    readTime?: string
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    title,
    description,
    bgUrl,
    slug,
    readTime = '5 min',
}) => {
    const navigate = useNavigate()

    return (
        <article
            onClick={() => navigate(`/articles/${slug}`)}
            className="
                group relative flex flex-col
                w-full sm:w-[calc(50%-16px)] xl:w-[calc(33.333%-20px)]
                bg-gray-200 dark:bg-gray-800/60
                rounded-2xl overflow-hidden cursor-pointer
                border border-gray-300/60 dark:border-gray-700/40
                transition-all duration-300 ease-out
                hover:border-blue-500/30 dark:hover:border-blue-400/30
                hover:-translate-y-1
                hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]
                dark:hover:shadow-[0_8px_30px_rgba(96,165,250,0.06)]
            "
        >
            {/* Image container */}
            <div className="w-full h-48 overflow-hidden">
                {bgUrl ? (
                    <img
                        src={bgUrl}
                        alt={title}
                        className="
                            w-full h-full object-cover
                            transition-transform duration-500 ease-out
                            group-hover:scale-105
                        "
                    />
                ) : (
                    <div className="w-full h-full bg-blue-500" />
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <h3 className="
                    text-base font-bold leading-snug tracking-tight
                    text-gray-900 dark:text-white
                    line-clamp-2
                    group-hover:text-blue-600 dark:group-hover:text-blue-400
                    transition-colors duration-200
                ">
                    {title}
                </h3>

                <p className="
                    text-sm leading-relaxed
                    text-gray-500 dark:text-gray-400
                    line-clamp-2 flex-1
                ">
                    {description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-300/50 dark:border-gray-700/50">
                    <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                        <Clock size={14} weight="bold" />
                        <span className="text-xs font-medium">{readTime} de leitura</span>
                    </div>

                    <div className="
                        flex items-center gap-1.5
                        text-xs font-semibold
                        text-blue-500 dark:text-blue-400
                        group-hover:gap-2.5
                        transition-all duration-300
                    ">
                        <span>Ler</span>
                        <ArrowRight
                            size={14}
                            weight="bold"
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ArticleCard
