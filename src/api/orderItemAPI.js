import axiosClient from './axiosClient';

/**
 * Get all order items
 * @returns {Promise} Promise with the list of order items
 */
export const getAllOrderItems = async () => {
  try {
    const response = await axiosClient.get('/order-items');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get order item by ID
 * @param {number} id - Order item ID
 * @returns {Promise} Promise with the order item data
 */
export const getOrderItemById = async (id) => {
  try {
    const response = await axiosClient.get(`/order-items/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get order items by order ID
 * @param {number} orderId - Order ID
 * @returns {Promise} Promise with the list of order items for the order
 */
export const getOrderItemsByOrderId = async (orderId) => {
  try {
    const response = await axiosClient.get(`/order-items/orders/${orderId}/items`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get order items by product ID
 * @param {number} productId - Product ID
 * @returns {Promise} Promise with the list of order items for the product
 */
export const getOrderItemsByProductId = async (productId) => {
  try {
    const response = await axiosClient.get(`/order-items/products/${productId}/order-items`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get order item with product details
 * @param {number} id - Order item ID
 * @returns {Promise} Promise with the order item data including product details
 */
export const getOrderItemWithProduct = async (id) => {
  try {
    const response = await axiosClient.get(`/order-items/${id}/product`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get order item with order details
 * @param {number} id - Order item ID
 * @returns {Promise} Promise with the order item data including order details
 */
export const getOrderItemWithOrder = async (id) => {
  try {
    const response = await axiosClient.get(`/order-items/${id}/order`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get order items by order ID with product details
 * @param {number} orderId - Order ID
 * @returns {Promise} Promise with the list of order items with product details
 */
export const getOrderItemsByOrderIdWithProducts = async (orderId) => {
  try {
    const response = await axiosClient.get(`/order-items/orders/${orderId}/items/with-products`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new order item
 * @param {Object} orderItemData - Order item data
 * @returns {Promise} Promise with the created order item data
 */
export const createOrderItem = async (orderItemData) => {
  try {
    const response = await axiosClient.post('/order-items', orderItemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create multiple order items
 * @param {Array} items - Array of order item data
 * @returns {Promise} Promise with the creation confirmation
 */
export const createOrderItems = async (items) => {
  try {
    const response = await axiosClient.post('/order-items/bulk', { items });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update an order item
 * @param {number} id - Order item ID
 * @param {Object} orderItemData - Order item data to update
 * @returns {Promise} Promise with the updated order item data
 */
export const updateOrderItem = async (id, orderItemData) => {
  try {
    const response = await axiosClient.put(`/order-items/${id}`, orderItemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete an order item
 * @param {number} id - Order item ID
 * @returns {Promise} Promise with the deletion confirmation
 */
export const deleteOrderItem = async (id) => {
  try {
    const response = await axiosClient.delete(`/order-items/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete all order items for an order
 * @param {number} orderId - Order ID
 * @returns {Promise} Promise with the deletion confirmation
 */
export const deleteOrderItemsByOrderId = async (orderId) => {
  try {
    const response = await axiosClient.delete(`/orders/${orderId}/items`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Calculate order total
 * @param {number} orderId - Order ID
 * @returns {Promise} Promise with the order total
 */
export const calculateOrderTotal = async (orderId) => {
  try {
    const response = await axiosClient.get(`/orders/${orderId}/total`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Add a product to an order
 * @param {number} orderId - Order ID
 * @param {Object} productData - Product data (productId, quantity, price)
 * @returns {Promise} Promise with the created order item data
 */
export const addProductToOrder = async (orderId, productData) => {
  try {
    const response = await axiosClient.post(`/orders/${orderId}/items`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 