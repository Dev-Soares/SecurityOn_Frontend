import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@phosphor-icons/react'

const ArticleDetailPage: React.FC = () => {
  const navigate = useNavigate()

  //TODAS essas variaveis devem ser buscadas via API, deixando o componente limpo e simplificado

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
    <main className='pb-16 h-full min-h-screen w-full bg-white dark:bg-gray-950'>
        <div className={`${bgUrl ? '' : 'bg-blue-500'} w-full h-45 md:h-80 lg:h-80 rounded-b-2xl overflow-hidden relative`}>
          {bgUrl && <img src={bgUrl} alt={title} className='w-full h-full object-cover' />}
          <button 
            onClick={() => navigate('/articles')}
            className='absolute top-4 right-4 cursor-pointer bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm text-blue-600 dark:text-blue-400 p-3 rounded-full shadow-md transition-all hover:scale-110 hover:shadow-md'
            aria-label='Voltar'
          >
            <ArrowLeftIcon size={24} weight="bold" />
          </button>
        </div>
        <div className='px-6 md:px-12 py-6 text-blue-700 dark:text-blue-400 md:max-w-[70%] lg:max-w-[80%] xl:max-w-[70%] lg:mt-4'>
          <h2 className='font-custom text-3xl md:text-4xl xl:text-5xl '>{title}</h2>
          <p className='text-lg md:text-xl mt-2 md:mt-3 lg:mt-4 font-medium'>Escrito por {author}</p>
        </div>
        <article className=' text-lg xl:text-xl font-medium px-6 md:px-12 space-y-4 text-gray-800 dark:text-gray-200 2xl:max-w-[85%]'>
          {content.map((paragraph, index) => (
            <p key={index} className='text-justify leading-relaxed'>
              {paragraph}
            </p>
          ))}
        </article>
    </main>
  )
}

export default ArticleDetailPage;
