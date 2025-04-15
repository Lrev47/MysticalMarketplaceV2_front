import React, { useRef } from 'react';
import LoginForm from './components/LoginForm';
import LoginHeader from './components/LoginHeader';
import AvatarSelect from './components/AvatarSelect';
import './style/login.css';

const LoginLayout = () => {
  const loginFormRef = useRef(null);

  const handleUserSelect = (user) => {
    if (loginFormRef.current?.handleUserSelect && user) {
      loginFormRef.current.handleUserSelect(user);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <LoginHeader />
        <LoginForm ref={loginFormRef} />
      </div>
      
      <div className="avatar-section">
        <AvatarSelect onSelectUser={handleUserSelect} />
      </div>
    </div>
  );
};

LoginLayout.displayName = 'LoginLayout';

export default LoginLayout; 