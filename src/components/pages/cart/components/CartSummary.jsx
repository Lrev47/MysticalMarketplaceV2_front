import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaCreditCard, FaInfoCircle } from 'react-icons/fa';
import '../style/CartSummary.css';

const CartSummary = ({ cartItems, onCheckout }) => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  // Apply fixed shipping fee or free shipping based on subtotal
  const shipping = subtotal >= 50 ? 0 : 5.99;
  
  // Calculate final total
  const total = subtotal - (subtotal * (promoDiscount / 100)) + shipping;
  
  // Handle promo code application
  const handleApplyPromo = () => {
    // Reset previous error
    setPromoError('');
    
    // Simple promo code validation (in a real app, this would be server-side)
    if (promoCode.trim().toUpperCase() === 'MYSTICAL10') {
      setPromoDiscount(10);
    } else if (promoCode.trim().toUpperCase() === 'MAGIC20') {
      setPromoDiscount(20);
    } else {
      setPromoError('Invalid promo code');
      setPromoDiscount(0);
    }
  };
  
  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    // If onCheckout is provided, call it with summary data
    if (onCheckout) {
      onCheckout({
        subtotal,
        shipping,
        promoDiscount,
        total
      });
    } else {
      // Otherwise, navigate to the checkout page
      navigate('/checkout');
    }
  };
  
  return (
    <div className="cart-summary">
      <h2 className="summary-title">Order Summary</h2>
      
      <div className="summary-details">
        <div className="summary-row">
          <span>Subtotal ({cartItems.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="free-shipping">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        {promoDiscount > 0 && (
          <div className="summary-row discount">
            <span>Promo Discount</span>
            <span>-${(subtotal * (promoDiscount / 100)).toFixed(2)}</span>
          </div>
        )}
        
        <div className="summary-divider"></div>
        
        <div className="summary-row total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); handleApplyPromo(); }} className="promo-form">
        <div className="input-group">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Enter promo code"
            className={promoError ? 'error' : ''}
          />
          <button 
            type="submit" 
            className="promo-btn"
            disabled={!promoCode}
          >
            Apply
          </button>
        </div>
        {promoError && <p className="promo-error">{promoError}</p>}
      </form>
      
      <div className="shipping-info">
        <p className="free-shipping-notice">
          <FaInfoCircle className="info-icon" />
          Free shipping on orders over $50
        </p>
      </div>
      
      <button 
        className="checkout-btn" 
        onClick={handleProceedToCheckout}
        disabled={cartItems.length === 0}
      >
        <FaCreditCard className="btn-icon" />
        <span>Proceed to Checkout</span>
      </button>
      
      <button 
        className="continue-shopping-btn" 
        onClick={() => navigate('/products')}
      >
        <FaShoppingBag className="btn-icon" />
        <span>Continue Shopping</span>
      </button>
    </div>
  );
};

export default CartSummary; 