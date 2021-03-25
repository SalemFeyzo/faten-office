import { useEffect, useState } from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/ar-tn'
import usd from '../assets/usd.svg'
import CapitalModal from './CapitalModal'
import { useDispatch, useSelector } from 'react-redux'
import { getCapital } from '../redux/actions/capitalActions'

const BoxCard = ({ totalPrimary, totalAccoounts }) => {
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
  const [show, setShow] = useState(false)

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const dispatch = useDispatch()
  const capitalGet = useSelector((state) => state.capitalGet)
  const { capital } = capitalGet
  const capitalUpdate = useSelector((state) => state.capitalUpdate)
  const { success } = capitalUpdate
  const bothTotal = addDecimal(
    Number(totalAccoounts) < 0
      ? Number(Math.abs(totalAccoounts)) + Number(totalPrimary)
      : Number(totalAccoounts) > 0
      ? Number(totalAccoounts) * -1 + Number(totalPrimary)
      : 0
  )
  useEffect(() => {
    dispatch(getCapital())
    return () => {}
  }, [dispatch, success])
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <Card className='mt-2'>
        <Card.Header>
          <h4>الصندوق</h4>
        </Card.Header>
        <Card.Body>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              الدرج: {totalPrimary} USD{' '}
              <img src={usd} width='20px' height='20px' alt='icon' />
            </ListGroup.Item>
            <ListGroup.Item>
              {totalAccoounts < 0
                ? ` ديون لنا:  ${Math.abs(totalAccoounts)}`
                : totalAccoounts > 0
                ? ` ديون علينا:  ${totalAccoounts}`
                : ''}{' '}
              USD <img src={usd} width='20px' height='20px' alt='icon' />
            </ListGroup.Item>
            <ListGroup.Item>
              الدرج والديون: {bothTotal} USD{' '}
              <img src={usd} width='20px' height='20px' alt='icon' />
            </ListGroup.Item>
            <ListGroup.Item className='d-flex flex-row align-items-center justify-content-between'>
              <span>
                رأس المال: {capital && capital.length > 0 && capital[0].amount}{' '}
                USD <img src={usd} width='20px' height='20px' alt='icon' />
              </span>
              <small>
                آخر تحديث:
                {capital &&
                  capital.length > 0 &&
                  moment(capital[0].updatedAt).locale('ar-tn').format('LLLL')}
              </small>
              <Button variant='success' onClick={handleShow}>
                تعديل
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              الربح:{' '}
              {capital &&
                capital.length > 0 &&
                addDecimal(Number(bothTotal) - Number(capital[0].amount))}{' '}
              USD <img src={usd} width='20px' height='20px' alt='icon' />
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <CapitalModal handleClose={handleClose} show={show} capital={capital} />
    </>
  )
}

export default BoxCard
