import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function MenuCard({ item }) {
  return (
    <Col lg={3} md={6} sm={12} className="d-flex align-items-stretch">
      <Card className="h-100 w-100 menu-card" style={{ minHeight: "400px" }}>
        <div style={{ position: "relative" }}>
          <Card.Img
            variant="top"
            src={item.image || "/placeholder.svg"}
            className="card-img-top"
            style={{ minHeight: "300px" }}
          />
          {item.badge && (
            <span
              className={`badge ${item.badgeClass} position-absolute top-0 start-0 m-2`}
            >
              {item.badge}
            </span>
          )}
        </div>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="card-title">{item.name}</Card.Title>
        </Card.Body>
        <Card.Footer className="card-footer d-flex flex-column align-items-start">
          <div className="mb-2">
            {item.salePrice !== "" ? (
              <>
                <span className="text-decoration-line-through text-muted me-2">
                  {item.originalPrice}
                </span>
                <span className="text-warning fw-bold">{item.salePrice}</span>
              </>
            ) : (
              <span className="text-muted me-2">{item.originalPrice}</span>
            )}
          </div>

          <Button variant="dark" className="btn-dark">
            Buy
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default MenuCard;
