import { useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
const Header = () => {
  const history = useHistory()
  const logOutHandler = () => {
    history.push('/login')
  }
  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>فيزو للصرافة والحوالات</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <NavDropdown title='hhhh' id='username'>
              <LinkContainer to={`/profile/`}>
                <NavDropdown.Item>الملف الشخصي</NavDropdown.Item>
              </LinkContainer>

              <NavDropdown.Item className='text-danger' onClick={logOutHandler}>
                تسجيل الخروج
              </NavDropdown.Item>
            </NavDropdown>

            <LinkContainer to='/login'>
              <Nav.Link>تسجيل الدخول</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/register'>
              <Nav.Link className='btn btn-warning text-danger'>
                <strong>أنشأ حساب</strong>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
