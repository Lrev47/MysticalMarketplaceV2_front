import axiosClient from './axiosClient';

/**
 * Register a new user
 * @param {Object} userData - User data containing firstName, lastName, username, email, password, userImageUrl(optional)
 * @returns {Promise} Promise with the user data and token
 */
export const register = async (userData) => {
  try {
    const response = await axiosClient.post('/auth/register', userData);
    
    // Save token to localStorage
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Login a user
 * @param {Object} credentials - Object containing usernameOrEmail and password
 * @returns {Promise} Promise with the user data and token
 */
export const login = async (credentials) => {
  try {
    const response = await axiosClient.post('/auth/login', credentials);
    
    // Save token to localStorage
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Logout the current user
 * @returns {Promise} Promise with the logout confirmation
 */
export const logout = async () => {
  try {
    const response = await axiosClient.post('/auth/logout', {});
    
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get the current user's profile
 * @returns {Promise} Promise with the user profile data
 */
export const getProfile = async () => {
  try {
    const response = await axiosClient.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Refresh the access token
 * @returns {Promise} Promise with the new access token
 */
export const refreshToken = async () => {
  try {
    const response = await axiosClient.post('/auth/refresh-token', {});
    
    // Save the new token
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 