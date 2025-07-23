import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="app-header">
            <div className="header-content">
              <h1 className="app-title">
                <span className="title-icon">💻</span>
                Laptop Store
              </h1>
              <p className="app-subtitle">Cửa hàng laptop chính hãng, giá tốt nhất thị trường</p>
            </div>
          </header>

          <main className="app-main">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer className="app-footer">
            <div className="footer-content">
              <p>&copy; 2024 Laptop Store. Tất cả quyền được bảo lưu.</p>
              <div className="footer-links">
                <a href="#about">Về chúng tôi</a>
                <a href="#contact">Liên hệ</a>
                <a href="#support">Hỗ trợ kỹ thuật</a>
                <a href="#warranty">Bảo hành</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

// 404 Not Found Component
const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Trang không tìm thấy</h2>
        <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại trong cửa hàng laptop của chúng tôi.</p>
        <a href="/" className="home-link">
          Quay về danh sách laptop
        </a>
      </div>
    </div>
  );
};

export default App;