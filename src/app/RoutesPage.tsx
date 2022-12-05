import { Navigate, Route, Routes } from 'react-router-dom'
import { Error404 } from '../common/error404/Error404'
import { CheckEmail } from '../components/CheckEmail'
import { PacksList } from '../components/Packs/PacksList'
import { Login } from '../components/Login/Login'
import { Profile } from '../components/Profile'
import { RecoverPassword } from '../components/RecoverPassword'
import { Registration } from '../components/Registration/Registration'
import { SetNewPassword } from '../components/SetNewPassword'
import { CardsList } from '../components/Cards/CardsList'
import { AddNewPack } from '../components/Packs/AddNewPack'

export const RoutesPage = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={'/profile'} />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/register'} element={<Registration />} />
      <Route path={'/profile'} element={<Profile />} />
      <Route path={'/recoverPassword'} element={<RecoverPassword />} />
      <Route path={'/checkEmail/'} element={<CheckEmail />} />
      <Route path={'/checkEmail/:email'} element={<CheckEmail />} />
      <Route path={'/setNewPassword'} element={<SetNewPassword />} />
      <Route path={'/setNewPassword/:token'} element={<SetNewPassword />} />
      <Route path={'/404'} element={<Error404 />} />
      <Route path={'*'} element={<Navigate to={'404'} />} />
      <Route path={'/packsList'} element={<PacksList/>} />
      <Route path={"/addNewPack"} element={<AddNewPack/>} />
      <Route path={'/cards/:packId/:packName'} element={<CardsList/>}/>
    </Routes>
  )
}
