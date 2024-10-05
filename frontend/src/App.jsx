import { useState } from 'react'
import './App.css'
import HomePage from './pages/Home'
import AppProvider from './providers/AppProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  )
}

export default App
