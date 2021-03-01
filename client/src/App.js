import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import AccountsListPage from './pages/AccountsListPage'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Route path='/accounts' component={AccountsListPage} />
        <Route path='/dashboard/profile/:id' component={Profile} />
        <Route path='/dashboard' component={Dashboard} exact />
        <Route path='/' component={LoginPage} exact />
      </main>
      <Footer />
    </Router>
  )
}

export default App
