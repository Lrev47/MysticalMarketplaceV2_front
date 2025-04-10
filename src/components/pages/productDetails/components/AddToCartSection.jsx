import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slices/cartSlice';
import '../style/AddToCartSection.css';

const AddToCartSection = ({ productId, stock, price, discount = 0, productName, imageUrl }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  
  // Calculate price with discount
  const finalPrice = discount > 0 
    ? (price - (price * (discount / 100))).toFixed(2) 
    : price.toFixed(2);
  
  // Calculate total price based on quantity
  const totalPrice = (parseFloat(finalPrice) * quantity).toFixed(2);
  
  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= stock) {
      setQuantity(value);
    }
  };
  
  // Increment quantity
  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };
  
  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Add to cart handler (connected to Redux)
  const handleAddToCart = () => {
    // Dispatch the addToCart action with product details
    dispatch(addToCart({ 
      productId, 
      quantity, 
      price: parseFloat(finalPrice),
      productName,
      imageUrl
    }));
    
    console.log(`Added ${quantity} of product ${productId} to cart`);
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'add-success';
    successMsg.textContent = `${quantity} item${quantity > 1 ? 's' : ''} added to your mystical collection`;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.classList.add('show');
      setTimeout(() => {
        successMsg.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(successMsg);
        }, 300);
      }, 2000);
    }, 100);
  };
  
  return (
    <div className="add-to-cart-section">
      {/* Stock Status */}
      <div className="stock-status">
        {stock > 0 ? (
          <span className={`in-stock ${stock <= 5 ? 'low-stock' : ''}`}>
            {stock <= 5 ? `Only ${stock} left in stock!` : 'In Stock'}
          </span>
        ) : (
          <span className="out-of-stock">Out of Stock</span>
        )}
      </div>
      
      {/* Quantity Selector */}
      <div className="quantity-selector">
        <label htmlFor="quantity">Quantity:</label>
        <div className="quantity-controls">
          <button 
            className="quantity-btn decrement" 
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            −
          </button>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            max={stock}
            disabled={stock <= 0}
          />
          <button 
            className="quantity-btn increment" 
            onClick={incrementQuantity}
            disabled={quantity >= stock || stock <= 0}
          >
            +
          </button>
        </div>
      </div>
      
      {/* Total Price */}
      <div className="total-price">
        <span className="label">Total:</span>
        <span className="value">${totalPrice}</span>
      </div>
      
      {/* Add to Cart Button */}
      <button 
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={stock <= 0}
      >
        <span className="btn-icon">🛒</span>
        <span>{stock > 0 ? 'Add to Cart' : 'Sold Out'}</span>
      </button>
      
      {/* Shipping & Returns */}
      <div className="shipping-info">
        <div className="info-item">
          <span className="info-icon">🚚</span>
          <span>Free shipping on orders over $50</span>
        </div>
        
        <div className="info-item">
          <span className="info-icon">↩️</span>
          <span>30-day returns for unused items</span>
        </div>
      </div>
    </div>
  );
};

export default AddToCartSection; 