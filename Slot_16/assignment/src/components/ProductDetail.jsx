import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProductById,
  selectProductsLoading,
  selectOperationLoading,
  selectProductsError,
  updateProductAsync,
  setSelectedProduct,
  clearError
} from '../redux/productsSlice';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const product = useSelector(state => selectProductById(state, id));
  const loading = useSelector(selectProductsLoading);
  const operationLoading = useSelector(selectOperationLoading);
  const error = useSelector(selectProductsError);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    price: '',
    currentPrice: ''
  });

  // Initialize form data when product is loaded
  useEffect(() => {
    if (product) {
      setEditFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        currentPrice: product.currentPrice
      });
      dispatch(setSelectedProduct(product));
    }
  }, [product, dispatch]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!editFormData.name || !editFormData.description || !editFormData.price || !editFormData.currentPrice) {
      alert('Vui lòng điền đầy đủ thông tin laptop');
      return;
    }

    // Validate price format
    const priceRegex = /^\d{1,3}(\.\d{3})*(\.\d{3})*$/;
    if (!priceRegex.test(editFormData.price) || !priceRegex.test(editFormData.currentPrice)) {
      alert('Vui lòng nhập giá đúng định dạng (VD: 25.990.000)');
      return;
    }

    try {
      await dispatch(updateProductAsync({
        id: product.id,
        productData: {
          ...product,
          ...editFormData
        }
      })).unwrap();
      
      setIsEditing(false);
      alert('Cập nhật thông tin laptop thành công!');
    } catch (error) {
      alert('Lỗi khi cập nhật: ' + error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      currentPrice: product.currentPrice
    });
    setIsEditing(false);
  };

  // Format price for display
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
  };

  // Calculate discount percentage
  const calculateDiscount = (originalPrice, currentPrice) => {
    const original = parseFloat(originalPrice.replace(/\./g, ''));
    const current = parseFloat(currentPrice.replace(/\./g, ''));
    const discount = ((original - current) / original) * 100;
    return Math.round(discount);
  };

  // Extract laptop brand from name
  const getLaptopBrand = (name) => {
    if (name.includes('LG')) return 'LG';
    if (name.includes('ACER') || name.includes('Acer')) return 'Acer';
    if (name.includes('Dell')) return 'Dell';
    if (name.includes('MSI')) return 'MSI';
    if (name.includes('ASUS')) return 'ASUS';
    return 'Khác';
  };

  // Clear error message
  const handleClearError = () => {
    dispatch(clearError());
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin laptop...</p>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="product-not-found">
        <div className="not-found-content">
          <h2>Không tìm thấy laptop</h2>
          <p>Laptop với ID "{id}" không tồn tại trong cửa hàng.</p>
          <Link to="/" className="back-to-list-btn">
            Quay lại danh sách laptop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      {/* Navigation */}
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Danh sách laptop</Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Chi tiết laptop</span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <p>Lỗi: {error}</p>
          <button onClick={handleClearError}>Đóng</button>
        </div>
      )}

      {/* Product Detail Content */}
      <div className="product-detail-content">
        {/* Product Image */}
        <div className="product-image-section">
          <div className="product-image-container">
            <img 
              src={`/images/${product.image}`} 
              alt={product.name}
              onError={(e) => {
                e.target.src = '/images/default-laptop.png';
              }}
            />
            {product.price !== product.currentPrice && (
              <div className="discount-badge">
                -{calculateDiscount(product.price, product.currentPrice)}%
              </div>
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="product-info-section">
          {!isEditing ? (
            // Display Mode
            <div className="product-info-display">
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-id">
                <span>Mã laptop: <strong>{product.id}</strong></span>
              </div>

              <div className="product-prices">
                {product.price !== product.currentPrice && (
                  <div className="original-price">
                    Giá gốc: <span>{formatPrice(product.price)}</span>
                  </div>
                )}
                <div className="current-price">
                  Giá khuyến mãi: <span>{formatPrice(product.currentPrice)}</span>
                </div>
                {product.price !== product.currentPrice && (
                  <div className="savings">
                    Tiết kiệm: <span>{formatPrice((parseFloat(product.price.replace(/\./g, '')) - parseFloat(product.currentPrice.replace(/\./g, ''))).toString())}</span>
                  </div>
                )}
              </div>

              <div className="product-description">
                <h3>Thông số kỹ thuật</h3>
                <p>{product.description}</p>
              </div>

              <div className="product-actions">
                <button 
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                  disabled={operationLoading}
                >
                  {operationLoading ? 'Đang xử lý...' : 'Chỉnh sửa thông tin'}
                </button>
                <button 
                  className="back-btn"
                  onClick={() => navigate('/')}
                >
                  Quay lại danh sách
                </button>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className="product-edit-form">
              <h2>Chỉnh sửa thông tin laptop</h2>
              
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label htmlFor="edit-name">Tên laptop:</label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    required
                    disabled={operationLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-description">Thông số kỹ thuật:</label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={editFormData.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    disabled={operationLoading}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="edit-price">Giá gốc (VNĐ):</label>
                    <input
                      type="text"
                      id="edit-price"
                      name="price"
                      value={editFormData.price}
                      onChange={handleInputChange}
                      placeholder="25.990.000"
                      required
                      disabled={operationLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-currentPrice">Giá khuyến mãi (VNĐ):</label>
                    <input
                      type="text"
                      id="edit-currentPrice"
                      name="currentPrice"
                      value={editFormData.currentPrice}
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
                    className="save-btn"
                    disabled={operationLoading}
                  >
                    {operationLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={handleCancelEdit}
                    disabled={operationLoading}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Additional Product Info */}
      <div className="additional-info">
        <div className="info-section">
          <h3>Thông tin bổ sung</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Thương hiệu:</span>
              <span className="info-value">{getLaptopBrand(product.name)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tình trạng:</span>
              <span className="info-value">Còn hàng</span>
            </div>
            <div className="info-item">
              <span className="info-label">Bảo hành:</span>
              <span className="info-value">12-24 tháng</span>
            </div>
            <div className="info-item">
              <span className="info-label">Xuất xứ:</span>
              <span className="info-value">Chính hãng</span>
            </div>
            <div className="info-item">
              <span className="info-label">Hỗ trợ:</span>
              <span className="info-value">24/7</span>
            </div>
            <div className="info-item">
              <span className="info-label">Giao hàng:</span>
              <span className="info-value">Miễn phí toàn quốc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;