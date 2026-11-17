import React from 'react'
import { Plus } from '@phosphor-icons/react'
import useNavigateTo from '@/shared/hooks/useNavigateTo'
import ComplaintCard from '@/modules/complaints/components/ComplaintCard'
import type { Complaint } from '../types/complaint'

// Vitrine estática do card, com dados de exemplo. Nenhuma rota monta este
// componente — a listagem real é a ComplaintsPage. Serve só para olhar os quatro
// níveis de perigo lado a lado sem depender da API.
const mockComplaints: Complaint[] = [
  {
    id: 'mock-1',
    userId: 'mock-user',
    title: 'Tentativa de Golpe em Loja Online',
    content: 'Recebi e-mail suspeito oferecendo desconto de 90% em produtos conhecidos. O site é muito parecido com o original mas tem alguns erros de português.',
    createdAt: '2024-01-10T12:00:00.000Z',
    link: 'https://www.loja-falsa-exemplo.com/',
    store: 'Loja Online X',
    danger: 'aviso',
  },
  {
    id: 'mock-2',
    userId: 'mock-user',
    title: 'Cobrança Indevida no Cartão',
    content: 'Apareceu uma cobrança que não reconheço na fatura do cartão. Empresa com nome estranho e valor alto. Já entrei em contato com o banco para contestar.',
    createdAt: '2024-01-09T12:00:00.000Z',
    store: 'Empresa Desconhecida LTDA',
    danger: 'cuidado',
  },
  {
    id: 'mock-3',
    userId: 'mock-user',
    title: 'Golpe do Falso Suporte Técnico',
    content: 'Recebi ligação de alguém se passando por suporte técnico do banco pedindo dados pessoais e senha. Quase caí no golpe mas desconfiei a tempo.',
    createdAt: '2024-01-08T12:00:00.000Z',
    link: 'https://www.site-falso-banco.com/',
    store: 'Falso Banco Digital',
    danger: 'perigo',
  },
  {
    id: 'mock-4',
    userId: 'mock-user',
    title: 'Sequestro Virtual e Extorsão',
    content: 'Golpistas ligaram fingindo ter sequestrado familiar e exigiram transferência imediata. Usaram inteligência artificial para imitar a voz. Situação extremamente perigosa!',
    createdAt: '2024-01-07T12:00:00.000Z',
    danger: 'critico',
  },
]

const ComplaintContent: React.FC = () => {

  const navigateTo = useNavigateTo()

  return (
    <main className='pt-5 sm:pt-8 pb-28 md:pb-16'>
      <div className='mx-auto w-full max-w-2xl px-3 sm:px-4 flex flex-col gap-3 sm:gap-4'>
        {mockComplaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))}
      </div>

      <button
        onClick={() => navigateTo('/create-complaint')}
        className='fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-20 flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg cursor-pointer transition-colors duration-200'
      >
        <Plus size={20} weight='bold' />
        Fazer Denúncia
      </button>
    </main>
  )
}

export default ComplaintContent
