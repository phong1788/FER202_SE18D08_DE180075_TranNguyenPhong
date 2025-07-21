import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form, InputGroup, Navbar, Nav, Toast, ToastContainer } from 'react-bootstrap';
import BannerCarousel from './BannerCarousel';
import Footer from './Footer';

function LaptopList({ setUser }) {
  const [laptops, setLaptops] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/Laptops')
      .then(res => {
        setLaptops(res.data);
        setFiltered(res.data);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setFiltered(
      laptops.filter(lap =>
        (lap.brand + ' ' + lap.model).toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleAddToCart = async (lap) => {
    if (lap.quantity === 0) return;
    // Giảm quantity trên server
    await axios.patch(`http://localhost:3001/Laptops/${lap.id}`, { quantity: lap.quantity - 1 });
    // Thêm vào giỏ hàng localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = cart.findIndex(item => item.id === lap.id);
    if (idx !== -1) {
      cart[idx].cartQuantity = (cart[idx].cartQuantity || 1) + 1;
    } else {
      cart.push({ ...lap, cartQuantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setToastMsg('Đã thêm vào giỏ hàng!');
    setShowToast(true);
    // Reload lại danh sách laptop
    const res = await axios.get('http://localhost:3001/Laptops');
    setLaptops(res.data);
    setFiltered(res.data);
  };

  const handleResetStock = async () => {
    const res = await axios.get('http://localhost:3001/Laptops');
    const laptops = res.data;
    await Promise.all(laptops.map(lap => axios.patch(`http://localhost:3001/Laptops/${lap.id}`, { quantity: 5 })));
    const reload = await axios.get('http://localhost:3001/Laptops');
    setLaptops(reload.data);
    setFiltered(reload.data);
    setToastMsg('Đã reset kho về số lượng 10!');
    setShowToast(true);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{ marginBottom: 0 }}>
        <Navbar.Brand className="fw-bold">Laptop Management</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-danger" onClick={() => setUser(null)}>
            Logout
          </Button>
        </Nav>
      </Navbar>
      <div style={{ marginTop: 0 }}>
        <BannerCarousel />
      </div>
      <Container className="mt-4">
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Form onSubmit={handleSearch} className="mb-0" style={{flex:1}}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Button type="submit" variant="primary">Search</Button>
            </InputGroup>
          </Form>
          <Button variant="warning" className="ms-3" onClick={handleResetStock}>Reset kho</Button>
        </div>
        <Row>
          {filtered.map(lap => (
            <Col md={6} lg={3} className="mb-4" key={lap.id}>
              <Card>
                <Card.Img variant="top" src={lap.image} alt={lap.model} style={{ height: 180, objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{lap.brand} {lap.model}</Card.Title>
                  <Card.Text>
                    Year: {lap.year}<br />
                    Price: {lap.price}<br />
                    <b>Quantity:</b> {lap.quantity}
                  </Card.Text>
                  <Link to={`/laptops/${lap.id}`}>
                    <Button variant="info" className="me-2">View Details</Button>
                  </Link>
                  <Button 
                    variant="success" 
                    disabled={lap.quantity === 0}
                    onClick={() => handleAddToCart(lap)}
                  >
                    {lap.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={1500} autohide bg="success">
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Footer />
    </>
  );
}

export default LaptopList; 