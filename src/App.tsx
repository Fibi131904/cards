import React from 'react'
import { EnteringANewPassword } from './components/EnteringANewPassword'
import { Login } from './components/Login'
import { PasswordRecovery } from './components/PasswordRecovery'
import { Profile } from './components/Provile'
import { Registration } from './components/Registration'
import { Test } from './components/Test'


const App = () => {
  return (
    <div>
      <Profile />
      <Login />
      <Registration />
      <PasswordRecovery />
      <EnteringANewPassword />
      <Test />
    </div>
  )
}

export default App
