import axiosClient from './axiosClient';

/**
 * Get all users
 * @returns {Promise} Promise with the list of users
 */
export const getAllUsers = async () => {
  try {
    const response = await axiosClient.get('/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get user by ID
 * @param {number} id - User ID
 * @returns {Promise} Promise with the user data
 */
export const getUserById = async (id) => {
  try {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get user by username
 * @param {string} username - Username
 * @returns {Promise} Promise with the user data
 */
export const getUserByUsername = async (username) => {
  try {
    const response = await axiosClient.get(`/users/username/${username}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get user by email
 * @param {string} email - Email
 * @returns {Promise} Promise with the user data
 */
export const getUserByEmail = async (email) => {
  try {
    const response = await axiosClient.get(`/users/email/${email}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update user
 * @param {number} id - User ID
 * @param {Object} userData - User data to update
 * @returns {Promise} Promise with the updated user data
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await axiosClient.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get user with addresses
 * @param {number} id - User ID
 * @returns {Promise} Promise with the user data including addresses
 */
export const getUserWithAddresses = async (id) => {
  try {
    const response = await axiosClient.get(`/users/${id}/addresses`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get user with orders
 * @param {number} id - User ID
 * @returns {Promise} Promise with the user data including orders
 */
export const getUserWithOrders = async (id) => {
  try {
    const response = await axiosClient.get(`/users/${id}/orders`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get complete user data
 * @param {number} id - User ID
 * @returns {Promise} Promise with the complete user data
 */
export const getUserComplete = async (id) => {
  try {
    const response = await axiosClient.get(`/users/${id}/complete`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Add money to user
 * @param {number} id - User ID
 * @param {number} amount - Amount to add
 * @returns {Promise} Promise with the updated user data
 */
export const addMoneyToUser = async (id, amount) => {
  try {
    const response = await axiosClient.patch(`/users/${id}/money/add`, { amount });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Deduct money from user
 * @param {number} id - User ID
 * @param {number} amount - Amount to deduct
 * @returns {Promise} Promise with the updated user data
 */
export const deductMoneyFromUser = async (id, amount) => {
  try {
    const response = await axiosClient.patch(`/users/${id}/money/deduct`, { amount });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update user's favorite product
 * @param {number} id - User ID
 * @param {string} productId - Product ID
 * @returns {Promise} Promise with the updated user data
 */
export const updateFavoriteProduct = async (id, productId) => {
  try {
    const response = await axiosClient.patch(`/users/${id}/favorite-product`, { productId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Purchase an order
 * @param {number} id - User ID
 * @param {number} orderId - Order ID
 * @returns {Promise} Promise with the purchase confirmation
 */
export const purchaseOrder = async (id, orderId) => {
  try {
    const response = await axiosClient.post(`/users/${id}/purchase`, { orderId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 