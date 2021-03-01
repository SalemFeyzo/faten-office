import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAccounts } from '../redux/actions/accountActions'

const AccountsListPage = () => {
  const dispatch = useDispatch()
  const accountsList = useSelector((state) => state.accountsList)
  const { loading, error, accounts } = accountsList
  useEffect(() => {
    dispatch(listAccounts())
    return () => {
      //
    }
  }, [dispatch])
  return (
    <Container>
      <h1>جميع الحسابات</h1>
      <span>{accounts && accounts.length}</span>
      {accounts &&
        accounts.map((account) => {
          ;<h3 key={accounts._id}>{account.name}</h3>
        })}
    </Container>
  )
}

export default AccountsListPage
