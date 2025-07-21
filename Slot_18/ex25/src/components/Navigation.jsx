import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">CartApp</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Products</Nav.Link>
          <Nav.Link as={Link} to="/add">Add Product</Nav.Link>
          <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation; 