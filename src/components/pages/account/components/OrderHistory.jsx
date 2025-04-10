import React from 'react';

const OrderHistory = () => {
  return (
    <div className="order-history">
      <h3 className="section-title">Orders</h3>
      <button 
        className="view-all-orders-button"
        onClick={() => console.log('View order history clicked')}
      >
        View Order History
      </button>
    </div>
  );
};

export default OrderHistory; 