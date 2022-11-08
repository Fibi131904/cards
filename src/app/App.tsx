import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Pages } from './Routes'

const App = () => {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  )
}

export default App
