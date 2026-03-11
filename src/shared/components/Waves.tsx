import React from 'react'
import { CaretLeftIcon } from "@phosphor-icons/react"
import { useNavigate } from 'react-router-dom'
import LogoIcon from './LogoIcon'

interface WavesProps {
  title: string
}

const Waves: React.FC<WavesProps> = ({ title }) => {
  const navigate = useNavigate()

  return (
    <div className='lg:h-screen lg:w-[50%] w-full p-1 flex flex-col relative overflow-hidden'>
      {/* Waves animadas no bottom */}
      <svg
        className="absolute -bottom-1 left-0 w-[calc(100%+2px)] -ml-px hidden lg:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: '50%' }}
      >
        <path fill="rgba(255,255,255,0.04)">
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,128C672,117,768,139,864,165.3C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
            "
          />
        </path>
        <path fill="rgba(255,255,255,0.06)">
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,256C672,245,768,203,864,181.3C960,160,1056,160,1152,176C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
            "
          />
        </path>
        <path fill="rgba(255,255,255,0.08)">
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,288L48,272C96,256,192,224,288,224C384,224,480,256,576,261.3C672,267,768,245,864,240C960,235,1056,245,1152,250.7C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,256L48,261.3C96,267,192,277,288,272C384,267,480,245,576,234.7C672,224,768,224,864,234.7C960,245,1056,267,1152,272C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,288L48,272C96,256,192,224,288,224C384,224,480,256,576,261.3C672,267,768,245,864,240C960,235,1056,245,1152,250.7C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
            "
          />
        </path>
      </svg>

      {/* Botão voltar - mobile */}
      <button
        onClick={() => navigate('/')}
        className='flex flex-row text-white justify-start items-center m-1 my-4 cursor-pointer z-50 w-fit lg:hidden hover:opacity-80 transition-opacity'
      >
        <CaretLeftIcon size={40} weight="bold" className="text-white cursor-pointer" />
        <p className='text-xl lg:text-2xl font-medium'>Voltar</p>
      </button>

      <div className='flex flex-col lg:justify-center lg:items-center gap-2 relative z-10 lg:h-full'>
        {/* Logo mobile */}
        <div className='w-full h-auto text-white flex flex-row items-center justify-center my-3 lg:hidden'>
          <LogoIcon color='light' size={80} />
          <h2 className='font-semibold text-3xl'>SecurityOn</h2>
        </div>

        {/* Logo desktop */}
        <div className='w-full h-auto text-white hidden lg:flex flex-row items-center justify-center'>
          <LogoIcon color='light' size={140} />
          <h2 className='font-semibold text-4xl text-white'>SecurityOn</h2>
        </div>

        {/* Título mobile */}
        <div className='w-full h-auto text-white flex flex-row items-center justify-center lg:hidden my-4 mb-8'>
          <h1 className='text-4xl font-bold text-white z-10 flex justify-center items-center m-8 w-[70%]'>
            {title}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Waves
