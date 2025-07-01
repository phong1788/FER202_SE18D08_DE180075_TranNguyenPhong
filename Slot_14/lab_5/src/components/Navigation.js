import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar bg="light" variant="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Nav className="w-100 justify-content-front">
          <Nav.Link as={Link} to="/about" className="mx-3">About</Nav.Link>
          <Nav.Link as={Link} to="/news" className="mx-3">News</Nav.Link>
          <Nav.Link as={Link} to="/quiz" className="mx-3">Quiz</Nav.Link>
          <Nav.Link as={Link} to="/contact" className="mx-3">Contact</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;