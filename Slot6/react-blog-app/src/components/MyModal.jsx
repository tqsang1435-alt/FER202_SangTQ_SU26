import { Modal, Button } from 'react-bootstrap';

function MyModal({ show, onHide, title, message, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>
            Xác nhận
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
