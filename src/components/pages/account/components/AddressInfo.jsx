import React from 'react';
import PropTypes from 'prop-types';

const AddressInfo = ({ address, city, state, zipcode }) => {
  return (
    <div className="address-info">
      <h3 className="section-title">Shipping Address</h3>
      <div className="address-details">
        <div className="address-item">
          <span className="address-label">Street Address:</span>
          <span className="address-value">{address}</span>
        </div>
        <div className="address-item">
          <span className="address-label">City:</span>
          <span className="address-value">{city}</span>
        </div>
        <div className="address-item">
          <span className="address-label">State:</span>
          <span className="address-value">{state}</span>
        </div>
        <div className="address-item">
          <span className="address-label">Zip Code:</span>
          <span className="address-value">{zipcode}</span>
        </div>
      </div>
      <button className="edit-button" onClick={() => console.log('Edit address clicked')}>
        Edit Address
      </button>
    </div>
  );
};

AddressInfo.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipcode: PropTypes.string.isRequired,
};

export default AddressInfo; 