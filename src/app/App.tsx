import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Pages } from './Routes'

const App = () => {
  return (
    <HashRouter>
      <Pages />
    </HashRouter>
  )
}

export default App
