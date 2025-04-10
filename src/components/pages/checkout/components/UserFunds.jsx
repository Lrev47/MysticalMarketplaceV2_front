import React from 'react';
import '../style/UserFunds.css';

const UserFunds = ({ balance, totalAmount }) => {
  const hasEnoughFunds = balance >= totalAmount;
  const remainingBalance = balance - totalAmount;
  
  return (
    <div className={`user-funds ${hasEnoughFunds ? 'sufficient' : 'insufficient'}`}>
      <h2 className="funds-title">Your Mystical Wallet</h2>
      
      <div className="funds-details">
        <div className="funds-row">
          <p className="funds-label">Current Balance:</p>
          <p className="funds-value">${balance.toFixed(2)}</p>
        </div>
        
        <div className="funds-row order-cost">
          <p className="funds-label">Order Total:</p>
          <p className="funds-value">- ${totalAmount.toFixed(2)}</p>
        </div>
        
        <div className="funds-divider"></div>
        
        <div className="funds-row remaining-balance">
          <p className="funds-label">Remaining Balance:</p>
          <p className={`funds-value ${remainingBalance < 0 ? 'negative' : ''}`}>
            ${remainingBalance.toFixed(2)}
          </p>
        </div>
      </div>
      
      {hasEnoughFunds ? (
        <div className="funds-message success">
          <span className="message-icon">✓</span>
          <span className="message-text">You have sufficient funds for this purchase.</span>
        </div>
      ) : (
        <div className="funds-message error">
          <span className="message-icon">!</span>
          <span className="message-text">You need ${(totalAmount - balance).toFixed(2)} more to complete this purchase.</span>
        </div>
      )}
    </div>
  );
};

export default UserFunds; 