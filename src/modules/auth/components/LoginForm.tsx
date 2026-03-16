import React, { useState } from 'react'
import Input from '../../../shared/components/Input';
import { useNavigate } from 'react-router-dom';


const LoginForm: React.FC = () => {

  const navigateTo = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="w-full max-w-md px-6 lg:px-8 flex flex-col gap-6 lg:gap-8">
      <div className='flex flex-col gap-1 lg:gap-2'>
        <h2 className='text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white'>
          Bem-vindo de volta
        </h2>
        <p className='text-sm lg:text-lg text-gray-500 dark:text-gray-400'>
          Entre na sua conta para continuar
        </p>
      </div>

      <div className='flex flex-col gap-4 lg:gap-5'>
        <div className='flex flex-col gap-1.5 lg:gap-2'>
          <label htmlFor="email"
            className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </div>

        <div className='flex flex-col gap-1.5 lg:gap-2'>
          <label htmlFor="password"
            className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            password={true}
          />
          <button type="button" className='text-sm lg:text-base text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer self-end mt-1 font-medium transition-colors duration-200'>
            Esqueceu a senha?
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-3 lg:gap-4 mt-2'>
        <button
          type="submit"
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 lg:py-3.5 rounded-full font-semibold cursor-pointer transition-all duration-200 active:scale-[0.98] text-base lg:text-lg'>
          Entrar
        </button>

        <div className='flex items-center gap-3 my-1'>
          <div className='flex-1 h-px bg-gray-200 dark:bg-gray-800' />
          <span className='text-sm lg:text-base text-gray-400 dark:text-gray-500'>ou</span>
          <div className='flex-1 h-px bg-gray-200 dark:bg-gray-800' />
        </div>

        <button
          type="button"
          onClick={() => navigateTo('/signup')}
          className='w-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 lg:py-3.5 rounded-full font-semibold cursor-pointer transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 active:scale-[0.98] text-base lg:text-lg'>
          Criar Conta
        </button>
      </div>
    </form>
  )
}

export default LoginForm;
