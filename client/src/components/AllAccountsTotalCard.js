import { Card, ListGroup, Col, Row } from 'react-bootstrap'
import tl from '../assets/tl.svg'
import usd from '../assets/usd.svg'
import euro from '../assets/euro.svg'
import ll from '../assets/ll.svg'
import syr from '../assets/syr.svg'

const AllAccountsTotalCard = ({ total }) => {
  return (
    <Card className='mt-2'>
      <Card.Body>
        <Row>
          <Col>
            <ListGroup variant='flush'>
              <h6>
                <strong>صافي الحسابات حسب العملة: </strong>
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
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        صافي جميع الحسابات بالدولار:{' '}
        {total.totalAllAccounts < 0 ? 'لنا' : 'علينا'}{' '}
        {total.totalAllAccounts < 0
          ? Math.abs(total.totalAllAccounts)
          : total.totalAllAccounts}{' '}
        USD <img src={usd} width='20px' height='20px' alt='icon' />
      </Card.Footer>
    </Card>
  )
}

export default AllAccountsTotalCard
