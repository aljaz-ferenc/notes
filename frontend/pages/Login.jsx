import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default function Login() {
  const [state, setState] = useState('login')

  return (
    <div>
      {state === 'login' && <LoginForm setState={setState}/>}
      {state === 'register' && <RegisterForm setState={setState}/>}
    </div>
  )
}