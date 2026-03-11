import React from 'react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

interface ArticleCardProps {
    title: string;
    description?: string;
    bgUrl?: string | false;
    id: string;
    slug: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, bgUrl, slug }) => {

    const navigate = useNavigate();

    //busca por slug, o titulo pequeno que ficara na url

    return (
        <button onClick={() => navigate(`/articles/${slug}`)} className={`w-full h-75 md:h-85 xl:h-90 bg-cover bg-center rounded-lg shadow-md bg-gray-100 dark:bg-gray-900 bg-opacity-50 overflow-hidden flex flex-col justify-end group cursor-pointer hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 max-w-md`}>
            <div className={`${bgUrl ? '' : 'bg-blue-500'} w-full h-full rounded-b-lg overflow-hidden`}>
                {bgUrl && <img src={bgUrl} alt={title} className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' />}
            </div>
            <div className="w-full h-full p-4 flex flex-col justify-start items-start rounded-2xl text-blue-600 dark:text-white">
                <h2 className=" text-2xl font-bold mb-2">{title}</h2>
                {description && <p className=" text-sm text-start">{description}</p>}
            </div>
            <div className='p-4 bg-opacity-90 hover:bg-opacity-100 transition-all cursor-pointer text-blue-600 dark:text-white font-semibold flex items-center gap-2'>
                <p>
                    Read Article
                </p>
                <ArrowRightIcon size={20} weight="regular" className="group-hover:translate-x-1 transition-transform" />

            </div>
        </button>
    )
}

export default ArticleCard
