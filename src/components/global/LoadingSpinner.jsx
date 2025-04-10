import React from 'react';
import './LoadingSpinner.css';
import logo from '../../Assets/Mystical-Marketplace.svg';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner-wrapper">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-spinner" />
        </div>
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingSpinner; 