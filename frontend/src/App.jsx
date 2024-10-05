import './App.css'
import HomePage from './pages/Home'
import AppProvider from './providers/AppProvider'

const App = () => {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  )
}

export default App
