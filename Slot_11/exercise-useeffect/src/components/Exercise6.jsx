import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function Exercise6() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [agree, setAgree] = useState(false);

  // Touched state để tránh hiển thị lỗi khi chưa nhập gì
  const [touched, setTouched] = useState({
    name: false,
    gender: false,
    country: false,
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate logic
  useEffect(() => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Vui lòng nhập tên";
    } else if (name.trim().length < 3) {
      newErrors.name = "Tên phải có ít nhất 3 ký tự";
    }
    if (!gender) newErrors.gender = "Vui lòng chọn giới tính";
    if (!country) newErrors.country = "Vui lòng chọn quốc gia";
    if (!agree) newErrors.agree = "Bạn phải đồng ý với điều khoản";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [name, gender, country, agree]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Dữ liệu đã gửi:\n" + JSON.stringify({ name, gender, country, agree }, null, 2));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Textbox: Name */}
      <Form.Group controlId="name">
        <Form.Label>Họ và tên</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          isInvalid={touched.name && !!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      {/* Radio: Gender */}
      <Form.Group className="mt-3">
        <Form.Label>Giới tính</Form.Label>
        <div>
          <Form.Check
            inline
            type="radio"
            label="Nam"
            name="gender"
            value="Nam"
            checked={gender === "Nam"}
            onChange={(e) => setGender(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, gender: true }))}
            isInvalid={touched.gender && !!errors.gender}
          />
          <Form.Check
            inline
            type="radio"
            label="Nữ"
            name="gender"
            value="Nữ"
            checked={gender === "Nữ"}
            onChange={(e) => setGender(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, gender: true }))}
            isInvalid={touched.gender && !!errors.gender}
          />
        </div>
        {touched.gender && errors.gender && (
          <div className="text-danger">{errors.gender}</div>
        )}
      </Form.Group>

      {/* Dropdown: Country */}
      <Form.Group controlId="country" className="mt-3">
        <Form.Label>Quốc gia</Form.Label>
        <Form.Select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, country: true }))}
          isInvalid={touched.country && !!errors.country}
        >
          <option value="">-- Chọn quốc gia --</option>
          <option value="Vietnam">Việt Nam</option>
          <option value="USA">Hoa Kỳ</option>
          <option value="Japan">Nhật Bản</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
      </Form.Group>

      {/* Checkbox: Terms */}
      <Form.Group controlId="agree" className="mt-3">
        <Form.Check
          type="checkbox"
          label="Tôi đồng ý với các điều khoản"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          onBlur={() => setTouched((prev) => ({ ...prev, agree: true }))}
          isInvalid={touched.agree && !!errors.agree}
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="mt-4" disabled={!isFormValid}>
        Submit
      </Button>
    </Form>
  );
}

export default Exercise6;
