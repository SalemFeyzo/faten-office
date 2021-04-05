import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
import HomePage from './pages/HomePage'
import ADCurrRatePage from './pages/ADCurrRatePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Switch>
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
          <Route path='/adcurrencyrate' component={ADCurrRatePage} />

          {/*search and pagination  */}

          <Route
            path='/dashboard/search/:keyword'
            component={Dashboard}
            exact
          />
          <Route
            path='/dashboard/search/:keyword/page/:pageNumber'
            component={Dashboard}
            exact
          />
          <Route
            path='/dashboard/page/:pageNumber'
            component={Dashboard}
            exact
          />
          <Route path='/dashboard' component={Dashboard} exact />
          <Route path='/login' component={LoginPage} exact />
          <Route path='/' component={HomePage} exact />
          <Route path='*' component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App
