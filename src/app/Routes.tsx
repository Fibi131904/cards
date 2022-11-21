import { Navigate, Route, Routes } from "react-router-dom"
import { Error404 } from "../common/error404/Error404"
import { CheckEmail } from "../components/CheckEmail"
import { CreateNewPassword } from "../components/CreateNewPassword"
import { Login } from "../components/Login/Login"
import { Profile } from "../components/Profile"
import { RecoverPassword } from "../components/RecoverPassword"
import { Registration } from "../components/Registration/Registration"




export const Pages = () => {

  return (
      <Routes>
          <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/register'} element={<Registration/>}/>
          <Route path={'/profile'} element={<Profile/>}/>
          <Route path={'/checkEmail'} element={<CheckEmail/>}/>
          <Route path={'/recoverPassword'} element={<RecoverPassword/>}/>
          <Route path={'/createNewPassword'} element={<CreateNewPassword/>}/>
          <Route path={'/404'} element={<Error404/>}/>
          <Route path={'*'} element={<Navigate to={'404'}/>}/>
      </Routes>
  )
}
