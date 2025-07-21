import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, addToCart } from '../redux/Actions';
import { Card, Button, Row, Col } from 'react-bootstrap';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(loadProducts());
    }
  }, [dispatch, products.length]);

  return (
    <Row>
      {products.map(product => (
        <Col md={4} key={product.id}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>Price: ${product.price}</Card.Text>
              <Card.Text>
                Catalogs: {product.catalogs.join(', ')}
              </Card.Text>
              <Button onClick={() => {
                dispatch(addToCart(product));
                alert(`Add ${product.name} to cart success!`);
              }}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList; 