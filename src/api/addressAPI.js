import axiosClient from './axiosClient';

/**
 * Get all addresses
 * @returns {Promise} Promise with the list of addresses
 */
export const getAllAddresses = async () => {
  try {
    const response = await axiosClient.get('/addresses');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get address by ID
 * @param {number} id - Address ID
 * @returns {Promise} Promise with the address data
 */
export const getAddressById = async (id) => {
  try {
    const response = await axiosClient.get(`/addresses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get addresses for a user
 * @param {number} userId - User ID
 * @returns {Promise} Promise with the list of user's addresses
 */
export const getUserAddresses = async (userId) => {
  try {
    const response = await axiosClient.get(`/users/${userId}/addresses`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get default address for a user
 * @param {number} userId - User ID
 * @returns {Promise} Promise with the user's default address
 */
export const getUserDefaultAddress = async (userId) => {
  try {
    const response = await axiosClient.get(`/users/${userId}/addresses/default`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new address
 * @param {Object} addressData - Address data
 * @returns {Promise} Promise with the created address data
 */
export const createAddress = async (addressData) => {
  try {
    const response = await axiosClient.post('/addresses', addressData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Add address to a user
 * @param {number} userId - User ID
 * @param {Object} addressData - Address data
 * @returns {Promise} Promise with the created address data
 */
export const addUserAddress = async (userId, addressData) => {
  try {
    const response = await axiosClient.post(`/users/${userId}/addresses`, addressData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update an address
 * @param {number} id - Address ID
 * @param {Object} addressData - Address data to update
 * @returns {Promise} Promise with the updated address data
 */
export const updateAddress = async (id, addressData) => {
  try {
    const response = await axiosClient.put(`/addresses/${id}`, addressData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete an address
 * @param {number} id - Address ID
 * @returns {Promise} Promise with the deletion confirmation
 */
export const deleteAddress = async (id) => {
  try {
    const response = await axiosClient.delete(`/addresses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Set an address as default for a user
 * @param {number} userId - User ID
 * @param {number} addressId - Address ID
 * @returns {Promise} Promise with the confirmation
 */
export const setDefaultAddress = async (userId, addressId) => {
  try {
    const response = await axiosClient.put(
      `/users/${userId}/addresses/${addressId}/default`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 