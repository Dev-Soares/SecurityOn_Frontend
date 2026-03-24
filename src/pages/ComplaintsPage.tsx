import React, { useState } from 'react'
import { Plus } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import ComplaintCard from '@/modules/complaints/components/ComplaintCard'


type DangerFilter = 'todos' | 'aviso' | 'cuidado' | 'perigo' | 'critico'

const filters: { value: DangerFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'aviso', label: 'Aviso' },
  { value: 'cuidado', label: 'Cuidado' },
  { value: 'perigo', label: 'Perigo' },
  { value: 'critico', label: 'Crítico' },
]

const complaints = [
  { title: 'Tentativa de Golpe em Loja Online', content: 'Recebi e-mail suspeito oferecendo desconto de 90% em produtos conhecidos. O site é muito parecido com o original mas tem alguns erros de português.', date: '2024/01/10', link: 'https://www.loja-falsa-exemplo.com/', store: 'Loja Online X', danger: 'aviso' as const },
  { title: 'Cobrança Indevida no Cartão', content: 'Apareceu uma cobrança que não reconheço na fatura do cartão. Empresa com nome estranho e valor alto. Já entrei em contato com o banco para contestar.', date: '2024/01/09', store: 'Empresa Desconhecida LTDA', danger: 'cuidado' as const },
  { title: 'Golpe do Falso Suporte Técnico', content: 'Recebi ligação de alguém se passando por suporte técnico do banco pedindo dados pessoais e senha. Quase caí no golpe mas desconfiei a tempo.', date: '2024/01/08', link: 'https://www.site-falso-banco.com/', store: 'Falso Banco Digital', danger: 'perigo' as const },
  { title: 'Sequestro Virtual e Extorsão', content: 'Golpistas ligaram fingindo ter sequestrado familiar e exigiram transferência imediata. Usaram inteligência artificial para imitar a voz. Situação extremamente perigosa!', date: '2024/01/07', danger: 'critico' as const },
]

const ComplaintsPage: React.FC = () => {

  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<DangerFilter>('todos')

  const filtered = activeFilter === 'todos' ? complaints : complaints.filter(c => c.danger === activeFilter)

  return (
    <main className='min-h-screen pb-28 md:pb-16 lg:pb-0 lg:py-8 lg:px-8 flex flex-col items-center gap-6 bg-white dark:bg-gray-950'>

      {/* Header */}
      <div className='w-full max-w-4xl px-4 pt-4'>
        <div className='flex items-center justify-between'>
          <div className='mt-8'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Denúncias da Comunidade</h1>
            <p className='text-sm text-gray-500 dark:text-gray-400 mt-0.5'>Ajude a proteger outros usuários reportando golpes e fraudes</p>
          </div>
          <button onClick={() => navigate('/create-complaint')} className='hidden lg:flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer text-sm'>
            <Plus size={18} weight="bold" />
            Fazer Denúncia
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className='w-full max-w-4xl px-4 flex flex-col gap-2'>
        <div className='flex items-center gap-2 flex-wrap'>
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                ${activeFilter === f.value
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className='text-xs text-gray-400 dark:text-gray-500'>{filtered.length} denúncia{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* FAB mobile */}
      <button onClick={() => navigate('/create-complaint')} className='lg:hidden fixed bottom-24 right-4 flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-lg cursor-pointer z-10'>
        <Plus size={20} weight="bold" />
        Denunciar
      </button>

        <div className='flex flex-col gap-4 w-full max-w-2xl px-4 mt-8'>
          {filtered.map((c, i) => (
            <ComplaintCard key={i} {...c} />
          ))}
        </div>
        
    </main>
  )
}

export default ComplaintsPage
