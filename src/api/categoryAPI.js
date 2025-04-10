import axiosClient from './axiosClient';

/**
 * Get all categories
 * @returns {Promise} Promise with the list of categories
 */
export const getAllCategories = async () => {
  try {
    const response = await axiosClient.get('/categories');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get category by ID
 * @param {number} id - Category ID
 * @returns {Promise} Promise with the category data
 */
export const getCategoryById = async (id) => {
  try {
    const response = await axiosClient.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get category by name
 * @param {string} name - Category name
 * @returns {Promise} Promise with the category data
 */
export const getCategoryByName = async (name) => {
  try {
    const response = await axiosClient.get(`/categories/name/${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get category with products
 * @param {number} id - Category ID
 * @returns {Promise} Promise with the category data including products
 */
export const getCategoryWithProducts = async (id) => {
  try {
    const response = await axiosClient.get(`/categories/${id}/products`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get all categories with products
 * @returns {Promise} Promise with all categories including their products
 */
export const getAllCategoriesWithProducts = async () => {
  try {
    const response = await axiosClient.get('/categories/with-products');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new category
 * @param {Object} categoryData - Category data (name, description, imageUrl)
 * @returns {Promise} Promise with the created category data
 */
export const createCategory = async (categoryData) => {
  try {
    const response = await axiosClient.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update a category
 * @param {number} id - Category ID
 * @param {Object} categoryData - Category data to update
 * @returns {Promise} Promise with the updated category data
 */
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axiosClient.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete a category
 * @param {number} id - Category ID
 * @returns {Promise} Promise with the deletion confirmation
 */
export const deleteCategory = async (id) => {
  try {
    const response = await axiosClient.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create or update a category
 * @param {Object} categoryData - Category data
 * @returns {Promise} Promise with the created or updated category data
 */
export const createOrUpdateCategory = async (categoryData) => {
  try {
    const response = await axiosClient.post('/categories/upsert', categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get or create a category
 * @param {Object} categoryData - Category data
 * @returns {Promise} Promise with the retrieved or created category data
 */
export const getOrCreateCategory = async (categoryData) => {
  try {
    const response = await axiosClient.post('/categories/get-or-create', categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 