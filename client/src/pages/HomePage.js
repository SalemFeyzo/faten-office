import { useEffect } from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/ar-tn'
import del from '../assets/delete.svg'
import tl from '../assets/tl.svg'
import usd from '../assets/usd.svg'
import syr from '../assets/syr.svg'
import edit from '../assets/edit.svg'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrencyRate,
  getCurrencyRateFinans,
} from '../redux/actions/currencyRateActions'

const HomePage = () => {
  moment.updateLocale('ar-tn', {
    months: [
      'كانون الثاني',
      'شباط',
      ' آذار',
      'نيسان',
      'حزيران',
      ' تموز',
      ' آب',
      ' أيلول',
      ' تشرين الأول',
      ' تشرين الثاني',
      ' كانون الأول',
    ],
  })
  const dispatch = useDispatch()

  const currencyRateAdd = useSelector((state) => state.currencyRateAdd)
  const { success } = currencyRateAdd

  const currencyRateDelete = useSelector((state) => state.currencyRateDelete)
  const { success: successDelete } = currencyRateDelete

  const currencyRateGet = useSelector((state) => state.currencyRateGet)
  const { loading, error, currencyRate } = currencyRateGet

  const currencyRateFinansGet = useSelector(
    (state) => state.currencyRateFinansGet
  )
  const {
    loading: loadingFinans,
    error: errorFinans,
    currencyRateFinans,
  } = currencyRateFinansGet

  useEffect(() => {
    dispatch(getCurrencyRate())
    dispatch(getCurrencyRateFinans())
    return () => {
      //
    }
  }, [dispatch, success, successDelete])
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const noDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(0)
  }
  const selling =
    currencyRateFinans && currencyRateFinans.USD.Selling.split(',').join('.')
  const buying =
    currencyRateFinans && currencyRateFinans.USD.Buying.split(',').join('.')
  console.log(selling)
  return (
    <FormContainer>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}

      <Card>
        <Card.Body>
          <h5>
            <b>سعر الدولار مقابل الليرة التركية:</b>{' '}
            <img src={usd} width='20px' height='20px' alt='icon' />{' '}
            <img src={tl} width='20px' height='20px' alt='icon' />
          </h5>

          {currencyRateFinans && (
            <ListGroup variant='flush'>
              <ListGroup.Item>
                مبيع: {addDecimal(Number(selling))}
              </ListGroup.Item>
              <ListGroup.Item>
                شراء: {addDecimal(Number(buying) - 0.1)}
              </ListGroup.Item>
              <ListGroup.Item>
                <small>
                  {moment(currencyRateFinans.Update_Date)
                    .locale('ar-tn')
                    .format('LLLL')}
                </small>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Card.Body>
      </Card>

      <Card className='mt-2'>
        <Card.Body>
          <h5>
            <b>سعر الدولار مقابل الليرة السورية:</b>{' '}
            <img src={usd} width='20px' height='20px' alt='icon' />{' '}
            <img src={syr} width='20px' height='20px' alt='icon' />{' '}
          </h5>

          {currencyRate && currencyRateFinans && (
            <ListGroup variant='flush'>
              <ListGroup.Item>مبيع: {currencyRate[0].sell}</ListGroup.Item>
              <ListGroup.Item>شراء: {currencyRate[0].buy}</ListGroup.Item>
              <ListGroup.Item>
                <small>
                  {moment(currencyRate[0].createdAt)
                    .locale('ar-tn')
                    .format('LLLL')}
                </small>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Card.Body>
      </Card>

      <Card className='mt-2'>
        <Card.Body>
          <h5>
            <b>سعر الليرة التركية مقابل الليرة السورية:</b>{' '}
            <img src={tl} width='20px' height='20px' alt='icon' />{' '}
            <img src={syr} width='20px' height='20px' alt='icon' />{' '}
          </h5>

          {currencyRate && (
            <ListGroup variant='flush'>
              <ListGroup.Item>
                مبيع: {noDecimal(currencyRate[0].sell / Number(selling) + 5)}
              </ListGroup.Item>
              <ListGroup.Item>
                شراء: {noDecimal(currencyRate[0].buy / Number(buying) - 1)}
              </ListGroup.Item>

              <ListGroup.Item>
                <small>
                  {moment(currencyRate[0].createdAt)
                    .locale('ar-tn')
                    .format('LLLL')}
                </small>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </FormContainer>
  )
}

export default HomePage
