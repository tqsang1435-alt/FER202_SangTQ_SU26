import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Ex01_BasicCounter    from './pages/Ex01_BasicCounter'
import Ex02_CounterWithStep from './pages/Ex02_CounterWithStep'
import Ex03_TodoList        from './pages/Ex03_TodoList'
import Ex04_ShoppingCart    from './pages/Ex04_ShoppingCart'
import Ex05_FormValidation  from './pages/Ex05_FormValidation'

function Home() {
  return (
    <Container className="py-5">
      <Card className="mx-auto text-center" style={{ maxWidth: 600 }}>
        <Card.Header>
          <strong>Home</strong>
        </Card.Header>

        <Card.Body>
          <h2>Chào mừng đến trang Home</h2>
          <p className="text-muted">
            Bạn đã đăng nhập thành công.
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}


export default function App() {
  const [page, setPage] = useState('ex05')

  return (
    <Container className="py-4">
      {page === 'ex05' && (
        <Ex05_FormValidation onSuccess={() => setPage('home')} />
      )}

      {page === 'home' && <Home />}
    </Container>
  )
}