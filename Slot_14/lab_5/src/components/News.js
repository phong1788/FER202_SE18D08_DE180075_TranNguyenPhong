// News.js
import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import newLists from "../data/newsData"; // ✅ Import từ folder data
import "../App.css";

function News() {
  return (
    <Container className="py-4">
      <h2 className="mb-4 text-danger">News Category</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {newLists.map((news) => (
          <Col key={news.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={news.images} alt={news.title} className="news-image" />
              <Card.Body>
                <Card.Title>{news.title}</Card.Title>
                <Card.Text>{news.description}</Card.Text>
                {(news.url || news.URL) && (
                  <a
                    href={news.url || news.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-2"
                  >
                    Read more
                  </a>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default News;
