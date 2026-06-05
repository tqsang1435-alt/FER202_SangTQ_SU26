import React from 'react';
import './App.css';
import Footer from './components/Footer';
import MyPizza from './components/MyPizza';
import MyNavbar from './components/MyNavbar';
// Import mảng dữ liệu pizzaData vào App.js
import { pizzaData } from './data/pizzaData'; 
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyCarousel from './components/MyCarousel';
import { bannerData } from './data/banerData';


function App() {
  return (
    <div className="App">
      <MyNavbar />
      {/* Truyền dữ liệu bannerData vào MyCarousel thông qua props */}
      <MyCarousel banners={bannerData} /> 
      <Container>
        <Row>
          {/* Sử dụng map để hiển thị danh sách pizza từ pizzaData */}
          {pizzaData.map((pizza) => (
            <Col key={pizza.Id} xs={12} md={4} className="mb-4">
              <MyPizza pizza={pizza} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />  
    </div>
  );
}

export default App;