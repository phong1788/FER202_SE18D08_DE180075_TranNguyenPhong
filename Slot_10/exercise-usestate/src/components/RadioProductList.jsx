import React, { useState } from 'react';

function RadioProductList() {
  const [radioProducts] = useState([
    { id: 4, name: 'Sản phẩm X' },
    { id: 5, name: 'Sản phẩm Y' },
    { id: 6, name: 'Sản phẩm Z' },
  ]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleRadioChange = (event) => {
    setSelectedProduct(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h2>Radio Product List</h2>
      {radioProducts.map(product => (
        <div key={product.id}>
          <input
            type="radio"
            id={`radio-${product.id}`}
            name="product"
            value={product.id}
            checked={selectedProduct === product.id}
            onChange={handleRadioChange}
          />
          <label htmlFor={`radio-${product.id}`}>{product.name}</label>
        </div>
      ))}
      {selectedProduct && (
        <p>
          Bạn đã chọn sản phẩm:{' '}
          {radioProducts.find(p => p.id === selectedProduct).name}
        </p>
      )}
    </div>
  );
}

export default RadioProductList;