import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import pizza1 from '../Images/pizza1.jpg';
import pizza2 from '../Images/pizza2.jpg';
import pizza3 from '../Images/pizza3.jpg';
import pizza4 from '../Images/pizza4.jpg';

const pizzaData = [
  {
    name: "Margherita Pizza",
    image: pizza1,
    oldPrice: 20,
    newPrice: 15,
    badge: "SALE"
  },
  {
    name: "Mushroom Pizza",
    image: pizza2,
    price: 25,
    badge: "NEW"
  },
  {
    name: "Hawaiian Pizza",
    image: pizza3,
    oldPrice: 18,
    newPrice: 16,
    badge: "SALE"
  },
  {
    name: "Pesto Pizza",
    image: pizza4,
    price: 30
  }
];

function Menu() {
  return (
    <Container className="py-5">
      <h2 className="text-white mb-4 fw-bold">Our Menu</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {pizzaData.map((pizza, idx) => (
          <Col key={idx}>
            <Card className="h-100 d-flex flex-column position-relative">
              {/* Badge hiển thị trên góc trái */}
              {pizza.badge && (
                <span
                  className="badge bg-warning text-dark position-absolute"
                  style={{ top: '10px', left: '10px', zIndex: 1 }}
                >
                  {pizza.badge}
                </span>
              )}

              <Card.Img
                variant="top"
                src={pizza.image}
                style={{
                  height: '300px',
                  objectFit: 'cover',
                  borderTopLeftRadius: '0.375rem',
                  borderTopRightRadius: '0.375rem'
                }}
              />

              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-dark">{pizza.name}</Card.Title>
                <div className="mb-2">
                  {pizza.oldPrice && (
                    <span className="text-muted text-decoration-line-through me-2">
                      ${pizza.oldPrice}
                    </span>
                  )}
                  <span className="text-danger fw-bold">
                    ${pizza.newPrice || pizza.price}
                  </span>
                </div>
                <Button variant="dark" className="w-100 mt-auto">Buy</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Menu;
