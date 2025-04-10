import React from 'react';
import PropTypes from 'prop-types';

const AccountDetails = ({ firstName, lastName, email, username }) => {
  return (
    <div className="account-details">
      <h3 className="section-title">Account Details</h3>
      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">First Name:</span>
          <span className="detail-value">{firstName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Last Name:</span>
          <span className="detail-value">{lastName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Username:</span>
          <span className="detail-value">{username}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{email}</span>
        </div>
      </div>
      <button className="edit-button" onClick={() => console.log('Edit details clicked')}>
        Edit Details
      </button>
    </div>
  );
};

AccountDetails.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default AccountDetails; 