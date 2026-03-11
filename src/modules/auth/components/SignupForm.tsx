import React, { useState } from 'react'
import Input from '../../../shared/components/Input';



const SignupForm: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');


  return (
    <form className="py-8 md:py-16 lg:py-8 w-full max-w-md  px-7">
      <div className='flex flex-col gap-4 w-full'>
        <h2 className='text-blue-500 dark:text-white self-center font-bold text-3xl hidden lg:flex xl:text-4xl mb-8'>
          Criar Conta
        </h2>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name"
            className='text-blue-500 font-semibold text-lg xl:text-xl dark:text-white'>Nome</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email"
            className='text-blue-500 font-semibold text-lg xl:text-xl dark:text-white'>Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password"
            className='text-blue-500 font-semibold text-lg xl:text-xl dark:text-white'>Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            password={true}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password"
            className='text-blue-500 font-semibold text-lg xl:text-xl dark:text-white'>Confirmar Senha</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Digite sua senha"
            password={true}
          />
        </div>
        <div className='flex flex-col my-4 mt-8 gap-2'>
          <button
            className='w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-300 mb-2 font-semibold cursor-pointer hover:translate-y-[-2px] lg:text-lg'>
            Enviar Formulário
          </button>
        </div>

      </div>

    </form>
  )
}

export default SignupForm;
