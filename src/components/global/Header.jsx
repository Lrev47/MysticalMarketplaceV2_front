import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const userDetails = useSelector(state => state.user.userDetails);
  const allUsers = useSelector(state => state.user.allUsers);
  const cartItems = useSelector(state => state.cart?.items || []);
  const [imageError, setImageError] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState('/Assets/default-avatar.png');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Get user's display name - use username, first name, or fallback to email
  const getDisplayName = () => {
    if (!user) return '';
    
    if (user.username) return user.username;
    if (user.firstName) return user.firstName;
    
    // If email is all we have, extract the part before @
    if (user.email) {
      const emailParts = user.email.split('@');
      return emailParts[0];
    }
    
    return 'Wizard';
  };

  // Get cart items count
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Deep search for an image in an object
  const findImageInObject = (obj) => {
    if (!obj || typeof obj !== 'object') return null;
    
    // Look directly for image-related properties
    const imageProperties = [
      'userImageUrl', 'imageUrl', 'profileImage', 
      'avatar', 'image', 'photo', 'picture', 
      'profilePicture', 'profilePhoto', 'userImage'
    ];
    
    for (const prop of imageProperties) {
      if (obj[prop] && typeof obj[prop] === 'string') {
        console.log(`Found image at ${prop}:`, obj[prop]);
        return obj[prop];
      }
    }
    
    // Recursively search nested objects
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        const nestedImage = findImageInObject(obj[key]);
        if (nestedImage) return nestedImage;
      }
    }
    
    return null;
  };

  // Look for user's image in redux store
  useEffect(() => {
    // Debug all available user data
    console.log('Auth state user:', user);
    console.log('User details from user state:', userDetails);
    console.log('All users in store:', allUsers);
    
    let imageUrl = null;
    
    // First, try to find image in userDetails
    imageUrl = findImageInObject(userDetails);
    
    // If not found, try auth user
    if (!imageUrl) {
      imageUrl = findImageInObject(user);
    }
    
    // If still not found, try to find user in allUsers list
    if (!imageUrl && allUsers && Array.isArray(allUsers) && user) {
      const currentUserId = user.id || user.userId || user._id;
      const currentUserEmail = user.email;
      
      if (currentUserId || currentUserEmail) {
        const matchedUser = allUsers.find(u => 
          (currentUserId && (u.id === currentUserId || u.userId === currentUserId || u._id === currentUserId)) ||
          (currentUserEmail && u.email === currentUserEmail)
        );
        
        if (matchedUser) {
          console.log('Found matching user in allUsers:', matchedUser);
          imageUrl = findImageInObject(matchedUser);
        }
      }
    }
    
    console.log('Final found image URL:', imageUrl);
    
    // If we found a valid URL, use it
    if (imageUrl) {
      setUserImageUrl(imageUrl);
    }
    // Otherwise use generated avatar based on name
    else {
      const name = getDisplayName();
      const generatedAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8A2BE2&color=fff&size=128`;
      console.log('Using generated avatar:', generatedAvatar);
      setUserImageUrl(generatedAvatar);
    }
    
    // Reset image states
    setImageError(false);
  }, [user, userDetails, allUsers]);

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', userImageUrl);
    setImageError(false);
  };

  const handleImageError = () => {
    console.log('Image failed to load:', userImageUrl);
    setImageError(true);
    
    // On error, use generated avatar
    const name = getDisplayName();
    const generatedAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8A2BE2&color=fff&size=128`;
    console.log('Falling back to generated avatar:', generatedAvatar);
    setUserImageUrl(generatedAvatar);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="left-section">
          <Link to="/" className="logo-link">
            <img 
              src="/Assets/Mystical-Marketplace.svg" 
              alt="Mystical Marketplace Logo" 
              className="header-logo" 
            />
            <span className="site-name">Mystical Marketplace</span>
          </Link>
        </div>
        
        <div className="right-section">
          <nav className="nav-links">
            <Link to="/product-listing" className="nav-link">Products</Link>
          </nav>
          
          {/* Shopping Cart Icon */}
          <Link to="/cart" className="cart-icon-container">
            <svg 
              className="cart-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 576 512" 
              fill="currentColor"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
            </svg>
            {cartItems.length > 0 && (
              <span className="cart-item-count">{getCartItemsCount()}</span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="user-section">
              <span className="welcome-text">Welcome, {getDisplayName()}</span>
              <div className="user-menu-container">
                <div className="user-avatar">
                  <img 
                    src={userImageUrl} 
                    alt={`${getDisplayName()}'s avatar`}
                    className="user-avatar-img"
                    style={{ display: imageError ? 'none' : 'block' }}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                  <div 
                    className="user-avatar-fallback"
                    style={{ display: imageError ? 'flex' : 'none' }}
                  >
                    {getDisplayName().charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="user-dropdown">
                  <div className="dropdown-user-info">
                    <div className="dropdown-user-avatar">
                      <img 
                        src={userImageUrl} 
                        alt={`${getDisplayName()}'s avatar`}
                        className="dropdown-avatar-img"
                        onError={(e) => {
                          console.log('Dropdown image error');
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="dropdown-avatar-fallback">
                        {getDisplayName().charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="dropdown-user-name">
                      {getDisplayName()}
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/account" className="dropdown-item">
                    My Account
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 