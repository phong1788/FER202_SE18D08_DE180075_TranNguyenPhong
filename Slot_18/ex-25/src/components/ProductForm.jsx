import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../productsSlice';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [catalogs, setCatalogs] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now().toString(),
      name,
      price: parseFloat(price),
      description,
      catalogs: catalogs.split(',').map((c) => c.trim()),
    };
    dispatch(addProduct(newProduct));
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Catalogs (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={catalogs}
            onChange={(e) => setCatalogs(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm; 