import React from 'react';

const FormOptions = () => {
  return (
    <div className="form-options">
      <label className="remember-me">
        <input type="checkbox" />
        Remember me
      </label>
      <a href="#" className="forgot-password">
        Forgot Password?
      </a>
    </div>
  );
};

export default FormOptions; 