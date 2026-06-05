import { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';

function LoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Kiểm tra username
    if (!formData.username.trim()) {
      newErrors.username = 'Username không được để trống';
    }

    // Kiểm tra password
    if (!formData.password) {
      newErrors.password = 'Password không được để trống';
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
      // Gọi callback từ App.jsx
      if (onSuccess) {
        onSuccess(formData);
      }
    }
  };

  // Xử lý nút Cancel
  const handleCancel = () => {
    setFormData({
      username: '',
      password: '',
    });
    setErrors({});
  };

  return (
    <Container className="py-5" style={{ maxWidth: 400 }}>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">🔓 Đăng Nhập</h4>
            </Card.Header>
            <Card.Body>
              <Form noValidate>
                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>Username / Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Nhập username hoặc email..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-4">
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
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <Button
                    variant="success"
                    onClick={handleSubmit}
                    className="flex-grow-1"
                  >
                    ✓ Login
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

export default LoginForm;
