import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppNavbar from './components/AppNavbar';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import MyModal from './components/MyModal';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';

function AppContent() {
  const { register, login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [modalType, setModalType] = useState('registration'); // 'registration' hoặc 'login'
  const navigate = useNavigate();

  // Xử lý khi form registration validation passed
  const handleRegistrationSuccess = (formData) => {
    register(formData); // Lưu vào context và localStorage
    setRegisteredUser(formData);
    setModalType('registration');
    setShowModal(true);
  };

  // Xử lý khi form login validation passed
  const handleLoginSuccess = (formData) => {
    login(formData); // Lưu vào context và localStorage
    setRegisteredUser(formData);
    setModalType('login');
    setShowModal(true);
  };

  // Xử lý khi modal confirm (chuyển về trang chủ)
  const handleModalConfirm = () => {
    setShowModal(false);
    navigate('/posts');
  };

  return (
    <>
      {/* Navbar luôn hiển thị ở mọi trang */}
      <AppNavbar />

      {/* Định nghĩa các route */}
      <Routes>
        <Route path='/register' element={<RegistrationForm onSuccess={handleRegistrationSuccess} />} />
        <Route path='/login'    element={<LoginForm onSuccess={handleLoginSuccess} />} />
        <Route path='/'          element={<Home />} />
        <Route path='/posts'     element={<PostList />} />
        <Route path='/posts/:id' element={<PostDetail />} />
        <Route path='/about'     element={<About />} />
        <Route path='*'          element={<NotFound />} />
      </Routes>

      {/* Modal thông báo */}
      <MyModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={modalType === 'registration' ? "✓ Đăng Ký Thành Công" : "✓ Đăng Nhập Thành Công"}
        message={modalType === 'registration' 
          ? `Chào mừng ${registeredUser?.username || 'bạn'}! Tài khoản của bạn đã được tạo thành công. Chúng tôi sẽ chuyển bạn tới trang chủ.`
          : `Chào mừng trở lại ${registeredUser?.username || 'bạn'}! Bạn đã đăng nhập thành công.`
        }
        onConfirm={handleModalConfirm}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;