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
          <Col sm={12} md={12} lg={4} xl={4}>
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
          <Col sm={12} md={12} lg={4} xl={4}>
            <ListGroup variant='flush'>
              <h6>
                <strong>مجموع المدخلات : </strong>
              </h6>
              <ListGroup.Item>
                {total.usdTotalInputs} USD{' '}
                <img src={usd} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.tlTotalInputs} TL{' '}
                <img src={tl} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.euroTotalInputs} EURO{' '}
                <img src={euro} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.syrTotalInputs} SYR{''}
                <img src={syr} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.llTotalInputs} LL{' '}
                <img src={ll} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={12} md={12} lg={4} xl={4}>
            <ListGroup variant='flush'>
              <h6>
                <strong>مجموع المخرجات : </strong>
              </h6>
              <ListGroup.Item>
                {total.usdTotalOutputs} USD{' '}
                <img src={usd} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.tlTotalOutputs} TL{' '}
                <img src={tl} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.euroTotalOutputs} EURO{' '}
                <img src={euro} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.syrTotalOutputs} SYR{' '}
                <img src={syr} width='20px' height='20px' alt='icon' />
              </ListGroup.Item>
              <ListGroup.Item>
                {total.llTotalOutputs} LL{' '}
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
