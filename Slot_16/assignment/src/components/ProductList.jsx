import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchProducts,
  addProductAsync,
  deleteProductAsync,
  selectAllProducts,
  selectProductsLoading,
  selectOperationLoading,
  selectProductsError,
  clearError
} from '../redux/productsSlice';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductsLoading);
  const operationLoading = useSelector(selectOperationLoading);
  const error = useSelector(selectProductsError);

  // Form state for adding new product
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currentPrice: ''
  });

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.description || !formData.price || !formData.currentPrice) {
      alert('Vui lòng điền đầy đủ thông tin laptop');
      return;
    }

    // Validate price format
    const priceRegex = /^\d{1,3}(\.\d{3})*(\.\d{3})*$/;
    if (!priceRegex.test(formData.price) || !priceRegex.test(formData.currentPrice)) {
      alert('Vui lòng nhập giá đúng định dạng (VD: 25.990.000)');
      return;
    }

    try {
      await dispatch(addProductAsync(formData)).unwrap();
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        currentPrice: ''
      });
      setShowAddForm(false);
      alert('Thêm laptop thành công!');
    } catch (error) {
      alert('Lỗi: ' + error);
    }
  };

  // Handle delete product
  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa laptop "${productName}"?`)) {
      try {
        await dispatch(deleteProductAsync(productId)).unwrap();
        alert('Xóa laptop thành công!');
      } catch (error) {
        alert('Lỗi khi xóa laptop: ' + error);
      }
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
  };

  // Clear error message
  const handleClearError = () => {
    dispatch(clearError());
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải danh sách laptop...</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="header">
        <h1>Danh Sách Laptop</h1>
        <button 
          className="add-product-btn"
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={operationLoading}
        >
          {showAddForm ? 'Hủy' : 'Thêm Laptop Mới'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <p>Lỗi: {error}</p>
          <button onClick={handleClearError}>Đóng</button>
        </div>
      )}

      {/* Add Product Form */}
      {showAddForm && (
        <div className="add-product-form">
          <h3>Thêm Laptop Mới</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên laptop:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập tên laptop"
                required
                disabled={operationLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Thông số kỹ thuật:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Nhập thông số kỹ thuật laptop"
                rows="3"
                required
                disabled={operationLoading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Giá gốc (VNĐ):</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="25.990.000"
                  required
                  disabled={operationLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="currentPrice">Giá khuyến mãi (VNĐ):</label>
                <input
                  type="text"
                  id="currentPrice"
                  name="currentPrice"
                  value={formData.currentPrice}
                  onChange={handleInputChange}
                  placeholder="20.990.000"
                  required
                  disabled={operationLoading}
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={operationLoading}
              >
                {operationLoading ? 'Đang thêm...' : 'Thêm Laptop'}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowAddForm(false)}
                disabled={operationLoading}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Grid */}
      <div className="products-grid">
        {products.length === 0 ? (
          <div className="no-products">
            <p>Không có laptop nào để hiển thị</p>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img 
                  src={`/images/${product.image}`} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/images/default-laptop.png';
                  }}
                />
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-prices">
                  <span className="original-price">{formatPrice(product.price)}</span>
                  <span className="current-price">{formatPrice(product.currentPrice)}</span>
                </div>

                <div className="product-actions">
                  <Link 
                    to={`/product/${product.id}`} 
                    className="view-detail-btn"
                  >
                    Xem Chi Tiết
                  </Link>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={operationLoading}
                  >
                    {operationLoading ? 'Đang xóa...' : 'Xóa'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Products Count */}
      {products.length > 0 && (
        <div className="products-count">
          <p>Tổng cộng: {products.length} laptop</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;