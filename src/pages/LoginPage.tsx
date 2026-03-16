import React from 'react'
import LoginForm from '../modules/auth/components/LoginForm'
import Waves from '../shared/components/Waves'

const LoginPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className='bg-linear-to-r from-blue-700 to-blue-900 flex flex-col lg:flex-row h-full'>
        <Waves title="Fazer Login" />

        <div className='flex flex-col justify-center items-center z-10 w-full bg-white dark:bg-gray-950 rounded-t-3xl md:rounded-t-4xl lg:rounded-t-none lg:w-[50%] self-center lg:h-screen'>
          <div className='flex-1 flex flex-col justify-center items-center w-full py-12 lg:py-0'>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
