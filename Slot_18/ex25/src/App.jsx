import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import ProductForm from './components/ProductForm';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Navigation from './components/Navigation'; 

const App = () => (
  <Router>
    <Navigation />
    <Container className="mt-4">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Container>
  </Router>
);

export default App; 