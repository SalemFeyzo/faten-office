import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { login } from '../queries/login'
import { userInfo } from '../userInfo'

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <FormContainer>
      <h1>تسجيل الدخول</h1>

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
            placeholder='أخل كلمة المرور هنا ...'
            value={password}
            autoComplete='on'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' className='btn-block'>
          سجل الدخول
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginPage
