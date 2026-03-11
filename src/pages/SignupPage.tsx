import React from 'react'
import SignupForm from '../modules/auth/components/SignupForm'
import Waves from '../shared/components/Waves'

const SignupPage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <div className='bg-linear-to-r from-blue-700 to-blue-900 flex flex-col lg:flex-row h-full'>
        <Waves title="Criar Conta" />

        <div className='flex flex-col justify-center items-center z-10 w-full bg-gray-100 dark:bg-gray-900 rounded-t-3xl md:rounded-t-4xl lg:pl-8 lg:rounded-t-none pt-4 lg:w-[50%] self-center lg:h-screen lg:p-0 lg:shadow-2xl lg:border lg:border-gray-200 dark:lg:border-gray-700'>
          <SignupForm />
        </div>
      </div>
    </main>
  )
}

export default SignupPage

