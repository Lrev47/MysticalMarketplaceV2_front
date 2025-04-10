import axiosClient from './axiosClient';

/**
 * Get all products
 * @returns {Promise} Promise with the list of products
 */
export const getAllProducts = async () => {
  try {
    const response = await axiosClient.get('/products');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get product by ID
 * @param {number} id - Product ID
 * @returns {Promise} Promise with the product data
 */
export const getProductById = async (id) => {
  try {
    const response = await axiosClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get products by category
 * @param {number} categoryId - Category ID
 * @returns {Promise} Promise with the list of products
 */
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axiosClient.get(`/products/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get products in stock
 * @returns {Promise} Promise with the list of in-stock products
 */
export const getProductsInStock = async () => {
  try {
    const response = await axiosClient.get('/products/filter/in-stock');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Search products
 * @param {string} term - Search term
 * @returns {Promise} Promise with the list of products matching the search
 */
export const searchProducts = async (term) => {
  try {
    const response = await axiosClient.get(`/products/search?term=${encodeURIComponent(term)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Filter products by price range
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Promise} Promise with the list of products in the price range
 */
export const getProductsByPriceRange = async (minPrice, maxPrice) => {
  try {
    const response = await axiosClient.get(`/products/filter/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get featured products
 * @param {number} limit - Optional limit of products to return
 * @returns {Promise} Promise with the list of featured products
 */
export const getFeaturedProducts = async (limit) => {
  try {
    const url = limit ? `/products/filter/featured?limit=${limit}` : '/products/filter/featured';
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get discounted products
 * @returns {Promise} Promise with the list of discounted products
 */
export const getDiscountedProducts = async () => {
  try {
    const response = await axiosClient.get('/products/filter/discounted');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get product with category
 * @param {number} id - Product ID
 * @returns {Promise} Promise with the product data including category
 */
export const getProductWithCategory = async (id) => {
  try {
    const response = await axiosClient.get(`/products/${id}/category`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a new product
 * @param {Object} productData - Product data
 * @returns {Promise} Promise with the created product data
 */
export const createProduct = async (productData) => {
  try {
    const response = await axiosClient.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create a product with a category
 * @param {Object} productData - Product data including categoryName
 * @returns {Promise} Promise with the created product data
 */
export const createProductWithCategory = async (productData) => {
  try {
    const response = await axiosClient.post('/products/with-category', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update a product
 * @param {number} id - Product ID
 * @param {Object} productData - Product data to update
 * @returns {Promise} Promise with the updated product data
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosClient.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete a product
 * @param {number} id - Product ID
 * @returns {Promise} Promise with the deletion confirmation
 */
export const deleteProduct = async (id) => {
  try {
    const response = await axiosClient.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update product stock
 * @param {number} id - Product ID
 * @param {number} quantity - New quantity
 * @returns {Promise} Promise with the updated product data
 */
export const updateProductStock = async (id, quantity) => {
  try {
    const response = await axiosClient.patch(`/products/${id}/stock`, { quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Apply discount to a product
 * @param {number} id - Product ID
 * @param {number} discountPercentage - Discount percentage (0-100)
 * @returns {Promise} Promise with the updated product data
 */
export const applyDiscount = async (id, discountPercentage) => {
  try {
    const response = await axiosClient.patch(`/products/${id}/discount`, { discountPercentage });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Restock a product
 * @param {number} id - Product ID
 * @param {number} quantity - Quantity to add
 * @returns {Promise} Promise with the updated product data
 */
export const restockProduct = async (id, quantity) => {
  try {
    const response = await axiosClient.patch(`/products/${id}/restock`, { quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 