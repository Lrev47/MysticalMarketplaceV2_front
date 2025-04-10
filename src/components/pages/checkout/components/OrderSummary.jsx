import React from 'react';
import '../style/OrderSummary.css';

const OrderSummary = ({ cartItems, totalAmount }) => {
  return (
    <div className="order-summary">
      <h2 className="summary-title">Order Summary</h2>
      
      <div className="order-items">
        {cartItems.map(item => (
          <div key={item.id} className="order-item">
            <div className="item-image-container">
              <img 
                src={item.product.imageUrl} 
                alt={item.product.name}
                className="item-image" 
              />
              <div className="mystical-overlay"></div>
            </div>
            
            <div className="item-details">
              <h3 className="item-name">{item.product.name}</h3>
              <p className="item-quantity">Quantity: {item.quantity}</p>
              <p className="item-price">${item.price.toFixed(2)} each</p>
            </div>
            
            <div className="item-subtotal">
              <p className="subtotal-label">Subtotal:</p>
              <p className="subtotal-value">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-total">
        <p className="total-label">Order Total:</p>
        <p className="total-value">${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderSummary; 