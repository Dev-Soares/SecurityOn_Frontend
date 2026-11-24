import React from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import useNavigateTo from '../hooks/useNavigateTo'
import { useTheme } from '../contexts/themeContext'
import WaveBackdrop from '../components/WaveBackdrop'
import LogoIcon from '../components/LogoIcon'

interface MercuryShellProps {
  children: React.ReactNode
  // Título lido por leitor de tela: no visual só aparece a marca.
  title: string
}

// Casca de entrar e criar conta. Acompanha o tema escolhido: as cores moram em
// variáveis no .mercury-screen e trocam sob .dark (ver assets/index.css).
const MercuryShell: React.FC<MercuryShellProps> = ({ children, title }) => {

  const navigateTo = useNavigateTo()
  const { theme } = useTheme()

  return (
    <div className='mercury-screen'>
      <WaveBackdrop />

      <button type='button' className='mercury-back' onClick={() => navigateTo('/')}>
        <ArrowLeft size={18} weight='bold' />
        Voltar
      </button>

      <main className='mercury-card'>
        <header className='mercury-header flex items-center gap-2'>
          <h1 className='sr-only'>{title}</h1>

          {/* Azul sobre o fundo claro, branca sobre o fundo noite: a arte é
              a mesma, o que muda é contra o que ela é lida. */}
          <LogoIcon
            color={theme === 'dark' ? 'white' : undefined}
            size={104}
            alt=''
            className='-ml-2 shrink-0'
          />

          <span className='mercury-wordmark text-3xl font-black tracking-tight sm:text-4xl'>
            SecurityOn
          </span>
        </header>

        {children}
      </main>
    </div>
  )
}

export default MercuryShell
