import React from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import useNavigateTo from '../hooks/useNavigateTo'
import LogoIcon from '../components/LogoIcon'

interface FormShellProps {
  children: React.ReactNode
  // Para onde o "Voltar" leva: a denúncia vem da listagem de denúncias.
  backTo?: string
}

// Moldura das páginas que são só um formulário dentro do produto. Entrar e criar
// conta não usam esta: aquelas são a marca e moram no MercuryShell.
const FormShell: React.FC<FormShellProps> = ({ children, backTo = '/' }) => {

  const navigateTo = useNavigateTo()

  return (
    <div className='flex min-h-dvh flex-col bg-background'>

      <header className='sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-sm'>
        <div className='mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-4 sm:px-6'>

          <button
            type='button'
            onClick={() => navigateTo(backTo)}
            className='-ml-2 flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
          >
            <ArrowLeft size={18} weight='bold' />
            Voltar
          </button>

          <span className='flex items-center gap-1.5'>
            <LogoIcon size={26} />
            <span className='text-sm font-black tracking-tight text-primary'>SecurityOn</span>
          </span>
        </div>
      </header>

      {children}
    </div>
  )
}

export default FormShell
