import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ username, email, imageUrl, moneyBalance }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-image-container">
          {!imageError ? (
            <img
              src={imageUrl}
              alt={`${username}'s profile`}
              className="profile-image"
              onError={handleImageError}
            />
          ) : (
            <div className="profile-image-fallback">
              {username ? username.charAt(0).toUpperCase() : '?'}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h2 className="profile-username">{username}</h2>
          <p className="profile-email">{email}</p>
          <p className="profile-balance">Balance: ${moneyBalance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  moneyBalance: PropTypes.number.isRequired
};

UserProfile.defaultProps = {
  imageUrl: ''
};

export default UserProfile; 