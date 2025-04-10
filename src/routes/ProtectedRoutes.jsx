import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/global/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user, token } = useSelector(state => state.auth);
  const location = useLocation();
  
  console.log('🔍 ProtectedRoute Check:', {
    isAuthenticated,
    loading,
    hasUser: !!user,
    hasToken: !!token,
    tokenFromStorage: !!localStorage.getItem('token')
  });
  
  // While loading, show spinner
  if (loading) {
    console.log('⏳ Auth is still loading, showing spinner...');
    return <LoadingSpinner />;
  }
  
  // If there's a token in localStorage but not authenticated yet, show loading
  // This handles the race condition where the route renders before auth completes
  if (!isAuthenticated && localStorage.getItem('token') && !loading) {
    console.log('⏳ Token exists but not authenticated yet, showing spinner...');
    return <LoadingSpinner />;
  }
  
  // If not authenticated and no token, redirect to login
  if (!isAuthenticated) {
    console.log('🚫 Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  console.log('✅ Authentication verified, rendering protected content');
  return children;
};

export default ProtectedRoute; 