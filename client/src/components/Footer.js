import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container>
      <Row className='footer'>
        <Col
          sm={12}
          md={6}
          lg={6}
          className='d-flex p-3 flex-row  justify-content-sm-center justify-content-md-center  justify-content-lg-start '
        >
          <p className='text-muted footer-text'>
            جميع الحقوق محفوظة &copy; feyzo.store
          </p>
        </Col>
        <Col
          sm={12}
          md={6}
          lg={6}
          className='d-flex p-3 flex-row justify-content-sm-center justify-content-md-center justify-content-lg-end '
        >
          <p className='text-muted footer-text'>
            المطور:
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
