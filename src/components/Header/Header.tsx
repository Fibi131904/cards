import React from 'react'
import { Link} from 'react-router-dom'
import s from './Header.module.css'

export const Header = () => {

  return (
    <div className={s.header}>
      <nav>
        <Link to="/" className={s.item}>
          Profile
        </Link>
        <Link to="/login" className={s.item}>
          Login
        </Link>
        <Link to="/register" className={s.item}>
          Regisration
        </Link>
        <Link to="/checkEmail" className={s.item}>
          Check Email
        </Link>
        <Link to="/error" className={s.item}>
          Error
        </Link>
        <Link to="/recoverPassword" className={s.item}>
        Recover Password
        </Link>
        <Link to='/setNewPassword' className={s.item}>
        Set New Password
        </Link>
        <Link to='/packsList' className={s.item}>
        Packs List
        </Link>
      </nav>
     
    </div>
  )
}
