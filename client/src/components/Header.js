import { useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import profile from '../profile.svg'
import logo from '../logo.svg'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/userActions'
const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const logOutHandler = () => {
    dispatch(logout())
    history.push('/')
  }
  const icon = (
    <>
      {userInfo ? (
        <>
          <span>{userInfo.name}</span>
          <img src={profile} width='30px' height='30px' alt='icon' />
        </>
      ) : (
        ''
      )}
    </>
  )
  return (
    <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <img
              src={logo}
              width='40px'
              height='40px'
              alt='logo'
              className='mr-1'
            />
            <span className='logoText'>فيزو للصرافة والحوالات</span>
          </Navbar.Brand>
        </LinkContainer>
        {userInfo && (
          <>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                <LinkContainer to='/adcurrencyrate'>
                  <Nav.Link>تعديل سعر السوري</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/account/summary'>
                  <Nav.Link>الموجز</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/dashboard'>
                  <Nav.Link>جميع الحركات</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/accounts'>
                  <Nav.Link>الحسابات</Nav.Link>
                </LinkContainer>

                <NavDropdown title={icon} id='username'>
                  <LinkContainer to={`/dashboard/profile/${userInfo._id}`}>
                    <NavDropdown.Item>الملف الشخصي</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item
                    className='text-danger'
                    onClick={logOutHandler}
                  >
                    تسجيل الخروج
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  )
}

export default Header
