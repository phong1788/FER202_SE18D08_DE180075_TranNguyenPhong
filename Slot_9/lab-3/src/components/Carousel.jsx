import Carousel from 'react-bootstrap/Carousel';
import banner from '../Images/banner.jpg';
import banner2 from '../Images/banner2.jpg';
import banner3 from '../Images/banner3.jpg';

function AppCarousel() {
  return (
    <Carousel data-bs-theme="light">
      <Carousel.Item interval={3000}>
        <div className="carousel-wrapper">
          <img className="d-block w-100 carousel-image" src={banner} alt="Banner 1" />
          <div className="overlay"></div>
          <Carousel.Caption>
            <h2 className="carousel-title">Neapolitan Pizza</h2>
            <p className="carousel-description">If you are looking a traditional pizza, the Neapolitan is the best option.</p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <div className="carousel-wrapper">
          <img className="d-block w-100 carousel-image" src={banner2} alt="Banner 2" />
          <div className="overlay"></div>
          <Carousel.Caption>
            <h2 className="carousel-title">Neapolitan Pizza</h2>
            <p className="carousel-description">If you are looking a traditional pizza, the Neapolitan is the best option.</p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <div className="carousel-wrapper">
          <img className="d-block w-100 carousel-image" src={banner3} alt="Banner 3" />
          <div className="overlay"></div>
          <Carousel.Caption>
            <h2 className="carousel-title">Neapolitan Pizza</h2>
            <p className="carousel-description">If you are looking a traditional pizza, the Neapolitan is the best option.</p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}


export default AppCarousel;
