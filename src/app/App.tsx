import React, { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { useAppSelector, useTypedDispatch } from '../redux/redux-store'
import { authMeTC } from '../redux/app-reducer'
import { CircularProgress } from '@material-ui/core'
import { RoutesPage } from './RoutesPage'


  const App = () => {
  const dispatch = useTypedDispatch()
  const isInitialized = useAppSelector((state) => state.app.isInitialized)
  const status = useAppSelector((state) => state.app.status)

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      {status === 'loading' && (
        <div>
          <CircularProgress />
        </div>
      )}
      <HashRouter>
        <Header />      
        <RoutesPage />
      </HashRouter>
    </div>
  )
}

export default App;