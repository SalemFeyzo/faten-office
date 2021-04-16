import { Card, ListGroup, Col, Row } from 'react-bootstrap'
import tl from '../assets/tl.svg'
import usd from '../assets/usd.svg'
import euro from '../assets/euro.svg'
import ll from '../assets/ll.svg'
import syr from '../assets/syr.svg'

const PrimaryTotalCard = ({ total }) => {
  return (
    <Card className='mt-2'>
      <Card.Body>
        <Row>
          <Col>
            <ListGroup variant='flush'>
              <h6>
                <strong> موجود في الدرج حسب العملة: </strong>
              </h6>
              <ListGroup.Item>
                {total.usdTotal} USD{' '}
                <img src={usd} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.tlTotal} TL{' '}
                <img src={tl} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.euroTotal} EURO{' '}
                <img src={euro} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.syrTotal} SYR{' '}
                <img src={syr} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.llTotal} LL{' '}
                <img src={ll} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        موجود في الدرج بالدولار: {total.totalPrimary} USD{' '}
        <img src={usd} width='20px' height='20px' alt='icon' />
      </Card.Footer>
    </Card>
  )
}

export default PrimaryTotalCard
