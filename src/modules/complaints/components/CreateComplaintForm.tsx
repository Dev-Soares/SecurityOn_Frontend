import React from 'react'
import axios from 'axios'
import { Storefront, LinkSimple, TextAa, CaretDown } from '@phosphor-icons/react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createComplaintSchema } from '../types/createComplaint'
import type { CreateComplaint } from '../types/createComplaint'
import { useCreateComplaint } from '../hooks/useCreateComplaint'
import { showSuccess } from '@/shared/components/Toast'
import FormField, { FieldShell, fieldSurface } from '@/shared/components/FormField'
import { FormSection, FormError } from '@/shared/components/FormSection'
import Button from '@/shared/components/Button'
import Spinner from '@/shared/components/Spinner'
import { cn } from '@/shared/utils/cn'
import DangerScale from './DangerScale'
import ComplaintDraftPreview from './ComplaintDraftPreview'
import useNavigateTo from '@/shared/hooks/useNavigateTo'

const TITLE_MAX = 200
const STORE_MAX = 50
const LINK_MAX = 200
const CONTENT_MAX = 5000

// Publicar exige sessão: o 403 é o cookie expirado, e o interceptor global já
// manda para o login. O que sobra para dizer aqui é falha de envio.
const messageForError = (error: unknown): string =>
    axios.isAxiosError(error) && error.response?.status === 400
        ? 'Confira os campos: o servidor recusou algo no formulário.'
        : 'Não foi possível publicar agora. Seu texto continua aqui, tente de novo.'

interface CreateComplaintFormProps {
    // Chamado depois de publicar: quem abriu o painel decide o que fazer com ele.
    onPublished?: () => void
}

const CreateComplaintForm: React.FC<CreateComplaintFormProps> = ({ onPublished }) => {

    const navigateTo = useNavigateTo()

    const { mutate, isPending, isError, error } = useCreateComplaint()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateComplaint>({
        resolver: zodResolver(createComplaintSchema),
        defaultValues: { title: '', store: '', content: '', link: '' },
    })

    // useWatch em vez de watch(): a prévia e os contadores redesenham a cada tecla,
    // e é a assinatura que o React Compiler consegue memoizar.
    const [title, store, content, link, danger] = useWatch({
        control,
        name: ['title', 'store', 'content', 'link', 'danger'],
    })

    const draft = {
        title: title ?? '',
        store: store ?? '',
        content: content ?? '',
        link: link ?? '',
        danger,
    }

    const onSubmit = (data: CreateComplaint) => {
        mutate(data, {
            onSuccess: () => {
                onPublished?.()
                // Publicou, vê a lista: é lá que a denúncia nova aparece.
                navigateTo('/complaint')
                showSuccess('Denúncia publicada')
            },
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            aria-busy={isPending}
            noValidate
            className='flex min-h-0 flex-1 flex-col'
        >
            <div className='scrollbar-slim flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 py-6 sm:px-6'>

                <FormSection title='Quem você está denunciando'>
                    <FormField
                        id='store'
                        label='Loja ou empresa'
                        optional
                        icon={Storefront}
                        placeholder='Nome da loja, do perfil ou de quem cobrou'
                        autoComplete='off'
                        maxLength={STORE_MAX}
                        count={{ value: draft.store.length, max: STORE_MAX }}
                        error={errors.store?.message}
                        {...register('store')}
                    />

                    <FormField
                        id='link'
                        label='Endereço do site'
                        optional
                        icon={LinkSimple}
                        hint='Quem verificar esse site vai ver sua denúncia.'
                        placeholder='loja-exemplo.com.br/produto'
                        inputMode='url'
                        autoComplete='off'
                        autoCapitalize='none'
                        spellCheck={false}
                        maxLength={LINK_MAX}
                        count={{ value: draft.link.length, max: LINK_MAX }}
                        error={errors.link?.message}
                        {...register('link')}
                    />
                </FormSection>

                <FormSection divided title='O que aconteceu'>
                    <FormField
                        id='title'
                        label='Resumo'
                        icon={TextAa}
                        placeholder='Paguei por Pix e o produto nunca chegou'
                        autoComplete='off'
                        maxLength={TITLE_MAX}
                        count={{ value: draft.title.length, max: TITLE_MAX }}
                        error={errors.title?.message}
                        {...register('title')}
                    />

                    <FieldShell
                        id='content'
                        label='Relato'
                        hintAbove
                        hint='Como chegaram em você, o que pediram e o que você perdeu. Sem dados pessoais.'
                        error={errors.content?.message}
                        count={{ value: draft.content.length, max: CONTENT_MAX }}
                    >
                        <textarea
                            id='content'
                            rows={8}
                            maxLength={CONTENT_MAX}
                            placeholder='Vi o anúncio no Instagram, me chamaram no WhatsApp e pediram…'
                            aria-invalid={errors.content ? true : undefined}
                            aria-describedby={errors.content ? 'content-error' : 'content-hint'}
                            className={cn(fieldSurface, 'min-h-44 resize-y leading-relaxed scrollbar-slim')}
                            {...register('content')}
                        />
                    </FieldShell>
                </FormSection>

                {/* O título da seção é o rótulo do grupo de radios: um "Nível de perigo"
                    em cima e outro em volta da escala seria a mesma palavra duas vezes
                    para um controle só. */}
                <section className='flex flex-col gap-4 border-t border-border pt-6'>
                    <div className='flex flex-col gap-0.5'>
                        <h2 id='danger-label' className='text-base font-bold text-primary'>
                            Nível de perigo
                        </h2>
                        <p id='danger-hint' className='text-sm text-muted-foreground'>
                            Pelo risco de quem cair, não pelo tamanho do seu prejuízo.
                        </p>
                    </div>

                    <DangerScale
                        registration={register('danger')}
                        labelledBy='danger-label'
                        describedBy={errors.danger ? 'danger-error' : 'danger-hint'}
                        invalid={Boolean(errors.danger)}
                    />

                    {errors.danger && (
                        <p id='danger-error' role='alert' className='text-xs font-semibold text-destructive'>
                            {errors.danger.message}
                        </p>
                    )}
                </section>

                {/* O painel não tem largura para uma coluna lateral: a prévia abre
                    quando a pessoa quer conferir, sem empurrar o resto para baixo. */}
                <details className='group rounded-lg border border-border bg-muted/40 p-4'>
                    <summary className='flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-foreground [&::-webkit-details-marker]:hidden'>
                        Ver como vai aparecer
                        <CaretDown
                            size={16}
                            weight='bold'
                            aria-hidden
                            className='shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180'
                        />
                    </summary>

                    <div className='mt-4'>
                        <ComplaintDraftPreview draft={draft} />
                    </div>
                </details>

            </div>

            {/* Rodapé fora da área de rolagem: o formulário é longo e a ação
                principal não pode depender de rolar até o fim para aparecer. */}
            <div className='flex flex-col gap-3 border-t border-border bg-background px-5 py-4 sm:px-6'>
                <FormError message={isError ? messageForError(error) : null} />

                <Button type='submit' size='lg' disabled={isPending}>
                    {isPending
                        ? <Spinner size='sm' className='border-white/40 border-t-white' />
                        : 'Publicar denúncia'}
                </Button>

                <p className='text-center text-xs text-muted-foreground'>
                    Publicada no feed e no seu perfil, com seu nome.
                </p>
            </div>
        </form>
    )
}

export default CreateComplaintForm
