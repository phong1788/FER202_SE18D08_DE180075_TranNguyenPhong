import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

const Cart = () => {
  const cartItems = useSelector(state => state.cart);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <h3>Your Cart</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Catalogs</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((p, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{p.name}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.catalogs.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h5>Total: ${total.toFixed(2)}</h5>
    </>
  );
};

export default Cart; 