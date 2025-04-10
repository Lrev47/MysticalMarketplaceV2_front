import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addMoneyToAccount } from '../../../redux/slices/userSlice';

const AddMoney = ({ currentBalance, userId }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleAddMoney = async (e) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    try {
      await dispatch(addMoneyToAccount({ userId, amount: parseFloat(amount) })).unwrap();
      setAmount(''); // Clear the input after successful addition
    } catch (err) {
      setError(err.message || 'Failed to add money to account');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuickAmount = (value) => {
    setAmount(value.toString());
  };

  return (
    <div className="add-money">
      <h3 className="section-title">Add Money to Account</h3>
      <div className="balance-info">
        <span className="balance-label">Current Balance:</span>
        <span className="balance-value">${currentBalance.toFixed(2)}</span>
      </div>
      <form className="add-money-form" onSubmit={handleAddMoney}>
        <div className="amount-input-container">
          <span className="currency-symbol">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            className="amount-input"
            disabled={isProcessing}
          />
        </div>
        <div className="quick-amounts">
          <button 
            type="button" 
            className="quick-amount-btn" 
            onClick={() => handleQuickAmount(10)}
            disabled={isProcessing}
          >
            $10
          </button>
          <button 
            type="button" 
            className="quick-amount-btn" 
            onClick={() => handleQuickAmount(25)}
            disabled={isProcessing}
          >
            $25
          </button>
          <button 
            type="button" 
            className="quick-amount-btn" 
            onClick={() => handleQuickAmount(50)}
            disabled={isProcessing}
          >
            $50
          </button>
          <button 
            type="button" 
            className="quick-amount-btn" 
            onClick={() => handleQuickAmount(100)}
            disabled={isProcessing}
          >
            $100
          </button>
        </div>
        <button 
          type="submit" 
          className="add-money-button"
          disabled={isProcessing || !amount || parseFloat(amount) <= 0}
        >
          {isProcessing ? 'Adding Money...' : 'Add Money'}
        </button>
        {error && (
          <div className="add-money-error">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

AddMoney.propTypes = {
  currentBalance: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
};

export default AddMoney; 