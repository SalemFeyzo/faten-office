import { useEffect } from 'react'
import { Card, Container, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import AllAccountsTotalCard from '../components/AllAccountsTotalCard'
import PrimaryTotalCard from '../components/PrimaryTotalCard'
import BoxCard from '../components/BoxCard'
import CurrenciesCard from '../components/CurrenciesCard'
import { useDispatch, useSelector } from 'react-redux'
import { getPrimaryTotal, getTotals } from '../redux/actions/interactionActions'

const Summary = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const totals = useSelector((state) => state.totals)
  const { loading, error, total: allAccountsTotal } = totals

  const totalPrimary = useSelector((state) => state.totalPrimary)
  const { total: primaryTotal } = totalPrimary

  useEffect(() => {
    if (!userInfo) history.push('/')
    dispatch(getTotals())
    dispatch(getPrimaryTotal())

    return () => {
      //
    }
  }, [history, dispatch, userInfo])

  return (
    <Container>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <CurrenciesCard />
      {allAccountsTotal && primaryTotal && (
        <BoxCard
          totalPrimary={primaryTotal.totalPrimary}
          totalAccoounts={allAccountsTotal.totalAllAccounts}
        />
      )}
      {primaryTotal && <PrimaryTotalCard total={primaryTotal} />}
      {allAccountsTotal && <AllAccountsTotalCard total={allAccountsTotal} />}
    </Container>
  )
}

export default Summary
