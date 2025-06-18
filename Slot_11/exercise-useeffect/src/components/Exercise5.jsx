import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

// Hàm kiểm tra định dạng email hợp lệ
const isValidEmail = (email) => {
  // Đơn giản: có ký tự trước @ và sau @ là tên miền
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function Exercise5() {
  // State cho email
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  // State cho password
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Kiểm tra email khi thay đổi
  useEffect(() => {
    setIsEmailValid(isValidEmail(email));
  }, [email]);

  // Kiểm tra password khi thay đổi
  useEffect(() => {
    setIsPasswordValid(password.length >= 8);
  }, [password]);

  // Kiểm tra toàn bộ form hợp lệ
  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <Form>
      {/* Email */}
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          isInvalid={emailTouched && !isEmailValid}
        />
        <Form.Control.Feedback type="invalid">
          Email không hợp lệ!
        </Form.Control.Feedback>
      </Form.Group>

      {/* Password */}
      <Form.Group controlId="formPassword" className="mt-3">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="Nhập mật khẩu (ít nhất 8 ký tự)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setPasswordTouched(true)}
          isInvalid={passwordTouched && !isPasswordValid}
        />
        <Form.Control.Feedback type="invalid">
          Mật khẩu phải có ít nhất 8 ký tự!
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="mt-3"
        disabled={!isFormValid}
      >
        Submit
      </Button>
    </Form>
  );
}

export default Exercise5;