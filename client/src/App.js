import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import AccountsListPage from './pages/AccountsListPage'
import AddInteractionPage from './pages/AddInteractionPage'
import AddAccount from './pages/AddAccount'
import AccountDetailsPage from './pages/AccountDetailsPage'
import Summary from './pages/Summary'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Route path='/addAccount' component={AddAccount} exact />
        <Route
          path='/addInteraction/:id'
          component={AddInteractionPage}
          exact
        />
        <Route path='/accounts' component={AccountsListPage} exact />
        <Route path='/accounts/:id' component={AccountDetailsPage} exact />
        <Route path='/account/summary' component={Summary} exact />
        <Route path='/dashboard/profile/:id' component={Profile} />
        <Route path='/dashboard' component={Dashboard} exact />
        <Route path='/' component={LoginPage} exact />
      </main>
      <Footer />
    </Router>
  )
}

export default App
