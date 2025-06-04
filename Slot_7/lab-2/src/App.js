import './App.css';

// Import new images
import heroImage from './Images/banner.jpg';
import pizza1 from './Images/pizza1.jpg';
import pizza2 from './Images/pizza2.jpg';
import pizza3 from './Images/pizza3.jpg';
import pizza4 from './Images/pizza4.jpg';
import pizza5 from './Images/pizza5.jpg';

const pizzaData = [
  {
    name: "Margherita Pizza",
    image: pizza1,
    price: 20,
    salePrice: 15,
    badge: "SALE",
  },
  {
    name: "Mushroom Pizza",
    image: pizza2,
    price: 25,
    salePrice: null,
    badge: "NEW",
  },
  {
    name: "Hawaiian Pizza",
    image: pizza3,
    price: 18,
    salePrice: 16,
    badge: "SALE",
  },
  {
    name: "Pesto Pizza",
    image: pizza4,
    price: 30,
    salePrice: null,
    badge: null,
  },
  {
    name: "Pizza MeoMeo",
    image: pizza5,
    price: 1000,
    salePrice: null,
    badge: "Big Update",
  }
];

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4 text-white" href="#">Pizza House</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link text-white mx-2" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white mx-2" href="#">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white mx-2" href="#">Contact</a>
              </li>
            </ul>

            <div className="d-flex">
              <div className="input-group" style={{ width: "200px" }}>
                <input type="text" className="form-control" placeholder="Search..." />
                <button className="btn btn-info" type="button">🔍</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold mb-3">Neapolitan Pizza</h1>
          <p className="lead">If you are looking a traditional pizza, the Neapolitan is the best option  </p>
        </div>
      </div>

      {/* Menu */}
      <div className="menu-section py-5">
        <div className="container">
          <h2 className="text-white mb-5">Our Menu</h2>
          <div className="row">
            {pizzaData.map((pizza, idx) => (
              <div className="col-lg-3 col-md-6 mb-4" key={idx}>
                <div className="card h-100">
                  <div className="position-relative">
                    <img src={pizza.image} alt={pizza.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                    {pizza.badge && <span className="badge bg-warning position-absolute top-0 start-0 m-2">{pizza.badge}</span>}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{pizza.name}</h5>
                    <div className="mb-3">
                      {pizza.salePrice ? (
                        <>
                          <span className="text-muted text-decoration-line-through me-2">${pizza.price}</span>
                          <span className="fw-bold text-danger">${pizza.salePrice}</span>
                        </>
                      ) : (
                        <span className="fw-bold text-danger">${pizza.price}</span>
                      )}
                    </div>
                    <button className="btn btn-dark mt-auto">Buy</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
{/* Booking */}
      {/* Booking */}
      <div className="booking-section py-5">
        <div className="container">
          <h2 className="text-white text-center mb-4">Book a Table</h2>
          <form className="row justify-content-center">
            <div className="col-md-4 mb-3">
              <input type="text" className="form-control" placeholder="Your Name *" />
            </div>
            <div className="col-md-4 mb-3">
              <input type="email" className="form-control" placeholder="Your Email *" />
            </div>
            <div className="col-md-4 mb-3">
              <select className="form-select">
                <option>Select a Service</option>
                <option>Dine In</option>
                <option>Takeaway</option>
                <option>Delivery</option>
              </select>
            </div>
            <div className="col-md-12 mb-3">
              <textarea className="form-control" rows="4" placeholder="Additional notes..."></textarea>
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn btn-warning text-dark fw-bold px-5">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
