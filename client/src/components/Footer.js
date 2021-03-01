import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container>
      <Row>
        <Col className='footer py-3'>
          <p>جميع الحقوق محفوظة &copy; </p>
          <p>
            المصمم والمبرمج
            <a
              href='https://twitter.com/salem_feyzo'
              target='_blank'
              rel='noreferrer'
            >
              {' '}
              سالم فيزو{' '}
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
