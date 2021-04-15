import { useEffect } from 'react'
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap'
import tl from '../assets/tl.svg'
import usd from '../assets/usd.svg'
import euro from '../assets/euro.svg'
import ll from '../assets/ll.svg'
import syr from '../assets/syr.svg'
import InteractionCardPublic from '../components/InteractionCardPublic'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import {
  getTotalByAccount,
  listInteractionsByAccount,
} from '../redux/actions/interactionActions'
import { getAccountDetails } from '../redux/actions/accountActions'

const AccountDetailsPage = ({ match }) => {
  const id = match.params.id

  const dispatch = useDispatch()

  const totalByAccount = useSelector((state) => state.totalByAccount)
  const { loading, error, total } = totalByAccount

  const accountDetails = useSelector((state) => state.accountDetails)
  const { account } = accountDetails

  const interactionListByAccount = useSelector(
    (state) => state.interactionListByAccount
  )
  const { interactions } = interactionListByAccount

  useEffect(() => {
    dispatch(getTotalByAccount(id))
    dispatch(getAccountDetails(id))
    dispatch(listInteractionsByAccount(id))
    return () => {
      //
    }
  }, [dispatch, id])
  return (
    <Container>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <h5>{account && account.name}</h5>
      <Card>
        <Card.Body>
          <Row>
            {total && (
              <>
                <Col>
                  <ListGroup variant='flush'>
                    <h6>
                      <strong>صافي الحساب: </strong>
                    </h6>
                    <ListGroup.Item>
                      {total.usdTotal > 0
                        ? 'لكم'
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
                        ? 'لكم'
                        : total.tlTotal === 0
                        ? ''
                        : total.tlTotal < 0
                        ? 'لنا'
                        : ''}{' '}
                      {total.tlTotal} TL{' '}
                      <img src={tl} width='20px' height='20px' alt='icon' />
                    </ListGroup.Item>
                    {total.euroTotal === 0 ? (
                      ''
                    ) : (
                      <ListGroup.Item>
                        {total.euroTotal > 0
                          ? 'لكم'
                          : total.euroTotal === 0
                          ? ''
                          : total.euroTotal < 0
                          ? 'لنا'
                          : ''}{' '}
                        {total.euroTotal} EURO{' '}
                        <img src={euro} width='20px' height='20px' alt='icon' />
                      </ListGroup.Item>
                    )}
                    {total.syrTotal === 0 ? (
                      ''
                    ) : (
                      <ListGroup.Item>
                        {total.syrTotal > 0
                          ? 'لكم'
                          : total.syrTotal === 0
                          ? ''
                          : total.syrTotal < 0
                          ? 'لنا'
                          : ''}{' '}
                        {total.syrTotal} SYR{' '}
                        <img src={syr} width='20px' height='20px' alt='icon' />
                      </ListGroup.Item>
                    )}
                    {total.llTotal === 0 ? (
                      ''
                    ) : (
                      <ListGroup.Item>
                        {total.llTotal > 0
                          ? 'لكم'
                          : total.llTotal === 0
                          ? ''
                          : total.llTotal < 0
                          ? 'لنا'
                          : ''}{' '}
                        {total.llTotal} LL{' '}
                        <img src={ll} width='20px' height='20px' alt='icon' />
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Col>
              </>
            )}
          </Row>
        </Card.Body>
      </Card>
      <h5>الحركات:</h5>
      {interactions && (
        <Row>
          {interactions.map((interaction) => (
            <Col key={interaction._id} sm={12} md={12} lg={6} xl={6}>
              <InteractionCardPublic interaction={interaction} accountId={id} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default AccountDetailsPage
