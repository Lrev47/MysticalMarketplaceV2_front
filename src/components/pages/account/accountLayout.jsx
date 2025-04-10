import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style/accountLayout.css';

// Import account components
import UserProfile from './components/UserProfile';
import OrderHistory from './components/OrderHistory';
import FavoriteProduct from './components/FavoriteProduct';
import AddressInfo from './components/AddressInfo';
import AddMoney from './components/AddMoney';
import AccountDetails from './components/AccountDetails';
import LoadingSpinner from '../../global/LoadingSpinner';

const AccountLayout = () => {
  const { user, loading: authLoading, error: authError } = useSelector((state) => state.auth);
  const { userDetails, loading: userLoading, error: userError } = useSelector((state) => state.user || {});
  
  const loading = authLoading || userLoading;
  const error = authError || userError;

  useEffect(() => {
    // Log user data for debugging
    console.log('AccountLayout mounted with user data:', {
      isAuthenticated: !!user,
      user,
      userDetails
    });
  }, [user, userDetails]);

  if (loading) {
    return <div className="account-loading"><LoadingSpinner /></div>;
  }

  if (error) {
    return (
      <div className="account-error">
        <h2>Error loading account</h2>
        <p>{error.message || JSON.stringify(error)}</p>
      </div>
    );
  }

  if (!user) {
    return <div className="account-error">Please log in to view your account.</div>;
  }

  // Combine user data from auth and user state
  const userData = {
    ...user,
    ...userDetails,
  };

  // Default values in case some user data is missing
  const {
    username = user?.email?.split('@')[0] || 'User',
    email = user?.email || '',
    firstName = '',
    lastName = '',
    imageUrl = '',
    moneyBalance = userData.moneyNum || 0,
    favoriteProduct = '',
    address = '',
    city = '',
    state = '',
    zipcode = '',
  } = userData || {};

  // Get a valid user ID for components that require it
  const userId = user?.id || user?.userId || user?._id;

  return (
    <div className="account-page">
      <div className="account-container">
        <h1 className="account-title">My Account</h1>
        
        <div className="account-grid">
          {/* User Profile Section */}
          <section className="account-section">
            <UserProfile 
              username={username}
              email={email}
              imageUrl={imageUrl}
              moneyBalance={moneyBalance}
            />
          </section>

          {/* Add Money Section */}
          <section className="account-section">
            {userId && (
              <AddMoney 
                currentBalance={moneyBalance}
                userId={userId}
              />
            )}
          </section>

          {/* Account Details Section */}
          <section className="account-section">
            <AccountDetails
              firstName={firstName}
              lastName={lastName}
              email={email}
              username={username}
            />
          </section>

          {/* Address Information Section */}
          <section className="account-section">
            <AddressInfo
              address={address}
              city={city}
              state={state}
              zipcode={zipcode}
            />
          </section>

          {/* Favorite Product Section */}
          <section className="account-section">
            <FavoriteProduct
              favoriteProduct={favoriteProduct}
            />
          </section>

          {/* Order History Section */}
          <section className="account-section">
            <OrderHistory />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout; 