import React from 'react'
import { Warning, Shield, Fire, Skull } from '@phosphor-icons/react'

type DangerType = 'aviso' | 'cuidado' | 'perigo' | 'critico'

interface ComplaintCardProps {
    title: string;
    store?: string;
    content: string;
    link?: string;
    date: string;
    danger?: DangerType;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ title, store, content, link, date, danger = 'perigo' }) => {

  const dangerConfig = {
    aviso: {
      bgColor: 'bg-yellow-600',
      iconColor: 'text-yellow-600',
      icon: Warning
    },
    cuidado: {
      bgColor: 'bg-orange-600',
      iconColor: 'text-orange-600',
      icon: Shield
    },
    perigo: {
      bgColor: 'bg-red-600',
      iconColor: 'text-red-600',
      icon: Fire
    },
    critico: {
      bgColor: 'bg-red-700',
      iconColor: 'text-red-700',
      icon: Skull
    }
  }

  const config = dangerConfig[danger] || dangerConfig.perigo
  const IconComponent = config.icon

  return (

    <div className="w-full max-w-80 lg:max-w-100 h-[500px] flex flex-col rounded-xl shadow-md overflow-hidden bg-gray-100 dark:bg-gray-900 border-2 dark:border-gray-700 border-gray-300">
        <div className={`${config.bgColor} w-full h-[90px] p-4 flex flex-row justify-start items-center gap-4`}>
            <div className='bg-white rounded-lg p-2 flex-shrink-0'>
                <IconComponent size={24} weight="fill" className={`${config.iconColor} text-2xl`} />
            </div>
            {title && <h2 className='text-white font-semibold text-base md:text-lg line-clamp-2'>{title}</h2>}
        </div>
        <div className='flex-1 flex flex-col overflow-hidden'>
            <div className='p-4 flex flex-col gap-3 h-full'>
                {store && <p className='text-blue-600 dark:text-blue-400 font-semibold text-md md:text-base '>Loja/Empresa: <span className='text-blue-600 dark:text-white'>{store}</span></p>}
                <p className='text-gray-800 font-medium dark:text-gray-200 text-md md:text-lg flex-1 overflow-y-auto line-clamp-6'>{content}</p>
                {link && <a href={link} target='_blank' rel='noopener noreferrer' className='text-blue-600 dark:text-blue-400 underline truncate text-md'>Link: {link}</a>}
                <hr className='text-gray-500' />
                <p className='text-gray-500 dark:text-gray-400 text-md '>Data: {date}</p>
            </div>
        </div>     
    </div>

  )
}

export default ComplaintCard
