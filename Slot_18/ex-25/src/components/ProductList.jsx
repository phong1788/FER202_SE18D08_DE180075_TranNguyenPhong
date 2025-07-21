import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../cartSlice';

const ProductList = () => {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">${product.price}</h6>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Catalogs:</strong> {product.catalogs.join(', ')}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => dispatch(addToCart(product, 1))}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 