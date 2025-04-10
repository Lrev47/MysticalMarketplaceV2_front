import React from 'react';
import '../style/InsufficientFunds.css';

const InsufficientFunds = ({ onAddFunds, missing }) => {
  return (
    <div className="insufficient-funds">
      <div className="insufficient-content">
        <div className="icon-wrapper">
          <span className="caution-icon">!</span>
        </div>
        
        <h3 className="insufficient-title">Insufficient Balance</h3>
        
        <p className="insufficient-message">
          You need <span className="missing-amount">${missing.toFixed(2)}</span> more to complete this purchase.
        </p>
        
        <button 
          className="add-funds-button"
          onClick={onAddFunds}
        >
          <span className="button-icon">💰</span>
          <span>Add Funds to Account</span>
        </button>
        
        <p className="insufficient-note">
          Adding funds is simulated and no real money will be charged.
        </p>
      </div>
    </div>
  );
};

export default InsufficientFunds; 