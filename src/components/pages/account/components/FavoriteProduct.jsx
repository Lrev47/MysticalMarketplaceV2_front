import React from 'react';
import PropTypes from 'prop-types';

const FavoriteProduct = ({ favoriteProduct }) => {
  return (
    <div className="favorite-product">
      <h3 className="section-title">Favorite Product</h3>
      <div className="product-info">
        {favoriteProduct ? (
          <>
            <span className="product-name">{favoriteProduct}</span>
            <button 
              className="view-product-button"
              onClick={() => console.log('View product clicked')}
            >
              View Product
            </button>
          </>
        ) : (
          <p className="no-favorite">No favorite product selected</p>
        )}
      </div>
    </div>
  );
};

FavoriteProduct.propTypes = {
  favoriteProduct: PropTypes.string,
};

export default FavoriteProduct; 