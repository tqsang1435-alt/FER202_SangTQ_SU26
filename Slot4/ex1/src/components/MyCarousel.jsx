//hiển thị danh sách banner dựa trên dữ liệu từ bannerData.js
//sử dụng react-bootstrap để tạo giao diện cho banner
//sử dụng props để truyền dữ liệu từ component cha vào component con MyCarousel
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function MyCarousel({ banners }) {
    return (
        <div>
            <Carousel>
                {banners.map((banner) => (
                    <Carousel.Item key={banner.Id}>
                        <img
                            className="d-block w-100"
                            src={banner.ImageSrc}
                            alt={banner.Title}
                        />
                        <Carousel.Caption>
                            <h3>{banner.Title}</h3>
                            <p>{banner.Description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
export default MyCarousel;
