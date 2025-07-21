import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import NotFound from './NotFound';

function LaptopDetail() {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/Laptops/${id}`)
      .then(res => {
        if (res.data && res.data.id) setLaptop(res.data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return <NotFound />;
  if (!laptop) return <div>Loading...</div>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Img variant="top" src={laptop.image} alt={laptop.model} style={{ height: 240, objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{laptop.brand} {laptop.model}</Card.Title>
              <Card.Text>
                <b>Year:</b> {laptop.year}<br />
                <b>Price:</b> {laptop.price}<br />
                <b>Description:</b> This is a {laptop.brand} {laptop.model} released in {laptop.year}.
              </Card.Text>
              <Button href="/laptops" variant="secondary">Back to List</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LaptopDetail; 