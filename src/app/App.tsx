import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Pages } from './Routes'
import { Header } from '../components/Header/Header'



const App = () => {
  return (
    <HashRouter>
      <Header/>
      <Pages />
    </HashRouter>
  )
}

export default App