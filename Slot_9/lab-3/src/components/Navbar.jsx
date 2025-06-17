import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from 'react-icons/fa';

function AppNavbar() {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container fluid>
        <Navbar.Brand href="#" className="text-white fw-bold">
          Pizza House
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="#home" className="text-white">Home</Nav.Link>
            <Nav.Link href="#about" className="text-white">About Us</Nav.Link>
            <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <InputGroup>
              <Form.Control type="search" placeholder="Search..." className="rounded-start" />
              <Button variant="info" className="text-white rounded-end">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default AppNavbar;
