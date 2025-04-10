import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { 
    id, 
    name, 
    description, 
    price, 
    imageUrl, 
    inStock = true, 
    discountPercentage = 0,
    categoryName
  } = product;
  
  // Calculate discounted price
  const displayPrice = discountPercentage 
    ? (price - (price * (discountPercentage / 100))).toFixed(2) 
    : price.toFixed(2);
  
  // Truncate text function
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
  // Determine placeholder image if no image URL is provided
  const fallbackImage = '/placeholder-image.jpg';
  
  return (
    <div className={`product-card ${!inStock ? 'out-of-stock' : ''}`}>
      <Link to={`/product/${id}`} className="product-card-link">
        {/* Product Image Section */}
        <div className="product-image-container">
          <img 
            src={imageUrl || fallbackImage} 
            alt={name} 
            className="product-image" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
          
          {/* Category Tag */}
          {categoryName && (
            <div className="category-tag">
              {truncateText(categoryName, 20)}
            </div>
          )}
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="discount-badge">
              {discountPercentage}% OFF
            </div>
          )}
          
          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="out-of-stock-overlay">
              <span>Out of Stock</span>
            </div>
          )}
        </div>
        
        {/* Product Information */}
        <div className="product-info">
          <h3 className="product-name">{name}</h3>
          <p className="product-description">{truncateText(description, 60)}</p>
          
          {/* Price Display */}
          <div className="product-price-container">
            {discountPercentage > 0 ? (
              <>
                <span className="original-price">${price.toFixed(2)}</span>
                <span className="discounted-price">${displayPrice}</span>
              </>
            ) : (
              <span className="product-price">${displayPrice}</span>
            )}
          </div>
          
          {/* View Details Button */}
          <button className="view-details-btn">
            {inStock ? 'View Details' : 'See More'}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 