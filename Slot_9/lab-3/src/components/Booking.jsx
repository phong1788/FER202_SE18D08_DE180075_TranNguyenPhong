import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Booking() {
  return (
    <Container>
      <h2 className="text-white text-center mb-4">Book a Table</h2>
      <Form>
        <Row className="justify-content-center">
          <Col md={4} className="mb-3">
            <Form.Control type="text" placeholder="Your Name *" />
          </Col>
          <Col md={4} className="mb-3">
            <Form.Control type="email" placeholder="Your Email *" />
          </Col>
          <Col md={4} className="mb-3">
            <Form.Select>
              <option>Select a Service</option>
              <option>Dine In</option>
              <option>Take Away</option>
              <option>Delivery</option>
            </Form.Select>
          </Col>
          <Col md={12} className="mb-3">
            <Form.Control as="textarea" rows={4} placeholder="Additional notes..." />
          </Col>
          <Col md={12} className="text-center mb-5">
            <Button
              type="submit"
              variant="warning"
              className="text-dark fw-bold fs-5 py-2 px-5"
            >
              Send Message
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Booking;
