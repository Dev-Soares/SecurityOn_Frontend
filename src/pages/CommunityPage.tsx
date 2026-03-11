import React, { useState } from 'react'
import Post from '../modules/community/components/Post'
import { ImageIcon } from '@phosphor-icons/react'
import ModalPost from '../modules/community/components/ModalPost'

const CommunityPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className='py-3 px-2 min-h-screen pb-28 md:pb-16 lg:pb-0 lg:py-8 lg:px-8 flex flex-col gap-6 bg-white dark:bg-gray-950'>
        
      <div className='bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 shadow-md border border-gray-300 dark:border-gray-700 w-full md:w-[70%] xl:w-[50%] mx-auto'>
        <div className='flex flex-row items-center gap-3'>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className='flex-1 flex items-center cursor-pointer rounded-3xl transition-all duration-300 hover:scale-[1.01]'
          >
            <input 
              type="text" 
              readOnly 
              className='w-full h-12 bg-white dark:bg-gray-700 rounded-3xl px-4 text-gray-950 dark:text-white border-2 border-gray-300 dark:border-gray-600 pointer-events-none cursor-pointer transition-all duration-500' 
              placeholder="O que você está pensando?" 
            />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className='p-3 cursor-pointer rounded-full hover:bg-blue-700 dark:hover:bg-blue-500 transition-all duration-500 bg-blue-500 dark:bg-blue-600 hover:scale-110 shadow-md'
          >
            <ImageIcon size={24} weight="regular" className='text-white' />
          </button>     
        </div>
      </div>
      <ModalPost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <div className='flex flex-col gap-3 justify-center items-center md:gap-5'>
            <Post username='Bernardo Soares' content='O desenvolvimento de novas tecnologias exige criatividade e lógica. Em um mundo cada vez mais conectado, a interface do usuário desempenha um papel fundamental na experiência digital. É necessário testar cores, tipografia e responsividade para garantir que a mensagem chegue de forma clara e eficiente. Este é apenas um texto simulado para preencher espaços vazios no seu projeto de design ou código.' timestamp='16/12/2025' imgUrl='imgTeste.jpg' />
            <Post username='Ana Clara' content='A segurança digital é um tema cada vez mais relevante na sociedade atual. Com o avanço da tecnologia, é fundamental estar atento às práticas de proteção de dados e privacidade online. Utilizar senhas fortes, manter softwares atualizados e evitar clicar em links suspeitos são algumas das medidas essenciais para garantir a segurança na internet.' timestamp='10/11/2025' imgUrl='imgTeste.jpg' />
        </div>
        


    </main>
  )
}

export default CommunityPage
