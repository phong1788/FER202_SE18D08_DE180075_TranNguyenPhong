import Carousel from 'react-bootstrap/Carousel';
import banner from '../images/banner.jpg';
import banner2 from '../images/banner2.jpg';
import banner3 from '../images/banner3.jpg';

function AppCarousel() {
  return (
    <Carousel data-bs-theme="light">
      <Carousel.Item interval={3000}>
        <div className="carousel-wrapper">
          <img className="d-block w-100 carousel-image" src={banner} alt="Banner 1" />
          <div className="overlay"></div>
        </div>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <div className="carousel-wrapper">
          <img className="d-block w-100 carousel-image" src={banner2} alt="Banner 2" />
          <div className="overlay"></div>
        </div>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <div className="carousel-wrapper">
          <img className="d-block w-100 carousel-image" src={banner3} alt="Banner 3" />
          <div className="overlay"></div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}


export default AppCarousel;
