import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col } from 'react-bootstrap'
import AccountCard from '../components/AccountCard'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listAccounts } from '../redux/actions/accountActions'
import Message from '../components/Message'

const AccountsListPage = ({ history }) => {
  const dispatch = useDispatch()
  const accountsList = useSelector((state) => state.accountsList)
  const { loading, error, accounts } = accountsList

  const accountAdd = useSelector((state) => state.accountAdd)
  const { success } = accountAdd

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) history.push('/')
    dispatch(listAccounts())
    return () => {
      //
    }
  }, [dispatch, success])
  return (
    <Container>
      <div className='d-flex flex-row align-items-center justify-content-between'>
        <h4>جميع الحسابات</h4>
        <span>عدد الحسابات: {accounts && accounts.length}</span>
        <Link to='/addaccount'>
          <Button variant='success'>حساب جديدة</Button>
        </Link>
      </div>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Row>
        {accounts &&
          accounts.map((account) => (
            <Col key={account._id} sm={12} md={12} lg={6} xl={6}>
              <AccountCard account={account} />
            </Col>
          ))}
      </Row>
    </Container>
  )
}

export default AccountsListPage
