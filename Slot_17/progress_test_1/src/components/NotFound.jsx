import React from 'react';
import { Container } from 'react-bootstrap';

function NotFound() {
  return (
    <Container className="mt-5 text-center">
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </Container>
  );
}

export default NotFound; 