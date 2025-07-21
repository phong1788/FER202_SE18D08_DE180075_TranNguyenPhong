// News.js
import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import newLists from "../data/newsData";
import "../App.css";

function News() {
  return (
    <Container className="py-3">
      <h2 className="mb-3 text-danger">News Category</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {newLists.map((news) => {
          const link = news.url || news.URL;

          return (
            <Col key={news.id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={news.images}
                  alt={news.title}
                  className="news-image"
                />
                <Card.Body>
                  <Card.Title>{news.title}</Card.Title>
                  <Card.Text>{news.description}</Card.Text>

                  {link && (
                    <p className="mt-2">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default News;
