import React from 'react'
import Input from '@/shared/components/Input';
import useNavigateTo from '@/shared/hooks/useNavigateTo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../types/signIn';
import type { SignIn } from '../types/signIn';
import ErrorText from '@/shared/components/ErrorText';
import Spinner from '@/shared/components/Spinner';
import { useSignIn } from '../hooks/useSignIn';
import { showError } from '@/shared/components/Toast';
import { useQueryClient } from '@tanstack/react-query';


const LoginForm: React.FC = () => {

  const navigateTo = useNavigateTo();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema)
  })

  const { mutate, isPending } = useSignIn()

  const onSubmit = (data: SignIn) => {
      mutate( data, {
        onSuccess: async () => {
          await queryClient.refetchQueries({ queryKey: ['me'] })
          navigateTo('/')
        },
        onError: () => showError('Erro ao fazer login')
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md px-6 lg:px-8 flex flex-col gap-6 lg:gap-8 my-4">
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
            {...register('email')}
            placeholder="Digite seu email"
          />
          <ErrorText message={errors.email?.message} />
        </div>

        <div className='flex flex-col gap-1.5 lg:gap-2'>
          <label htmlFor="password"
            className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>Senha</label>
          <Input
            {...register('password')}
            placeholder="Digite sua senha"
            password={true}
          />
          <ErrorText message={errors.password?.message} />
          <button type="button" className='text-sm lg:text-base text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer self-end mt-1 font-medium transition-colors duration-200'>
            Esqueceu a senha?
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-3 lg:gap-4 mt-2'>
        <button
          type="submit"
          disabled={isPending}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 lg:py-3.5 rounded-full font-semibold cursor-pointer transition-all duration-200 active:scale-[0.98] text-base lg:text-lg disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center'>
          {isPending ? <Spinner size="sm" className="border-white border-t-transparent" /> : 'Entrar'}
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
