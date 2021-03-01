import { useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (!userInfo) history.push('/')
    return () => {
      //
    }
  }, [history, userInfo])
  return (
    <>
      <Container>
        <div className='d-flex flex-row align-items-center justify-content-between'>
          {' '}
          <h1>لوحة التحكم</h1>
          <Link to='/addInteraction'>
            {' '}
            <Button variant='success'>حركة جديدة</Button>
          </Link>
        </div>
      </Container>
    </>
  )
}

export default Dashboard
