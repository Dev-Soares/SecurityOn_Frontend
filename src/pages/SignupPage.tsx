import React from 'react'
import SignupForm from '@/modules/auth/components/SignupForm'
import MercuryShell from '@/shared/layouts/MercuryShell'

const SignupPage: React.FC = () => {
  return (
    <MercuryShell title='Criar conta no SecurityOn'>
      <SignupForm />
    </MercuryShell>
  )
}

export default SignupPage
