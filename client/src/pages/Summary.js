import { useEffect } from 'react'
import { Card, Container, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import tl from '../assets/tl.svg'
import usd from '../assets/usd.svg'
import euro from '../assets/euro.svg'
import ll from '../assets/ll.svg'
import syr from '../assets/syr.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getTotals } from '../redux/actions/interactionActions'

const Summary = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const totals = useSelector((state) => state.totals)
  const { loading, error, total } = totals
  useEffect(() => {
    if (!userInfo) history.push('/')
    dispatch(getTotals())
    return () => {
      //
    }
  }, [history, dispatch, userInfo])
  return (
    <Container>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Card>
        <Card.Body>
          {total && (
            <ListGroup variant='flush'>
              <h6>
                <strong>الموجز</strong>
              </h6>
              <ListGroup.Item>
                {total.usdTotal > 0
                  ? 'علينا'
                  : total.usdTotal === 0
                  ? ''
                  : total.usdTotal < 0
                  ? 'لنا'
                  : ''}{' '}
                {total.usdTotal} USD{' '}
                <img src={usd} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.tlTotal > 0
                  ? 'علينا'
                  : total.tlTotal === 0
                  ? ''
                  : total.tlTotal < 0
                  ? 'لنا'
                  : ''}{' '}
                {total.tlTotal} TL{' '}
                <img src={tl} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.euroTotal > 0
                  ? 'علينا'
                  : total.euroTotal === 0
                  ? ''
                  : total.euroTotal < 0
                  ? 'لنا'
                  : ''}{' '}
                {total.euroTotal} EURO{' '}
                <img src={euro} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.syrTotal > 0
                  ? 'علينا'
                  : total.syrTotal === 0
                  ? ''
                  : total.syrTotal < 0
                  ? 'لنا'
                  : ''}{' '}
                {total.syrTotal} SYR{' '}
                <img src={syr} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.llTotal > 0
                  ? 'علينا'
                  : total.llTotal === 0
                  ? ''
                  : total.llTotal < 0
                  ? 'لنا'
                  : ''}{' '}
                {total.llTotal} LL{' '}
                <img src={ll} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Summary
