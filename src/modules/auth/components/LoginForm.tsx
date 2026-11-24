import React from 'react'
import axios from 'axios'
import { WarningCircle } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { signInSchema } from '../types/signIn'
import type { SignIn } from '../types/signIn'
import { useSignIn } from '../hooks/useSignIn'
import MercuryField from './MercuryField'
import useNavigateTo from '@/shared/hooks/useNavigateTo'

// O servidor devolve 401 tanto para email desconhecido quanto para senha errada,
// de propósito: dizer qual dos dois falhou entregaria quem tem conta aqui.
const messageForError = (error: unknown): string =>
    axios.isAxiosError(error) && error.response?.status === 401
        ? 'Email ou senha não conferem. Confira os dois e tente de novo.'
        : 'Não foi possível entrar agora. Tente novamente.'

const LoginForm: React.FC = () => {

    const navigateTo = useNavigateTo()
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignIn>({
        resolver: zodResolver(signInSchema),
    })

    const { mutate, isPending, isError, error } = useSignIn()

    const onSubmit = (data: SignIn) => {
        mutate(data, {
            onSuccess: async () => {
                await queryClient.refetchQueries({ queryKey: ['me'] })
                navigateTo('/')
            },
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} aria-busy={isPending} noValidate>
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

            <MercuryField
                label='Senha'
                password
                autoComplete='current-password'
                placeholder='••••••••'
                error={errors.password?.message}
                {...register('password')}
            />

            {/* O recado da falha fica no formulário, não num toast que some antes
                de a pessoa terminar de reler o que digitou. */}
            {isError && (
                <p role='alert' className='mercury-error flex items-center gap-2'>
                    <WarningCircle size={16} weight='bold' className='shrink-0' />
                    {messageForError(error)}
                </p>
            )}

            <div className='mercury-submit'>
                <button type='submit' className='mercury-button' disabled={isPending}>
                    {isPending ? 'Entrando…' : 'Entrar'}
                </button>
            </div>

            <p className='mercury-sub mt-6 text-center text-sm'>
                Primeira vez aqui?{' '}
                <button
                    type='button'
                    onClick={() => navigateTo('/signup')}
                    className='mercury-link'
                >
                    Criar conta
                </button>
            </p>
        </form>
    )
}

export default LoginForm
