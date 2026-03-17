import React from 'react'
import { Plus } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import ComplaintCard from '../ui/ComplaintCard'


const ComplaintContent: React.FC = () => {

  const navigate = useNavigate()

  return (
    <main className='min-h-screen pb-28 md:pb-16 lg:pb-0 lg:py-8 lg:px-8 flex flex-col items-center gap-6 bg-white dark:bg-gray-950'>
      <div className='p-2 flex justify-end items-end w-full'>
        <button onClick={() => navigate('/create-complaint')} className=' fixed bottom-6 right-2 lg:right-6 flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-400 hover:scale-105 shadow-md cursor-pointer lg:text-lg mb-18 lg:mb-0'>
          <Plus size={24} weight="bold" />
          Fazer Denúncia
        </button>
      </div>
        <div className='flex flex-wrap justify-center items-start gap-6 mt-4 w-full px-4'>
          <ComplaintCard 
            title='Tentativa de Golpe em Loja Online' 
            content='Recebi e-mail suspeito oferecendo desconto de 90% em produtos conhecidos. O site é muito parecido com o original mas tem alguns erros de português.' 
            date='2024/01/10' 
            link='https://www.loja-falsa-exemplo.com/' 
            store='Loja Online X' 
            danger='aviso'
          />
          
          <ComplaintCard 
            title='Cobrança Indevida no Cartão' 
            content='Apareceu uma cobrança que não reconheço na fatura do cartão. Empresa com nome estranho e valor alto. Já entrei em contato com o banco para contestar.' 
            date='2024/01/09' 
            store='Empresa Desconhecida LTDA' 
            danger='cuidado'
          />
          
          <ComplaintCard 
            title='Golpe do Falso Suporte Técnico' 
            content='Recebi ligação de alguém se passando por suporte técnico do banco pedindo dados pessoais e senha. Quase caí no golpe mas desconfiei a tempo.' 
            date='2024/01/08' 
            link='https://www.site-falso-banco.com/' 
            store='Falso Banco Digital' 
            danger='perigo'
          />
          
          <ComplaintCard 
            title='Sequestro Virtual e Extorsão' 
            content='Golpistas ligaram fingindo ter sequestrado familiar e exigiram transferência imediata. Usaram inteligência artificial para imitar a voz. Situação extremamente perigosa!' 
            date='2024/01/07' 
            danger='critico'
          />
        </div>
        
    </main>
  )
}

export default ComplaintContent
