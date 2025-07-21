import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer style={{ background: '#222', color: '#fff', padding: '24px 0', marginTop: 40 }}>
      <Container className="text-center">
        <h5>About of Web</h5>
        <p>
          Website này là hệ thống quản lý laptop, cho phép người dùng đăng nhập, tìm kiếm, xem chi tiết các mẫu laptop nổi bật.
          Giao diện hiện đại, dễ sử dụng, hỗ trợ tìm kiếm nhanh và xem thông tin chi tiết từng sản phẩm.
        </p>
        <div style={{ fontSize: 14, color: '#aaa' }}>
          &copy; {new Date().getFullYear()} Laptop Management Project
        </div>
      </Container>
    </footer>
  );
}

export default Footer; 