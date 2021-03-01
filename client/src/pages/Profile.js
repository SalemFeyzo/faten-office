import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../redux/actions/userActions'
import { USER_DETAILS_RESET } from '../redux/constants/userConstants'

const Profile = ({ history, match }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userId = match.params.id

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { user, success: successDetails, loding: loadingDetails } = userDetails

  useEffect(() => {
    if (!userInfo) history.push('/')
    if (!successDetails) dispatch(getUserDetails(userId))
    if (successDetails) {
      setName(user.name)
      setEmail(user.email)
    }

    return () => {
      //
    }
  }, [history, userInfo, user, dispatch, userId, successDetails])
  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (window.confirm('هل أنت متأكد ؟')) {
      if (password !== confirmPassword) {
        setMessage('كلمات المرور غير متطابقة')
      } else {
        // dispatch updateUserProfile
        dispatch(updateUser({ _id: userId, name, email, password }))
        dispatch({ type: USER_DETAILS_RESET })
        history.push('/dashboard')
      }
    }
  }
  return (
    <FormContainer>
      <h1>تعديل الملف الشخصي</h1>
      {loadingDetails && <Loader />}
      {message && <Message variant='danger'>{message}</Message>}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>الاسم</Form.Label>
          <Form.Control
            type='text'
            placeholder='أدخل الاسم هنا ...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>الايميل</Form.Label>
          <Form.Control
            type='text'
            placeholder='أدخل الايميل هنا ...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>كلمة المرور الجديدة</Form.Label>
          <Form.Control
            type='password'
            placeholder='أدخل كلمة المرور هنا ...'
            value={password}
            autoComplete='on'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>تأكيد كلمة المرور</Form.Label>
          <Form.Control
            type='password'
            placeholder='أعد إدخال كلمة المرور هنا ...'
            value={confirmPassword}
            autoComplete='on'
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='success' className='btn-block'>
          حفظ
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Profile
