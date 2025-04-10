import React from 'react';
import { Link } from 'react-router-dom';
import '../style/ProductInfo.css';

const ProductInfo = ({ name, price, ratings, categoryName, discount = 0 }) => {
  // Calculate discounted price
  const discountedPrice = discount > 0 
    ? (price - (price * (discount / 100))).toFixed(2) 
    : null;
  
  // Format price
  const formattedPrice = discountedPrice || price.toFixed(2);
  
  // Generate stars for ratings
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full">★</span>
        ))}
        
        {hasHalfStar && <span className="star half">★</span>}
        
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star empty">☆</span>
        ))}
      </div>
    );
  };
  
  return (
    <div className="product-info-section">
      {/* Category */}
      <div className="product-category">
        <Link to={`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`}>
          {categoryName}
        </Link>
      </div>
      
      {/* Product Name */}
      <h1 className="product-name">{name}</h1>
      
      {/* Ratings */}
      {ratings && (
        <div className="ratings-container">
          {generateStars(ratings.average)}
          <span className="rating-value">{ratings.average.toFixed(1)}</span>
          <span className="rating-count">({ratings.count} reviews)</span>
        </div>
      )}
      
      {/* Price */}
      <div className="price-container">
        {discount > 0 && (
          <>
            <span className="original-price">${price.toFixed(2)}</span>
            <span className="discount-badge">{discount}% OFF</span>
          </>
        )}
        <span className="product-price">${formattedPrice}</span>
      </div>
      
      {/* Mystical Badge */}
      <div className="mystical-badge">
        <div className="badge-icon">✨</div>
        <div className="badge-text">
          <span>Mystical Item</span>
          <span className="badge-subtext">Verified by our Master Enchanters</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo; 