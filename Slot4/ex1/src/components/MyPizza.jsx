import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyModal from './MyModal';

function MyPizza({ pizza }) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={pizza.Image} />
                            <Card.Body>
                                <Card.Title>{pizza.Name}</Card.Title>
                                <Card.Text>
                                    ID: {pizza.Id} <br />
                                    Description: {pizza.Description} <br />
                                    Old Price: <del>{pizza.OldPrice}</del> <br />
                                    New Price: <strong>{pizza.newPrice}</strong> <br />
                                    Tag: {pizza.tag}
                                </Card.Text>
                                <Button variant="primary" onClick={() => setShow(true)}>View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <MyModal show={show} onHide={() => setShow(false)} pizza={pizza} />
        </div>
    );
}
export default MyPizza;