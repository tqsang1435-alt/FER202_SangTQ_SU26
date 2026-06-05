import { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';

function RegistrationForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  // Kiểm tra định dạng email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Kiểm tra mật khẩu mạnh
  // Yêu cầu: từ 6 ký tự, có hoa, thường, số, ký tự đặc biệt
  const isStrongPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const isLongEnough = password.length >= 6;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Kiểm tra username
    if (!formData.username.trim()) {
      newErrors.username = 'Username không được để trống';
    }

    // Kiểm tra email
    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email không đúng định dạng (vd: user@example.com)';
    }

    // Kiểm tra password
    if (!formData.password) {
      newErrors.password = 'Password không được để trống';
    } else if (!isStrongPassword(formData.password)) {
      newErrors.password = 'Password phải từ 6 ký tự, có chữ hoa, thường, số và ký tự đặc biệt';
    }

    // Kiểm tra confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password không được để trống';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password không khớp với password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Xóa lỗi của trường này khi người dùng nhập
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setValidated(true);
      // Gọi callback từ App.jsx để hiển thị Modal
      if (onSuccess) {
        onSuccess(formData);
      }
    }
  };

  // Xử lý nút Cancel
  const handleCancel = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setValidated(false);
  };

  return (
    <Container className="py-5" style={{ maxWidth: 500 }}>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">📝 Đăng Ký Tài Khoản</h4>
            </Card.Header>
            <Card.Body>
              <Form noValidate>
                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Nhập username..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Nhập email..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Nhập password..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                  <Form.Text className="d-block mt-2 small text-muted">
                    Password phải có ít nhất 6 ký tự, chứa chữ hoa, chữ thường, số và ký tự đặc biệt (vd: !@#$%^&*)
                  </Form.Text>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                    placeholder="Xác nhận password..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    className="flex-grow-1"
                  >
                    ✓ Register
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={handleCancel}
                    className="flex-grow-1"
                  >
                    ✕ Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationForm;
