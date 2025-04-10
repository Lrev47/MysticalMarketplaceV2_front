import React from 'react';

const SubmitButton = ({ label, disabled }) => {
  return (
    <button 
      type="submit" 
      className="submit-button"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default SubmitButton; 