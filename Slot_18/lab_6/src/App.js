import './App.css';
import Quiz from './components/Quiz';
import { Navbar, Nav, Container, Button, Card } from 'react-bootstrap';
import React, { useState } from 'react';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="App">
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Button
            variant="primary"
            size="lg"
            className="me-3 px-4 fw-bold"
            onClick={() => setPage('home')}
          >
            Home
          </Button>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setPage('about')}>About</Nav.Link>
              <Nav.Link onClick={() => setPage('news')}>News</Nav.Link>
              <Nav.Link onClick={() => setPage('quiz')}>Quiz</Nav.Link>
              <Nav.Link onClick={() => setPage('contact')}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {page === 'quiz' && (
        <Card className="mb-0 rounded-0 w-100">
          <Card.Body className="bg-dark text-white text-center py-3">
            <Card.Title as="h2">Quiz</Card.Title>
          </Card.Body>
        </Card>
      )}
      <Container className="mt-4 px-0">
        {page === 'home' && (
          <div className="text-center mt-5">
            <h2>Welcome to the Quiz App!</h2>
            <p>Click <b>Quiz</b> in the menu to start your JavaScript quiz.</p>
          </div>
        )}
        {page === 'quiz' && <Quiz />}
        {page === 'about' && <div className="text-center mt-5"><h2>About</h2><p>This is the About page (demo).</p></div>}
        {page === 'news' && <div className="text-center mt-5"><h2>News</h2><p>This is the News page (demo).</p></div>}
        {page === 'contact' && <div className="text-center mt-5"><h2>Contact</h2><p>This is the Contact page (demo).</p></div>}
      </Container>
    </div>
  );
}

export default App;
