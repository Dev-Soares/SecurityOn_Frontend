import React from 'react'
import LoginForm from '@/modules/auth/components/LoginForm'
import MercuryShell from '@/shared/layouts/MercuryShell'

const LoginPage: React.FC = () => {
  return (
    <MercuryShell title='Entrar no SecurityOn'>
      <LoginForm />
    </MercuryShell>
  )
}

export default LoginPage
