import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleRemove = async (item) => {
    // Trả lại quantity cho db.json
    await axios.patch(`http://localhost:3001/Laptops/${item.id}`, { quantity: item.quantity + (item.cartQuantity || 1) });
    const newCart = cart.filter(i => i.id !== item.id);
    updateCart(newCart);
    setToastMsg('Đã xóa khỏi giỏ hàng!');
    setShowToast(true);
  };

  const handleChangeQty = async (item, delta) => {
    if (delta === 1 && item.quantity === 0) return; // Không tăng nếu hết hàng
    let newQty = (item.cartQuantity || 1) + delta;
    if (newQty < 1) return;
    // Cập nhật quantity trên db.json
    await axios.patch(`http://localhost:3001/Laptops/${item.id}`, { quantity: item.quantity - delta });
    const newCart = cart.map(i =>
      i.id === item.id ? { ...i, cartQuantity: newQty, quantity: i.quantity - delta } : i
    );
    updateCart(newCart);
  };

  const handleCheckout = async () => {
    // Trả lại quantity cho db.json nếu muốn clear cart (nếu không thì bỏ đoạn này)
    // for (const item of cart) {
    //   await axios.patch(`http://localhost:3001/Laptops/${item.id}`, { quantity: item.quantity });
    // }
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/checkout');
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$','')) * (item.cartQuantity || 1), 0);

  return (
    <Container className="mt-4">
      <h3>Giỏ hàng</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.brand} {item.model}</td>
              <td>{item.price}</td>
              <td>
                <Button size="sm" variant="secondary" onClick={() => handleChangeQty(item, -1)}>-</Button>
                <span className="mx-2">{item.cartQuantity || 1}</span>
                <Button size="sm" variant="secondary" onClick={() => handleChangeQty(item, 1)} disabled={item.quantity === 0}>+</Button>
              </td>
              <td>
                <Button size="sm" variant="danger" onClick={() => handleRemove(item)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h5>Tổng: ${total.toFixed(2)}</h5>
      <Button variant="success" onClick={handleCheckout} disabled={cart.length === 0}>Đến trang Checkout</Button>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={1500} autohide bg="info">
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Cart; 