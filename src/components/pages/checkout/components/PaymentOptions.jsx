import React from 'react';
import '../style/PaymentOptions.css';

const PaymentOptions = ({ onPlaceOrder, isProcessing, processingStep }) => {
  return (
    <div className="payment-options">
      <h2 className="payment-title">Complete Your Purchase</h2>
      
      <div className="payment-method">
        <p className="method-label">Payment Method:</p>
        <div className="method-option selected">
          <div className="method-radio checked"></div>
          <div className="method-details">
            <p className="method-name">Account Balance</p>
            <p className="method-description">Pay using your mystical wallet balance</p>
          </div>
        </div>
      </div>
      
      <div className="purchase-action">
        <button 
          className="purchase-button" 
          onClick={onPlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="button-spinner"></span>
              <span>{processingStep || 'Processing...'}</span>
            </>
          ) : (
            <>
              <span className="button-icon">✨</span>
              <span>Complete Purchase</span>
            </>
          )}
        </button>
      </div>
      
      <div className="purchase-note">
        <p>By completing your purchase, you agree to our Terms of Service and acknowledge that this is not a real transaction.</p>
      </div>
    </div>
  );
};

export default PaymentOptions; 