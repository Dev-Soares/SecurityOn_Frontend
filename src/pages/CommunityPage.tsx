import React, { useState } from 'react'
import Post from '../modules/community/components/Post'
import { Image } from '@phosphor-icons/react'
import ModalPost from '../modules/community/components/ModalPost'

const CommunityPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className='py-3 px-2 min-h-screen pb-28 md:pb-16 lg:pb-0 lg:py-8 lg:px-8 flex flex-col gap-6 bg-white dark:bg-gray-950'>

      <div className='w-full md:w-[70%] xl:w-[50%] mx-auto mt-4 px-3 md:px-0'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Comunidade</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Compartilhe e conecte-se com outros usuários</p>
      </div>

      <div className='bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 w-full md:w-[70%] xl:w-[50%] mx-auto hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200'>
        <div className='flex flex-row items-center gap-3'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='group flex-1 flex items-center cursor-pointer rounded-full transition-all duration-200'
          >
            <input
              type="text"
              readOnly
              className='w-full h-11 bg-white dark:bg-gray-800 rounded-full px-4 text-gray-950 dark:text-white border border-gray-200 dark:border-gray-700 pointer-events-none cursor-pointer placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors duration-200'
              placeholder="O que você está pensando?"
            />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className='p-2.5 cursor-pointer rounded-full transition-colors duration-200 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-200/70 dark:hover:bg-gray-800/70'
          >
            <Image size={22} weight="bold" />
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
