import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import AppRouter from './routes/AppRouter';
import { initializeAuth } from './redux/slices/authSlice';

// AuthInitializer component to handle auth initialization
const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, validate it
      console.log('Token found in localStorage, validating...');
      dispatch(initializeAuth()).unwrap()
        .then(data => {
          console.log('Auth initialized successfully:', data);
        })
        .catch(error => {
          console.error('Auth initialization failed:', error);
        });
    } else {
      console.log('No token found in localStorage');
    }
  }, [dispatch]);

  return children;
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <AppRouter />
      </AuthInitializer>
    </Provider>
  );
};

export default App;