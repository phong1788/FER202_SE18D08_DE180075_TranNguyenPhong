import React from 'react';
import { Carousel } from 'react-bootstrap';

function BannerCarousel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/images/banner1.jpg"
                    alt="Banner 1"
                    style={{ height: 300, objectFit: 'cover' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/images/banner2.jpg"
                    alt="Second slide"
                    style={{ height: 300, objectFit: 'cover' }}
                />
            </Carousel.Item>
            {/* Thêm nhiều item nếu muốn */}
        </Carousel>
    );
}

export default BannerCarousel;