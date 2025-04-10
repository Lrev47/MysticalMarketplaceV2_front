import axiosClient from './axiosClient';

/**
 * Get all orders
 * @returns {Promise} Promise with the list of orders
 */
export const getAllOrders = async () => {
  try {
    const response = await axiosClient.get('/orders');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get order by ID
 * @param {number} id - Order ID
 * @returns {Promise} Promise with the order data
 */
export const getOrderById = async (id) => {
  try {
    const response = await axiosClient.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get orders for a user
 * @param {number} userId - User ID
 * @returns {Promise} Promise with the list of user's orders
 */
export const getUserOrders = async (userId) => {
  try {
    const response = await axiosClient.get(`/users/${userId}/orders`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get orders by status
 * @param {string} status - Order status
 * @returns {Promise} Promise with the list of orders with the specified status
 */
export const getOrdersByStatus = async (status) => {
  try {
    const response = await axiosClient.get(`/orders/status/${status}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get order with items
 * @param {number} id - Order ID
 * @returns {Promise} Promise with the order data including items
 */
export const getOrderWithItems = async (id) => {
  try {
    const response = await axiosClient.get(`/orders/${id}/items`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get order with user information
 * @param {number} id - Order ID
 * @returns {Promise} Promise with the order data including user information
 */
export const getOrderWithUser = async (id) => {
  try {
    const response = await axiosClient.get(`/orders/${id}/user`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get order with address
 * @param {number} id - Order ID
 * @returns {Promise} Promise with the order data including address
 */
export const getOrderWithAddress = async (id) => {
  try {
    const response = await axiosClient.get(`/orders/${id}/address`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get complete order with all related information
 * @param {number} id - Order ID
 * @returns {Promise} Promise with the complete order data
 */
export const getCompleteOrder = async (id) => {
  try {
    const response = await axiosClient.get(`/orders/${id}/complete`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @returns {Promise} Promise with the created order data
 */
export const createOrder = async (orderData) => {
  try {
    const response = await axiosClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new order with items
 * @param {Object} orderData - Order data including items array
 * @returns {Promise} Promise with the created order data
 */
export const createNewOrder = async (orderData) => {
  try {
    const response = await axiosClient.post('/orders/new', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update an order
 * @param {number} id - Order ID
 * @param {Object} orderData - Order data to update
 * @returns {Promise} Promise with the updated order data
 */
export const updateOrder = async (id, orderData) => {
  try {
    const response = await axiosClient.put(`/orders/${id}`, orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update order status
 * @param {number} id - Order ID
 * @param {string} status - New order status
 * @returns {Promise} Promise with the updated order data
 */
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axiosClient.patch(`/orders/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete an order
 * @param {number} id - Order ID
 * @returns {Promise} Promise with the deletion confirmation
 */
export const deleteOrder = async (id) => {
  try {
    const response = await axiosClient.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Cancel an order
 * @param {number} id - Order ID
 * @returns {Promise} Promise with the cancelled order data
 */
export const cancelOrder = async (id) => {
  try {
    const response = await axiosClient.post(`/orders/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 