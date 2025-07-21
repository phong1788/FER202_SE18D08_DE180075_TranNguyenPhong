import React from "react";
import Carousel from "./Carousel";
import "../App.css";
import { Row, Col, Image, Container } from "react-bootstrap";
import circle1 from "../images/circle1.jpg";
import circle2 from "../images/circle2.jpg";
import circle3 from "../images/circle3.jpg";
import circle4 from "../images/circle4.jpg";
import circle5 from "../images/circle5.jpg";

const circles = [
  { src: circle1, label: "Circle 1" },
  { src: circle2, label: "Circle 2" },
  { src: circle3, label: "Circle 3" },
  { src: circle4, label: "Circle 4" },
  { src: circle5, label: "Circle 5" },
];

function Home() {
  return (
    <>
      <div>
        <Carousel /> {/* ✅ Đây là nơi đặt Carousel */}
      </div>
      <Container className="mt-4">
        <Row className="justify-content-center">
          {circles.map((item, idx) => (
            <Col xs={6} md={2} className="d-flex flex-column align-items-center mb-4" key={idx}>
              <Image
                src={item.src}
                alt={item.label}
                roundedCircle
                fluid
                style={{ width: 100, height: 100, objectFit: "cover", border: "2px solid #eee" }}
              />
              
            </Col>
          ))}
        </Row>
      </Container>
      <h1 className="text-danger"> This is Home Page </h1>
    </>
  );
}

export default Home;
