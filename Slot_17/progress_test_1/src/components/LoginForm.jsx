import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Modal, Container, Row, Col } from 'react-bootstrap';

function LoginForm({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [error, setError] = useState(''); // Thêm state cho lỗi

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra thiếu username hoặc password
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    setError(''); // Xóa lỗi cũ nếu có
    try {
      const res = await axios.get(`http://localhost:3001/UserAccounts?username=${username}&password=${password}`);
      if (res.data.length > 0) {
        setUser(res.data[0]);
        localStorage.setItem('user', JSON.stringify(res.data[0])); // Lưu user vào localStorage
        setModalMsg(`Welcome, ${username} login Successful!`);
        setShowModal(true);
      } else {
        setError('Invalid username or password!');
      }
    } catch (err) {
      setError('Error connecting to server!');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6} lg={5}>
          <h3 className="mb-4 text-center">Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">{modalMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default LoginForm; 