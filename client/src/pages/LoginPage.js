import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/userActions'

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, loading, error } = userLogin
  useEffect(() => {
    if (userInfo) history.push('/dashboard')
    return () => {
      //
    }
  }, [history, userInfo])
  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <FormContainer>
      <h4>تسجيل الدخول</h4>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId='email'>
          <Form.Control
            type='text'
            placeholder='أدخل الايميل هنا ...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='password'
            placeholder='أدخل كلمة المرور هنا ...'
            value={password}
            autoComplete='on'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='success' className='btn-block'>
          سجل الدخول
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginPage
