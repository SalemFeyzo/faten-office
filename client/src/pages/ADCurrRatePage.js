import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Container,
  Form,
  ListGroup,
  Row,
  Col,
} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCurrencyRate,
  deleteCurrencyRate,
  getCurrencyRate,
} from '../redux/actions/currencyRateActions'

const ADCurrRatePage = ({ history }) => {
  const [sell, setSell] = useState('')
  const [buy, setBuy] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const currencyRateAdd = useSelector((state) => state.currencyRateAdd)
  const { loading, error, success } = currencyRateAdd

  const currencyRateGet = useSelector((state) => state.currencyRateGet)
  const {
    loading: loadingGet,
    error: errorGet,
    success: successGet,
    currencyRate,
  } = currencyRateGet
  const currencyRateDelete = useSelector((state) => state.currencyRateDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = currencyRateDelete

  useEffect(() => {
    if (!userInfo) history.push('/')
    if (!successGet) dispatch(getCurrencyRate())
    if (success || successDelete) {
      setMessage(null)
      dispatch(getCurrencyRate())
    }

    return () => {
      //
    }
    // eslint-disable-next-line
  }, [history, dispatch, userInfo, success, successDelete])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (!sell || !buy) {
      setMessage('الحقول يجب ان لا تكون فارغة')
    } else {
      dispatch(addCurrencyRate({ sell, buy }))
    }
  }
  return (
    <Container>
      <Row>
        <FormContainer>
          <h6>الدولار مقابل الليرة السورية</h6>
          {message && <Message variant='danger'>{message}</Message>}
          {loading && <Loader />}
          {error && <Message variant='danger'>{error}</Message>}
          <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId='sell'>
              <Form.Label>مبيع</Form.Label>
              <Form.Control
                type='number'
                value={sell}
                onChange={(e) => setSell(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='buy'>
              <Form.Label>شراء</Form.Label>
              <Form.Control
                type='number'
                value={buy}
                onChange={(e) => setBuy(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='success' className='btn btn-block'>
              حفظ
            </Button>
          </Form>
        </FormContainer>
      </Row>

      <Row className='mt-2'>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingGet && <Loader />}
        {errorGet && <Message variant='danger'>{errorGet}</Message>}
        {successGet &&
          currencyRate.map((curr) => (
            <Col key={curr._id} sm={12} md={12} lg={6} xl={6} className='mt-2'>
              <Card>
                <Card.Body>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>مبيع: {curr.sell}</ListGroup.Item>
                    <ListGroup.Item>شراء: {curr.buy}</ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        variant='danger'
                        onClick={() => dispatch(deleteCurrencyRate(curr._id))}
                      >
                        حذف
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  )
}

export default ADCurrRatePage
