import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim().toLowerCase() === 'admin') {
      // Nếu đúng, chuyển hướng sang trang /posts
      navigate('/posts');
    } else {
      setError('Tên đăng nhập không hợp lệ. Vui lòng thử lại.');
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '400px' }}>
      <h3>Đăng nhập</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Đăng nhập
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
