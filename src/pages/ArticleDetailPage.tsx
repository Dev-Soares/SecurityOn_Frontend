import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, ShareNetwork, CalendarBlank } from '@phosphor-icons/react'

const ArticleDetailPage: React.FC = () => {
  const navigate = useNavigate()

  const title = "Como Proteger Sua Comunidade Contra Roubos"
  const bgUrl = '/teste.jpeg'
  const content = [
    "A segurança em nossas comunidades é uma responsabilidade compartilhada que requer vigilância constante e cooperação entre todos os moradores. Nos últimos anos, temos observado um aumento nos casos de furtos e roubos em áreas residenciais, o que torna essencial a implementação de medidas preventivas eficazes.",
    "Uma das estratégias mais eficientes é a criação de grupos de vigilância comunitária. Esses grupos, formados por vizinhos engajados, permitem a troca rápida de informações sobre atividades suspeitas e a coordenação de ações preventivas. Através de aplicativos de mensagens e redes sociais, é possível manter todos informados em tempo real.",
    "Além disso, investir em segurança residencial básica faz toda a diferença. Certifique-se de que todas as portas e janelas possuem fechaduras de qualidade, instale sistemas de iluminação externa com sensores de movimento e considere a instalação de câmeras de segurança. Essas medidas simples podem desencorajar significativamente a ação de criminosos.",
    "É fundamental também manter uma boa relação com seus vizinhos. Conhecer as pessoas que moram ao redor permite identificar mais facilmente situações anormais. Quando você viaja, por exemplo, um vizinho de confiança pode recolher sua correspondência e manter um olhar atento sobre sua propriedade.",
    "Por fim, lembre-se sempre de registrar qualquer ocorrência suspeita às autoridades competentes. Denúncias anônimas podem ser feitas através dos canais oficiais, e cada informação contribui para um mapeamento mais preciso das atividades criminosas na região. Juntos, podemos construir comunidades mais seguras para todos."
  ]
  const author = "Admin SemRoubo"

  return (
    <main className='pb-20 min-h-screen w-full'>
      <div className='mx-auto max-w-3xl px-6 md:px-10 pt-6'>

        {/* Top nav */}
        <div className='flex items-center justify-between mb-8'>
          <button
            onClick={() => navigate('/articles')}
            className='
              flex items-center gap-2
              text-sm font-medium cursor-pointer
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-gray-200
              transition-colors duration-200
            '
          >
            <ArrowLeft size={18} weight="bold" />
            <span>Voltar</span>
          </button>

          <button
            className='
              p-2 rounded-lg cursor-pointer
              text-gray-400 dark:text-gray-500
              hover:text-gray-600 dark:hover:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800/50
              transition-all duration-200
            '
            aria-label='Compartilhar'
          >
            <ShareNetwork size={20} weight="bold" />
          </button>
        </div>

        {/* Title */}
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white'>
          {title}
        </h1>

        {/* Meta row */}
        <div className='flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center'>
              <span className='text-xs font-bold text-blue-600 dark:text-blue-400'>
                {author.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className='font-medium text-gray-700 dark:text-gray-300'>{author}</span>
          </div>

          <span className='w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600' />

          <div className='flex items-center gap-1.5'>
            <CalendarBlank size={14} weight="bold" />
            <span>16 Mar 2026</span>
          </div>

          <span className='w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600' />

          <div className='flex items-center gap-1.5'>
            <Clock size={14} weight="bold" />
            <span>5 min de leitura</span>
          </div>
        </div>

        {/* Hero image */}
        {bgUrl && (
          <div className='mt-8 rounded-xl overflow-hidden'>
            <img
              src={bgUrl}
              alt={title}
              className='w-full h-56 md:h-72 lg:h-80 object-cover'
            />
          </div>
        )}

        {/* Article body */}
        <article className='mt-8 space-y-5'>
          {content.map((paragraph, index) => (
            <p
              key={index}
              className='text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300'
            >
              {paragraph}
            </p>
          ))}
        </article>

        {/* Bottom divider */}
        <div className='mt-10 h-px bg-gray-200 dark:bg-gray-800' />

        {/* Bottom actions */}
        <div className='flex items-center justify-between mt-6'>
          <button
            onClick={() => navigate('/articles')}
            className='
              flex items-center gap-2
              text-sm font-medium cursor-pointer
              text-blue-600 dark:text-blue-400
              hover:text-blue-700 dark:hover:text-blue-300
              transition-colors duration-200
            '
          >
            <ArrowLeft size={16} weight="bold" />
            <span>Todos os artigos</span>
          </button>

          <button
            className='
              flex items-center gap-2
              px-4 py-2 rounded-full
              text-sm font-medium cursor-pointer
              bg-blue-500 hover:bg-blue-600
              text-white
              transition-colors duration-200
            '
          >
            <ShareNetwork size={16} weight="bold" />
            <span className='hidden sm:inline'>Compartilhar</span>
          </button>
        </div>
      </div>
    </main>
  )
}

export default ArticleDetailPage
