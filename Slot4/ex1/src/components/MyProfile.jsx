import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Nhận "profile" từ props
function MyProfile({ profile }) {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Card style={{ width: '18rem', textAlign: 'left' }}>
                        {/* Lấy dữ liệu từ tham số profile */}
                        <Card.Img variant="top" src={profile.avatar} />
                        <Card.Body>
                            <Card.Title>{profile.name}</Card.Title>
                            <Card.Text>
                                ID: {profile.id} <br />
                                Email: {profile.email} <br />
                                {/* Biến link Github thành thẻ a để có thể click được */}
                                Github: <a href={profile.github} target="_blank" rel="noreferrer">Truy cập Github</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default MyProfile;