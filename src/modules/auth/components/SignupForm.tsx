import React, { useState } from 'react'
import axios from 'axios'
import { ArrowLeft, WarningCircle } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '../types/signUp'
import type { SignUp } from '../types/signUp'
import { useSignUp } from '../hooks/useSignUp'
import { useAutoLogin } from '../hooks/useAutoLogin'
import MercuryField from './MercuryField'
import useNavigateTo from '@/shared/hooks/useNavigateTo'

const NAME_MAX = 100

const steps = [
  { question: 'Como podemos te chamar?', hint: 'Esse nome aparece nas suas denúncias e nos seus comentários.' },
  { question: 'Qual seu email?', hint: 'É com ele que você entra. Não aparece para mais ninguém.' },
  { question: 'Crie uma senha', hint: 'No mínimo 8 caracteres.' },
]

const stepFields: (keyof SignUp)[][] = [
  ['name'],
  ['email'],
  ['password', 'confirmPassword'],
]

const LAST_STEP = steps.length - 1

const messageForError = (error: unknown): string =>
  axios.isAxiosError(error) && error.response?.status === 409
    ? 'Esse email já tem conta. Entre com ele ou cadastre outro.'
    : 'Não foi possível criar a conta agora. Tente novamente.'

const SignupForm: React.FC = () => {

  const navigateTo = useNavigateTo()
  const [step, setStep] = useState(0)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutate, isPending, isError, error } = useSignUp()
  const { mutate: autoLogin } = useAutoLogin()

  const handleNext = async () => {
    const valid = await trigger(stepFields[step])
    if (valid) setStep(step + 1)
  }

  const onSubmit = (data: SignUp) => {
    // A confirmação só existe para o zod comparar as duas senhas, o servidor não a recebe.
    const payload = { name: data.name, email: data.email, password: data.password }

    mutate(payload, {
      onSuccess: () => autoLogin({ email: payload.email, password: payload.password }),
    })
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (step < LAST_STEP) {
      handleNext()
      return
    }

    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleFormSubmit} aria-busy={isPending} noValidate>

      <div className='mb-7 flex flex-col gap-2'>
        <span aria-hidden className='flex items-center gap-1.5'>
          {steps.map((_, index) => (
            <span
              key={index}
              className={`mercury-step ${index <= step ? 'mercury-step--on' : ''}`}
            />
          ))}
        </span>

        <p role='status' className='mercury-label mb-0!'>
          Passo {step + 1} de {steps.length}
        </p>
      </div>

      <div className='mb-8 flex items-start gap-2'>
        {step > 0 && (
          <button
            type='button'
            onClick={() => setStep(step - 1)}
            aria-label='Voltar ao passo anterior'
            className='mercury-back m-0! p-1.5'
          >
            <ArrowLeft size={20} weight='bold' />
          </button>
        )}

        <div className='min-w-0'>
          <h2 className='mercury-title text-xl font-black tracking-tight'>
            {steps[step].question}
          </h2>
          <p className='mercury-sub mt-1 text-sm leading-relaxed'>
            {steps[step].hint}
          </p>
        </div>
      </div>

      {step === 0 && (
        <MercuryField
          label='Nome'
          maxLength={NAME_MAX}
          autoComplete='name'
          placeholder='Seu nome'
          error={errors.name?.message}
          {...register('name')}
        />
      )}

      {step === 1 && (
        <MercuryField
          label='Email'
          type='email'
          inputMode='email'
          autoComplete='email'
          autoCapitalize='none'
          spellCheck={false}
          placeholder='voce@email.com'
          error={errors.email?.message}
          {...register('email')}
        />
      )}

      {step === LAST_STEP && (
        <>
          <MercuryField
            label='Senha'
            password
            autoComplete='new-password'
            placeholder='Mínimo 8 caracteres'
            error={errors.password?.message}
            {...register('password')}
          />

          <MercuryField
            label='Repetir senha'
            password
            autoComplete='new-password'
            placeholder='A mesma senha'
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </>
      )}

      {isError && (
        <p role='alert' className='mercury-error flex items-center gap-2'>
          <WarningCircle size={16} weight='bold' className='shrink-0' />
          {messageForError(error)}
        </p>
      )}

      <div className='mercury-submit'>
        <button type='submit' className='mercury-button' disabled={isPending}>
          {isPending ? 'Criando…' : (step < LAST_STEP ? 'Continuar' : 'Criar conta')}
        </button>
      </div>

      {step === 0 && (
        <p className='mercury-sub mt-6 text-center text-sm'>
          Já tem conta?{' '}
          <button
            type='button'
            onClick={() => navigateTo('/login')}
            className='mercury-link'
          >
            Entrar
          </button>
        </p>
      )}
    </form>
  )
}

export default SignupForm
