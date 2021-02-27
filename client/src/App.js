import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Route path='/' component={LoginPage} exact />
      </main>
    </Router>
  )
}

export default App
