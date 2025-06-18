import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

// Hàm xác thực đầu vào: yêu cầu ít nhất 5 ký tự
const validateInput = (value) => {
  return value.length >= 5;
};

function Exercise4() {
  const [value, setValue] = useState(""); // Giá trị đầu vào
  const [isValid, setIsValid] = useState(true); // Trạng thái hợp lệ
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi

  // Mỗi khi value thay đổi thì thực hiện xác thực
  useEffect(() => {
    const isValidInput = validateInput(value);
    setIsValid(isValidInput);

    if (!isValidInput) {
      setErrorMessage("Giá trị phải có ít nhất 5 ký tự!");
    } else {
      setErrorMessage("");
    }
  }, [value]);

  return (
    <Form>
      <Form.Group controlId="validatedInput">
        <Form.Label>Nhập một giá trị</Form.Label>
        <Form.Control
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isValid={isValid && value !== ""}
          isInvalid={!isValid && value !== ""}
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="mt-3"
        disabled={!isValid || value === ""}
      >
        Gửi
      </Button>
    </Form>
  );
}

export default Exercise4;
