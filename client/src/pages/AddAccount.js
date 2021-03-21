import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { addAccount } from '../redux/actions/accountActions'
import { ACCOUNTS_RESET } from '../redux/constants/accountConstants'

const AddAccount = ({ history }) => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) history.push('/')
    return () => {
      //
    }
  }, [dispatch, userInfo, history])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addAccount({ name }))
    dispatch({ type: ACCOUNTS_RESET })
    history.push('/accounts')
  }
  return (
    <FormContainer>
      <h4>حساب جديد</h4>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='account'>
          <Form.Label>اسم الحساب</Form.Label>
          <Form.Control
            type='text'
            value={name}
            placeholder='أدخل إسم الحساب الجديد...'
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='success' className='btn-block'>
          أنشأ حساب جديد
        </Button>
      </Form>
    </FormContainer>
  )
}

export default AddAccount
