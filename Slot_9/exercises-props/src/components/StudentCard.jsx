import React from "react";
import { Card, Button } from "react-bootstrap";

const StudentCard = ({ student }) => {
    return (
        <Card style={{ width: "16rem" }} className="mb-4">
            <Card.Img
                variant="top"
                src={student.avatar}
                alt={`${student.name}'s avatar`}
                style={{ height: "300px", objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title>{student.name}</Card.Title>
                <Card.Text>Age: {student.age}</Card.Text>
                <Button variant="primary">Edit</Button>
            </Card.Body>
        </Card>
    );
};

export default StudentCard;