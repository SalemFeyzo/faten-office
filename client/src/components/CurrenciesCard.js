import { useEffect, useState } from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/ar-tn'
import tl from '../assets/tl.svg'
import euro from '../assets/euro.svg'
import ll from '../assets/ll.svg'
import syr from '../assets/syr.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrencies } from '../redux/actions/currenciesActions'
import CurrenciesModal from './CurrenciesModal'

const CurrenciesCard = () => {
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
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const dispatch = useDispatch()
  const currenciesGet = useSelector((state) => state.currenciesGet)
  const { currencies } = currenciesGet
  const currenciesUpdate = useSelector((state) => state.currenciesUpdate)
  const { success } = currenciesUpdate

  useEffect(() => {
    dispatch(getCurrencies())
    return () => {
      //
    }
  }, [dispatch, success])
  return (
    <>
      <Card>
        <Card.Header>
          <div className='d-flex flex-row align-items-center justify-content-between'>
            <h4> اسعار الصرف </h4>
            <Button variant='success' onClick={handleShow}>
              تعديل
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <ListGroup variant='flush'>
            <ListGroup.Item className='d-flex flex-row align-items-center justify-content-between'>
              <span>كل 1 دولار يساوي:</span>{' '}
              <small>
                {currencies &&
                  currencies.length > 0 &&
                  'آخر تحديث: ' +
                    moment(currencies[0].updatedAt)
                      .locale('ar-tn')
                      .format('LLLL')}
              </small>
            </ListGroup.Item>
            {currencies && currencies.length > 0 && (
              <>
                <ListGroup.Item>
                  {currencies[0].tlUsd} TL
                  {''}
                  <img src={tl} width='20px' height='20px' alt='icon' />
                </ListGroup.Item>
                <ListGroup.Item>
                  {currencies[0].euroUsd} EURO
                  {''}
                  <img src={euro} width='20px' height='20px' alt='icon' />
                </ListGroup.Item>
                <ListGroup.Item>
                  {currencies[0].syrUsd} SYR
                  {''}
                  <img src={syr} width='20px' height='20px' alt='icon' />
                </ListGroup.Item>
                <ListGroup.Item>
                  {currencies[0].llUsd} LL
                  {''}
                  <img src={ll} width='20px' height='20px' alt='icon' />
                </ListGroup.Item>
              </>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
      <CurrenciesModal
        handleClose={handleClose}
        show={show}
        currencies={currencies}
      />
    </>
  )
}

export default CurrenciesCard
