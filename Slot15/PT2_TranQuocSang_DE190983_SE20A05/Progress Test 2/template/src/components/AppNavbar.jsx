import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import about from '../data/about'

export default function AppNavbar() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={about.logo} alt="logo" height="30" className="d-inline-block align-top me-2" />
          {about.appName}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          {user && (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/add">Add Restaurant</Nav.Link>
                <Nav.Link as={Link} to="/categories">Manage Categories</Nav.Link>
              </Nav>
              <Nav className="align-items-center">
                <Navbar.Text className="me-3">
                  <strong className="text-white me-2">{user.fullName}</strong>
                  <Badge bg="secondary">{user.role}</Badge>
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
