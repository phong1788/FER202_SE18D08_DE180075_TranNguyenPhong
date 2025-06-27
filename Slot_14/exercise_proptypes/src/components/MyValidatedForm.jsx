import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import PropTypes from "prop-types";

const MyValidatedForm = ({ title, onSubmit }) => {
    const [form, setForm] = useState({
        name: "",
        age: "",
        email: "",
        phone: "",
        gender: "Nam",
        agree: false,
    });

    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name || form.name.length < 3 || form.name.length > 50) {
            newErrors.name = "Tên phải có từ 3 đến 50 ký tự!";
        }

        const ageNum = parseInt(form.age);
        if (!form.age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
            newErrors.age = "Tuổi phải nằm trong khoảng từ 18 đến 100!";
        }

        if (!form.email) {
            newErrors.email = "Email không được để trống!";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Email không đúng định dạng!";
        }

        if (!form.phone || !/^\d{10,15}$/.test(form.phone)) {
            newErrors.phone = "Số điện thoại phải có từ 10 đến 15 chữ số!";
        }

        if (!form.agree) {
            newErrors.agree = "Bạn phải đồng ý với điều khoản!";
        }

        setErrors(newErrors);
        setShowAlert(Object.keys(newErrors).length > 0);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setShowAlert(false);
            onSubmit(form);
        }
    };

    return (
        <Container>
            <h3>{title}</h3>
            {showAlert && (
                <Alert variant="danger">
                    <strong>Lỗi:</strong> Vui lòng kiểm tra các trường hợp lỗi.
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tuổi</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        isInvalid={!!errors.age}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.age}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Select name="gender" value={form.gender} onChange={handleChange}>
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Khác</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Đồng ý với điều khoản"
                        name="agree"
                        checked={form.agree}
                        onChange={handleChange}
                        isInvalid={!!errors.agree}

                        feedbackType="invalid"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Gửi
                </Button>
            </Form>
        </Container>
    );
};

MyValidatedForm.propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default MyValidatedForm;
