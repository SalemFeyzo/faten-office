import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import AccountCard from '../components/AccountCard'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listAccounts } from '../redux/actions/accountActions'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

const AccountsListPage = ({ history }) => {
  const [accountId, setAccountId] = useState('')
  const dispatch = useDispatch()
  const accountsList = useSelector((state) => state.accountsList)
  const { loading, error, accounts } = accountsList
  const accountsOptions =
    accounts &&
    accounts.map((account) => {
      return { label: account.name, value: account._id }
    })
  console.log(accountId)
  const slectedAccount =
    accountId &&
    accounts &&
    accounts.filter((account) => account._id === accountId)
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

        <Link to='/addaccount'>
          <Button variant='success'>حساب جديدة</Button>
        </Link>
      </div>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Row className='mt-2'>
        <Col>
          <FormContainer>
            {accounts && (
              <>
                <span>عدد الحسابات: {accounts.length}</span>
                <Select
                  isSearchable
                  placeholder='ابحث عن حساب'
                  value={accountsOptions.label}
                  options={accountsOptions}
                  onChange={(option) => setAccountId(option.value)}
                />
              </>
            )}
          </FormContainer>
        </Col>
      </Row>
      <Row>
        {accountId
          ? slectedAccount.map((account) => (
              <Col key={account._id} sm={12} md={12} lg={6} xl={6}>
                <AccountCard account={account} />
              </Col>
            ))
          : accounts
          ? accounts.map((account) => (
              <Col key={account._id} sm={12} md={12} lg={6} xl={6}>
                <AccountCard account={account} />
              </Col>
            ))
          : ''}
      </Row>
    </Container>
  )
}

export default AccountsListPage
