import React from 'react';

const FormInput = ({ type, name, placeholder, icon, value, onChange, disabled }) => {
  return (
    <div className="form-group">
      <span className="input-icon">{icon}</span>
      <input
        type={type}
        name={name}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={type === 'password' ? 'current-password' : 'on'}
      />
    </div>
  );
};

FormInput.displayName = 'FormInput';

export default FormInput; 