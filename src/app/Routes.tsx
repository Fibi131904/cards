import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../components/Login'
import { PasswordRecovery } from '../components/PasswordRecovery'
import { Profile } from '../components/Provile'
import { Registration } from '../components/Registration'
import { SetNewPassword } from '../components/SetNewPassword'
import { Test } from '../components/Test'

export const Pages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={'/Test'}/>}/>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/registration'} element={<Registration />} />
      <Route path={'/profile'} element={<Profile/>}/>
      <Route path={'/passwordRecovery'} element={<PasswordRecovery />} />
      <Route path={'/setNewPassword'} element={<SetNewPassword />} />
      <Route path={'/test'} element={<Test />} />
      <Route
        path="404"
        element={<h1 style={{ textAlign: 'center' }}>PAGE NO FOUND 404</h1>}
      />
    </Routes>
  )
}


