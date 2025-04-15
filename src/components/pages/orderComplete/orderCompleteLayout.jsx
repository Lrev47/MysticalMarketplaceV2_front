import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

// Import styles
import './style/orderComplete.css';

const OrderCompleteLayout = () => {
  const { orderId } = useParams();
  const location = useLocation();
  
  // Extract order details from location state or placeholder data
  const orderDetails = location.state?.orderDetails || {
    orderId: orderId || '12345',
    date: new Date().toLocaleDateString(),
    total: 149.99,
    items: [
      { id: 1, name: 'Crystal Wand', price: 49.99, quantity: 1 },
      { id: 2, name: 'Magic Potion', price: 29.99, quantity: 2 },
      { id: 3, name: 'Mystic Runes', price: 39.99, quantity: 1 }
    ],
    shippingAddress: {
      name: 'Merlin Wizard',
      street: '123 Magic Lane',
      city: 'Mystical City',
      state: 'Enchanted State',
      zip: '12345'
    },
    paymentMethod: 'Credit Card (**** 1234)'
  };

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // In real implementation, you might want to:
    // 1. Verify the order exists
    // 2. Load order details if not provided in location state
    // 3. Clear cart if order was successful
    console.log('Order complete component mounted');
  }, []);

  return (
    <div className="order-complete-page">
      {/* Success Header */}
      <div className="order-complete-header">
        <div className="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p className="order-complete-subtitle">Thank you for your mystical purchase</p>
      </div>
      
      {/* Order Summary */}
      <div className="order-summary-container">
        <div className="order-info-section">
          <h2>Order Details</h2>
          <div className="order-info-grid">
            <div className="info-item">
              <span className="info-label">Order Number:</span>
              <span className="info-value">{orderDetails.orderId}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Order Date:</span>
              <span className="info-value">{orderDetails.date}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total:</span>
              <span className="info-value">${orderDetails.total.toFixed(2)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Payment Method:</span>
              <span className="info-value">{orderDetails.paymentMethod}</span>
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="ordered-items-section">
          <h2>Items in Your Order</h2>
          <div className="ordered-items-list">
            {orderDetails.items.map(item => (
              <div className="ordered-item" key={item.id}>
                <div className="item-image-placeholder"></div>
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">${item.price.toFixed(2)} × {item.quantity}</div>
                </div>
                <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Shipping Information */}
        <div className="shipping-section">
          <h2>Shipping To</h2>
          <div className="shipping-address">
            <p>{orderDetails.shippingAddress.name}</p>
            <p>{orderDetails.shippingAddress.street}</p>
            <p>
              {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zip}
            </p>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="next-steps-section">
          <h2>What's Next?</h2>
          <div className="next-steps-content">
            <p>You will receive a confirmation email with your order details and tracking information once your order ships.</p>
            <div className="magic-note">
              <span className="magic-icon">✨</span>
              <p>Our enchanters are preparing your mystical items with care and will dispatch them soon.</p>
            </div>
          </div>
        </div>
        
        {/* Call to Action Buttons */}
        <div className="cta-buttons">
          <Link to="/products" className="primary-button">
            Continue Shopping
          </Link>
          <Link to="/order-history" className="secondary-button">
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCompleteLayout; 