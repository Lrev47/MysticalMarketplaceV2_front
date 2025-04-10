import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../redux/slices/authSlice';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import FormOptions from './FormOptions';
import './LoginForm.css';

const LoginForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [localLoading, setLocalLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    handleUserSelect: (credentials) => {
      console.log('🔵 User selected from avatar:', credentials);
      setFormData(prev => ({
        ...prev,
        email: credentials.email || '',
        password: credentials.password || ''
      }));
    }
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localLoading) return;
    
    setLocalLoading(true);
    console.log('🔵 Login attempt started with:', { email: formData.email });
    
    try {
      const result = await dispatch(login(formData)).unwrap();
      console.log('🟢 Login successful:', result);
      
      console.log('🔵 Navigating to account page...');
      navigate('/account');
    } catch (error) {
      console.error('🔴 Login failed:', error);
      console.error('🔍 Error details:', {
        message: error.message,
        status: error.status,
        response: error.response
      });
    } finally {
      setLocalLoading(false);
    }
  };

  const isDisabled = localLoading || loading || !formData.email || !formData.password;

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <FormInput 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          icon="📧"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
        
        <FormInput 
          type="password" 
          name="password" 
          placeholder="Password" 
          icon="🔒"
          value={formData.password}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
        
        <FormOptions />
        
        <SubmitButton 
          label={localLoading || loading ? "Logging in..." : "Login"} 
          disabled={isDisabled}
        />

        {error && (
          <div className="login-error">
            {error.message || 'Login failed. Please try again.'}
          </div>
        )}
        
        <div className="login-separator">
          <span className="separator-text">or</span>
        </div>
        
        <div className="login-alternative">
          <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
        </div>
      </form>
    </div>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm; 