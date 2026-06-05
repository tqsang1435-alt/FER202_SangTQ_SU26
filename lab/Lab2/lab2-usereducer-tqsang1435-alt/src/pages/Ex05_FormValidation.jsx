/**
 * Bài 5 – Form Validation (useReducer)
 * ======================================
 */
import { useEffect, useReducer } from 'react'
import { Card, Form, Button, Alert, Modal } from 'react-bootstrap'

const initialState = {
  values: {
    name: '',
    email: '',
    password: '',
    confirm: '',
  },
  errors: {},
  touched: {},
  submitted: false,
  showSuccessModal: false,
}

function validate(values) {
  const errors = {}

  const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/

  if (!values.name.trim()) {
    errors.name = 'Họ tên không được để trống'
  } else if (values.name.trim().length < 3) {
    errors.name = 'Họ tên phải có ít nhất 3 ký tự'
  } else if (!nameRegex.test(values.name.trim())) {
    errors.name = 'Họ tên không được chứa số hoặc ký tự đặc biệt'
  }

  if (!values.email.trim()) {
    errors.email = 'Email không được để trống'
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = 'Email không đúng định dạng'
  }

  if (!values.password) {
    errors.password = 'Mật khẩu không được để trống'
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      'Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
  }

  if (values.confirm !== values.password) {
    errors.confirm = 'Mật khẩu xác nhận không khớp'
  }

  return errors
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const { field, value } = action.payload

      const newValues = {
        ...state.values,
        [field]: value,
      }

      return {
        ...state,
        values: newValues,
        touched: {
          ...state.touched,
          [field]: true,
        },
        errors: validate(newValues),
        submitted: false,
        showSuccessModal: false,
      }
    }

    case 'SUBMIT': {
      const errors = validate(state.values)
      const isValid = Object.keys(errors).length === 0

      return {
        ...state,
        errors,
        touched: {
          name: true,
          email: true,
          password: true,
          confirm: true,
        },
        submitted: isValid,
        showSuccessModal: isValid,
      }
    }

    case 'CLOSE_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: false,
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

export default function Ex05_FormValidation({ onSuccess }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  function getError(field) {
    return state.touched[field] ? state.errors[field] : undefined
  }

  function handleChange(e) {
    const { name, value } = e.target

    dispatch({
      type: 'SET_FIELD',
      payload: {
        field: name,
        value,
      },
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    dispatch({
      type: 'SUBMIT',
    })
  }

  function handleGoHome() {
    dispatch({ type: 'CLOSE_SUCCESS_MODAL' })

    if (onSuccess) {
      onSuccess()
    }
  }

  useEffect(() => {
    if (!state.showSuccessModal) return

    const timer = setTimeout(() => {
      handleGoHome()
    }, 1500)

    return () => clearTimeout(timer)
  }, [state.showSuccessModal])

  return (
    <>
      <Card className="mx-auto" style={{ maxWidth: 480 }}>
        <Card.Header>
          <strong>Bài 5 – Form Validation</strong>
        </Card.Header>

        <Card.Body>
          {state.submitted && (
            <Alert variant="success" data-testid="form-success">
              Đăng ký thành công!
            </Alert>
          )}

          <Form onSubmit={handleSubmit} data-testid="register-form" noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                data-testid="input-name"
                name="name"
                value={state.values.name}
                onChange={handleChange}
                placeholder="Họ và tên"
                isInvalid={!!getError('name')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-name">
                {getError('name')}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                data-testid="input-email"
                name="email"
                value={state.values.email}
                onChange={handleChange}
                placeholder="email@example.com"
                isInvalid={!!getError('email')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-email">
                {getError('email')}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                data-testid="input-password"
                name="password"
                value={state.values.password}
                onChange={handleChange}
                placeholder="Tối thiểu 6 ký tự"
                isInvalid={!!getError('password')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-password">
                {getError('password')}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                data-testid="input-confirm"
                name="confirm"
                value={state.values.confirm}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                isInvalid={!!getError('confirm')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-confirm">
                {getError('confirm')}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                type="button"
                data-testid="btn-submit"
                onClick={handleSubmit}
              >
                Đăng ký
              </Button>

              <Button
                type="button"
                variant="secondary"
                data-testid="btn-reset"
                onClick={() => dispatch({ type: 'RESET' })}
              >
                Reset
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={state.showSuccessModal} onHide={handleGoHome} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login thành công</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Bạn đã nhập thông tin hợp lệ. Hệ thống sẽ chuyển đến trang Home.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={handleGoHome}>
            Đến Home
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}