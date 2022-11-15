import { Navigate, Route, Routes } from "react-router-dom"
import { Error404 } from "../common/error404/Error404"
import { CheckEmail } from "../components/CheckEmail"
import { Login } from "../components/Login/Login"
import { Profile } from "../components/Profile"
import { Registration } from "../components/Registration"
import { Test } from "../components/Test"



export const Pages = () => {

  return (
      <Routes>
          <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/register'} element={<Registration/>}/>
          <Route path={'/profile'} element={<Profile/>}/>
          <Route path={'/check-email'} element={<CheckEmail/>}/>
          <Route path={'/test'} element={<Test/>}/>
          <Route path={'/404'} element={<Error404/>}/>
          <Route path={'*'} element={<Navigate to={'404'}/>}/>
      </Routes>
  )
}
