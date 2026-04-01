import React, { useState } from 'react'
import Input from '@/shared/components/Input';
import useNavigateTo from '@/shared/hooks/useNavigateTo';
import { ArrowLeft } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../types/signUp';
import type { SignUp } from '../types/signUp';
import ErrorText from '@/shared/components/ErrorText';
import Spinner from '@/shared/components/Spinner';
import { useSignUp } from '../hooks/useSignUp';
import { useAutoLogin } from '../hooks/useAutoLogin';
import { showError } from '@/shared/components/Toast';

const steps = [
  { title: 'Como podemos te chamar?', subtitle: 'Escolha seu nome e username' },
  { title: 'Qual seu email?', subtitle: 'Usaremos para login e notificações' },
  { title: 'Crie sua senha', subtitle: 'Mínimo de 8 caracteres' },
]

const stepFields: (keyof SignUp)[][] = [
  ['name'],
  ['email'],
  ['password', 'confirmPassword'],
]

const SignupForm: React.FC = () => {

  const navigateTo = useNavigateTo();
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema)
  })

  const { mutate, isPending } = useSignUp()
  const { mutate: autoLogin } = useAutoLogin()

  const handleNext = async () => {
    const valid = await trigger(stepFields[step])
    if (valid) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const onSubmit = (data: SignUp) => {
    const { confirmPassword, ...payload } = data
    mutate(payload, {
      onSuccess: () => {
        autoLogin({ email: payload.email, password: payload.password })
      },
      onError: () => showError('Erro ao criar conta')
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 2) {
      handleNext()
    } else {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="w-full max-w-md px-6 lg:px-8 flex flex-col gap-8 lg:gap-10 my-4">
      {/* Progress bar - sticky */}
      <div className='flex items-center gap-2 sticky top-0 z-20 bg-white dark:bg-gray-950 py-3 -mt-4'>
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= step ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-800'
            }`}
          />
        ))}
      </div>

      {/* Header */}
      <div className='flex flex-col gap-1 lg:gap-2 mb-4 lg:mb-6'>
        <div className='flex items-center gap-3'>
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className='p-1 -ml-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 cursor-pointer'
            >
              <ArrowLeft size={22} weight="bold" />
            </button>
          )}
          <h2 className='text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white'>
            {steps[step].title}
          </h2>
        </div>
        <p className='text-sm lg:text-lg text-gray-500 dark:text-gray-400'>
          {steps[step].subtitle}
        </p>
      </div>

      {/* Step 1: Nome e Username */}
      {step === 0 && (
        <div className='flex flex-col gap-4 lg:gap-5'>
          <div className='flex flex-col gap-1.5 lg:gap-2'>
            <label className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>Nome</label>
            <Input
              type="text"
              {...register('name')}
              placeholder="Seu nome completo"
            />
            <ErrorText message={errors.name?.message} />
          </div>
        </div>
      )}

      {/* Step 2: Email */}
      {step === 1 && (
        <div className='flex flex-col gap-4 lg:gap-5'>
          <div className='flex flex-col gap-1.5 lg:gap-2'>
            <label className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>Email</label>
            <Input
              type="email"
              {...register('email')}
              placeholder="seu@email.com"
            />
            <ErrorText message={errors.email?.message} />
          </div>
        </div>
      )}

      {/* Step 3: Senha */}
      {step === 2 && (
        <div className='flex flex-col gap-4 lg:gap-5'>
          <div className='flex flex-col gap-1.5 lg:gap-2'>
            <label className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>Senha</label>
            <Input
              {...register('password')}
              placeholder="Mínimo 8 caracteres"
              password={true}
            />
            <ErrorText message={errors.password?.message} />
          </div>
          <div className='flex flex-col gap-1.5 lg:gap-2'>
            <label className='text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300'>Confirmar Senha</label>
            <Input
              {...register('confirmPassword')}
              placeholder="Confirme sua senha"
              password={true}
            />
            <ErrorText message={errors.confirmPassword?.message} />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className='flex flex-col gap-3 lg:gap-4 mt-2'>
        <button
          type="submit"
          disabled={isPending}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 lg:py-3.5 rounded-full font-semibold cursor-pointer transition-all duration-200 active:scale-[0.98] text-base lg:text-lg disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center'>
          {isPending ? <Spinner size="sm" className="border-white border-t-transparent" /> : (step < 2 ? 'Continuar' : 'Criar Conta')}
        </button>

        {step === 0 && (
          <>
            <div className='flex items-center gap-3 my-1'>
              <div className='flex-1 h-px bg-gray-200 dark:bg-gray-800' />
              <span className='text-sm lg:text-base text-gray-400 dark:text-gray-500'>ou</span>
              <div className='flex-1 h-px bg-gray-200 dark:bg-gray-800' />
            </div>

            <button
              type="button"
              onClick={() => navigateTo('/login')}
              className='w-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 lg:py-3.5 rounded-full font-semibold cursor-pointer transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 active:scale-[0.98] text-base lg:text-lg'>
              Já tenho conta
            </button>
          </>
        )}
      </div>
    </form>
  )
}

export default SignupForm;
