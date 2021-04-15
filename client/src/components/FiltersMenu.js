import { useEffect, useState } from 'react'
import Select from 'react-select'
import close from '../assets/close.svg'
import { ListGroup, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAccounts } from '../redux/actions/accountActions'
import Loader from './Loader'
import Message from './Message'
import { listUsers } from '../redux/actions/userActions'

const FiltersMenu = ({
  closeSidebar,
  setAccountId,
  setStartDate,
  setEndDate,
  setUserId,
  resetFilters,
  setInteractionType,
}) => {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const dispatch = useDispatch()
  const accountsList = useSelector((state) => state.accountsList)
  const {
    loading: loadingAccounts,
    error: errorAccounts,
    accounts,
  } = accountsList
  const selectAccountOptions =
    accounts &&
    accounts.map((account) => {
      return { label: account.name, value: account._id }
    })

  const userList = useSelector((state) => state.userList)
  const { users } = userList

  useEffect(() => {
    dispatch(listAccounts())
    dispatch(listUsers())
    return () => {
      //
    }
  }, [dispatch])

  const submitDate = (e) => {
    e.preventDefault()
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <ListGroup variant='flush' id='sidebar' className='sidebar-closed '>
      <ListGroup.Item>
        <span className='d-flex flex-row align-items-center justify-content-between'>
          <h5>
            <strong>الفلاتر</strong>
          </h5>
          <img
            src={close}
            style={{ cursor: 'pointer' }}
            width='30px'
            height='30px'
            alt='icon'
            onClick={closeSidebar}
          />
        </span>
      </ListGroup.Item>

      {loadingAccounts && (
        <ListGroup.Item>
          <Loader />{' '}
        </ListGroup.Item>
      )}
      {errorAccounts && (
        <ListGroup.Item>
          <Message variant='danger'>{errorAccounts}</Message>{' '}
        </ListGroup.Item>
      )}
      <ListGroup.Item>
        <Button
          variant='secondary'
          className='btn-block'
          onClick={() => resetFilters()}
        >
          مسح جميع الفلاتر
        </Button>
      </ListGroup.Item>
      <ListGroup.Item>
        <Form.Group controlId='accountId'>
          <Form.Label>الحساب</Form.Label>

          {accounts && (
            <Select
              placeholder='اختر'
              isSearchable
              options={selectAccountOptions}
              value={selectAccountOptions.label}
              onChange={(option) => setAccountId(option.value)}
            />
          )}
        </Form.Group>
      </ListGroup.Item>
      <ListGroup.Item>
        <ListGroup variant='flush'>
          <Form onSubmit={submitDate}>
            <ListGroup.Item>
              <Form.Group controlId='start-date'>
                <Form.Label>من تاريخ</Form.Label>
                <Form.Control
                  type='date'
                  onChange={(e) => new Date(setStart(e.target.value))}
                ></Form.Control>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId='end-date'>
                <Form.Label>الى تاريخ</Form.Label>
                <Form.Control
                  type='date'
                  onChange={(e) => new Date(setEnd(e.target.value))}
                ></Form.Control>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='submit' variant='success'>
                طبق
              </Button>
            </ListGroup.Item>
          </Form>
        </ListGroup>
      </ListGroup.Item>
      <ListGroup.Item>
        <Form.Group controlId='userId'>
          <Form.Label>الموظف</Form.Label>
          <Form.Control as='select' onChange={(e) => setUserId(e.target.value)}>
            <option value='1'>اختر الموظف</option>
            {users &&
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </ListGroup.Item>
      <ListGroup.Item>
        <Form.Group controlId='input-output'>
          <Form.Label>نوع الحركة</Form.Label>
          <Form.Control
            as='select'
            onChange={(e) => setInteractionType(e.target.value)}
          >
            <option value='1'>اختر</option>
            <option value='exchange'>تصريف</option>
            <option value='outbound-transfer'>حوالة صادرة</option>
            <option value='incoming-transfer'>حوالة واردة</option>
            <option value='pay'>دفعة</option>
            <option value='debt'>دين</option>
            <option value='expense'>مصروف</option>
          </Form.Control>
        </Form.Group>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default FiltersMenu
