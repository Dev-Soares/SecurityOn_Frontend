import React from 'react'
import ArticleCard from '../modules/articles/components/ArticleCard'
import SearchBar from '../shared/components/SearchBar'

const ArticlesPage: React.FC = () => {
  return (
    <main className='pb-16 pt-4'>
      <div className='p-2 flex justify-center items-center'>
        <SearchBar />
      </div>

      <div className='p-2 px-4 xl:px-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-4 max-w-6xl mx-auto'>
        <ArticleCard
          title="Dicas de Segurança Residencial"
          description="Aprenda as melhores práticas para proteger sua casa contra invasões e furtos. Sistemas de alarme, câmeras e vigilância."
          bgUrl='https://images.unsplash.com/photo-1558002038-1055907df827?w=800'
          id="1"
          slug='dicas-seguranca-residencial'

          readTime="5 min"
        />
        <ArticleCard
          title="Prevenção de Furtos em Veículos"
          description="Saiba como proteger seu carro de roubos e furtos. Dicas práticas e tecnologias disponíveis no mercado."
          bgUrl='https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800'
          id="2"
          slug='prevencao-furtos-veiculos'

          readTime="4 min"
        />
        <ArticleCard
          title="Segurança Digital e Golpes Online"
          description="Proteja-se contra fraudes digitais, phishing e roubos de dados. Guia completo de segurança na internet."
          bgUrl='https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800'
          id="3"
          slug='seguranca-digital-golpes'

          readTime="7 min"
        />
        <ArticleCard
          title="Iluminação Pública e Segurança"
          description="Como a iluminação adequada das ruas pode reduzir índices de criminalidade no seu bairro."
          bgUrl='https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800'
          id="4"
          slug='iluminacao-publica-seguranca'

          readTime="3 min"
        />
        <ArticleCard
          title="Vizinhança Solidária"
          description="Programas de vigilância comunitária e como criar uma rede de apoio no seu bairro para maior segurança."
          bgUrl='https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800'
          id="5"
          slug='vizinhanca-solidaria'

          readTime="6 min"
        />
        <ArticleCard
          title="Tecnologia a Favor da Segurança"
          description="Conheça aplicativos e dispositivos inteligentes que podem ajudar na proteção pessoal e patrimonial."
          bgUrl='https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'
          id="6"
          slug='tecnologia-seguranca'

          readTime="5 min"
        />
      </div>
    </main>
  )
}

export default ArticlesPage
