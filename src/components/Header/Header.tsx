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
        <Link to="/Test" className={s.item}>
          Test
        </Link>
        <Link to="/Error" className={s.item}>
          Error
        </Link>
        <Link to="/RecoverPassword" className={s.item}>
        RecoverPassword
        </Link>
      </nav>
     
    </div>
  )
}
