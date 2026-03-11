import React, { useState } from 'react'
import Input from '../../../shared/components/Input';
import { useNavigate } from 'react-router-dom';


const LoginForm: React.FC = () => {

  const navigateTo = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="py-8 md:py-16 lg:p-0 lg:h-full w-full max-w-md  px-7 lg:flex lg:justify-center lg:items-center lg:w-[80%]">
      <div className='flex flex-col gap-4 w-full'>
        <h2 className='text-blue-500 dark:text-white self-center font-bold text-4xl hidden lg:flex xl:text-5xl mb-16'>
          Fazer Login
        </h2>
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
          <p className='text-sm text-blue-500 cursor-pointer hover:underline self-end mt-2 font-medium dark:text-white'>Esqueceu a senha?</p>
        </div>
        <div className='flex flex-col my-4 gap-2'>
          <button
            className='w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-300 mb-2 font-semibold cursor-pointer hover:translate-y-[-2px] lg:text-lg'>
            Entrar
          </button>
          <p className='self-center text-lg font-semibold text-blue-500 dark:text-white'>Ou</p>
          <button 
            onClick={() => navigateTo('/signup')}
            className='w-full border-2 border-blue-500 text-blue-500 py-3 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-300 mt-2 font-semibold dark:text-white dark:border-white dark:hover:border-blue-500 cursor-pointer hover:translate-y-[-2px] lg:text-lg'>
            Criar Conta
          </button>
        </div>

      </div>

    </form>
  )
}

export default LoginForm;
