import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AppNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="md" sticky="top">
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand as={NavLink} to='/'>
          📝 React Blog
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className='ms-auto'>
            {/* as={NavLink} → tự thêm class 'active' khi URL khớp */}
            <Nav.Link as={NavLink} to='/'      end>🏠 Trang chủ</Nav.Link>
            <Nav.Link as={NavLink} to='/posts'    >📚 Bài viết</Nav.Link>
            <Nav.Link as={NavLink} to='/about'    >ℹ️ Giới thiệu</Nav.Link>
            
            {/* Hiển thị nếu đã đăng nhập */}
            {isAuthenticated ? (
              <>
                <Nav.Link disabled className='ms-2 ms-md-3 me-2'>
                  <Badge bg='light' text='dark'>
                    👤 {user?.username}
                  </Badge>
                </Nav.Link>
                <Button
                  variant='outline-light'
                  size='sm'
                  onClick={handleLogout}
                  className='ms-2'
                >
                  🚪 Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to='/login'    >🔓 Đăng Nhập</Nav.Link>
                <Nav.Link as={NavLink} to='/register' >📝 Đăng Ký</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;