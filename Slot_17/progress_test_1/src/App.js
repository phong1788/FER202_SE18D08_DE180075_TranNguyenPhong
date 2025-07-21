import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LaptopList from './components/LaptopList';
import LaptopDetail from './components/LaptopDetail';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import BannerCarousel from './components/BannerCarousel';
import Cart from './components/Cart';

function App() {
  const [user, setUser] = useState(() => {
    // Lấy user từ localStorage khi khởi động
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Khi user thay đổi, lưu vào localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          user ? <Navigate to="/laptops" /> : <LoginForm setUser={setUser} />
        } />
        <Route path="/laptops" element={
          user ? <LaptopList setUser={setUser} /> : <Navigate to="/" />
        } />
        <Route path="/laptops/:id" element={
          user ? <LaptopDetail /> : <Navigate to="/" />
        } />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" />} />
        <Route path="/checkout" element={user ? <div style={{padding:40}}><h2>Checkout thành công!</h2><p>Cảm ơn bạn đã mua hàng.</p></div> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
