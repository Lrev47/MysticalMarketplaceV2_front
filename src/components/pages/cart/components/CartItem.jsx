import React from 'react';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import '../style/CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  // Handle quantity increase
  const handleIncreaseQuantity = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else {
      handleRemoveItem();
    }
  };

  // Handle removing the item
  const handleRemoveItem = () => {
    onRemoveItem(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img 
          src={item.imageUrl || item.product?.imageUrl || '/placeholder-image.jpg'} 
          alt={item.productName || item.product?.name} 
          className="cart-item-image" 
        />
        <div className="mystical-overlay"></div>
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.productName || item.product?.name}</h3>
        <p className="cart-item-category">{item.product?.Category?.name || 'Mystical Item'}</p>
        
        {item.product?.discountPercentage > 0 && (
          <div className="cart-item-pricing">
            <span className="cart-item-original-price">${item.product?.originalPrice?.toFixed(2)}</span>
            <span className="cart-item-discount-badge">-{item.product?.discountPercentage}%</span>
          </div>
        )}
        
        <p className="cart-item-price">${item.price?.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-quantity">
        <button 
          className="quantity-btn decrease" 
          onClick={handleDecreaseQuantity}
          aria-label="Decrease quantity"
        >
          <FaMinus />
        </button>
        
        <span className="quantity-value">{item.quantity}</span>
        
        <button 
          className="quantity-btn increase" 
          onClick={handleIncreaseQuantity}
          aria-label="Increase quantity"
        >
          <FaPlus />
        </button>
      </div>
      
      <div className="cart-item-subtotal">
        <p className="subtotal-label">Subtotal:</p>
        <p className="subtotal-value">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      
      <button 
        className="remove-item-btn" 
        onClick={handleRemoveItem}
        aria-label="Remove item"
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default CartItem; 