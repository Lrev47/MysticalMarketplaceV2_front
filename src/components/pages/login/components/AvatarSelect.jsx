import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../../redux/slices/userSlice';
import './AvatarSelect.css';

const AvatarSelect = ({ onSelectUser }) => {
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState(null);
  const userState = useSelector((state) => state.user || {});
  const allUsers = userState.allUsers || [];
  const loading = userState.loading || false;
  const error = userState.error || fetchError;

  const fetchUsers = useCallback(async () => {
    try {
      setFetchError(null);
      await dispatch(fetchAllUsers()).unwrap();
    } catch (err) {
      console.error('Error fetching users:', err);
      setFetchError(err.message || 'Failed to fetch users');
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAvatarSelect = useCallback((user) => {
    if (onSelectUser && user) {
      // Just pass the credentials to fill the form
      onSelectUser({
        email: user.email,
        password: user.password
      });
    }
  }, [onSelectUser]);

  const handleImageError = useCallback((e) => {
    e.target.src = '/default-avatar.png';
    e.target.onerror = null;
  }, []);

  if (loading) {
    return (
      <div className="avatar-select-container">
        <h3 className="avatar-title">Choose Your Account</h3>
        <div className="avatar-loading">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="avatar-select-container">
        <h3 className="avatar-title">Choose Your Account</h3>
        <div className="avatar-error">
          Error loading users: {error}
          <button 
            onClick={fetchUsers}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="avatar-select-container">
      <h3 className="avatar-title">Choose Your Account</h3>
      
      <div className="avatar-grid">
        {allUsers.length > 0 ? (
          allUsers.map((user) => (
            <div 
              key={user?.id || Math.random()}
              className="avatar-option"
              onClick={() => handleAvatarSelect(user)}
              title={`Click to select ${user.username}`}
            >
              <div className="avatar-icon">
                <img 
                  src={user?.userImageUrl || '/default-avatar.png'}
                  alt={`${user?.username || 'User'}'s avatar`}
                  className="avatar-image"
                  onError={handleImageError}
                />
              </div>
              <div className="avatar-name">{user?.username || 'Unknown User'}</div>
            </div>
          ))
        ) : (
          <div className="no-users-message">
            <p>No users found</p>
            <button 
              onClick={fetchUsers}
              className="retry-button"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(AvatarSelect); 