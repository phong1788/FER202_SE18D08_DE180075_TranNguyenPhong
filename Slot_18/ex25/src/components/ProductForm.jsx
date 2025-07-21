import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/Actions';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const ProductForm = () => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    catalogs: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...form,
      price: parseFloat(form.price),
      catalogs: form.catalogs.split(',').map(c => c.trim()),
    };
    dispatch(addProduct(newProduct));
    navigate('/');
  };

  return (
    <>
      <h3>Add New Product</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>ID</Form.Label>
          <Form.Control name="id" value={form.id} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={form.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" value={form.price} onChange={handleChange} type="number" step="0.01" required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" value={form.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Catalogs (comma-separated)</Form.Label>
          <Form.Control name="catalogs" value={form.catalogs} onChange={handleChange} />
        </Form.Group>

        <Button type="submit" variant="primary">Add Product</Button>
      </Form>
    </>
  );
};

export default ProductForm; 