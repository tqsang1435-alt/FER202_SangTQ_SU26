import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyModal({ show, onHide, pizza }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{pizza?.Name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pizza?.Image && (
          <img src={pizza.Image} alt={pizza.Name} style={{ width: '100%', marginBottom: '10px' }} />
        )}
        <p><strong>ID:</strong> {pizza?.Id}</p>
        <p><strong>Description:</strong> {pizza?.Description}</p>
        <p><strong>Old Price:</strong> <del>{pizza?.OldPrice}</del></p>
        <p><strong>New Price:</strong> {pizza?.newPrice}</p>
        <p><strong>Tag:</strong> {pizza?.tag}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
