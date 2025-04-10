import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productAPI from '../../api/productAPI';

// Async thunks
export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await productAPI.getAllProducts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get products');
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id, { rejectWithValue }) => {
    try {
      return await productAPI.getProductById(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get product');
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  'products/getProductsByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      return await productAPI.getProductsByCategory(categoryId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get products by category');
    }
  }
);

export const getProductsInStock = createAsyncThunk(
  'products/getProductsInStock',
  async (_, { rejectWithValue }) => {
    try {
      return await productAPI.getProductsInStock();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get in-stock products');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (term, { rejectWithValue }) => {
    try {
      return await productAPI.searchProducts(term);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to search products');
    }
  }
);

export const getProductsByPriceRange = createAsyncThunk(
  'products/getProductsByPriceRange',
  async ({ minPrice, maxPrice }, { rejectWithValue }) => {
    try {
      return await productAPI.getProductsByPriceRange(minPrice, maxPrice);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get products by price range');
    }
  }
);

export const getFeaturedProducts = createAsyncThunk(
  'products/getFeaturedProducts',
  async (limit, { rejectWithValue }) => {
    try {
      return await productAPI.getFeaturedProducts(limit);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get featured products');
    }
  }
);

export const getDiscountedProducts = createAsyncThunk(
  'products/getDiscountedProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await productAPI.getDiscountedProducts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get discounted products');
    }
  }
);

// New thunk for missing API method
export const getProductWithCategory = createAsyncThunk(
  'products/getProductWithCategory',
  async (id, { rejectWithValue }) => {
    try {
      return await productAPI.getProductWithCategory(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get product with category');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      return await productAPI.createProduct(productData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create product');
    }
  }
);

// New thunk for missing API method
export const createProductWithCategory = createAsyncThunk(
  'products/createProductWithCategory',
  async (productData, { rejectWithValue }) => {
    try {
      return await productAPI.createProductWithCategory(productData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create product with category');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      return await productAPI.updateProduct(id, productData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await productAPI.deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete product');
    }
  }
);

export const updateProductStock = createAsyncThunk(
  'products/updateProductStock',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      return await productAPI.updateProductStock(id, quantity);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update product stock');
    }
  }
);

export const applyDiscount = createAsyncThunk(
  'products/applyDiscount',
  async ({ id, discountPercentage }, { rejectWithValue }) => {
    try {
      return await productAPI.applyDiscount(id, discountPercentage);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to apply discount');
    }
  }
);

// New thunk for missing API method
export const restockProduct = createAsyncThunk(
  'products/restockProduct',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      return await productAPI.restockProduct(id, quantity);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to restock product');
    }
  }
);

// Initial state
const initialState = {
  products: [],
  currentProduct: null,
  productWithCategory: null, // Added to store product with its category
  filteredProducts: [],
  featuredProducts: [],
  discountedProducts: [],
  loading: false,
  error: null,
  searchTerm: '',
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    inStock: false,
  },
};

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.error = null;
      state.loading = false;
    },
    clearProductError: (state) => {
      state.error = null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.filters.minPrice = action.payload.minPrice;
      state.filters.maxPrice = action.payload.maxPrice;
    },
    setInStockFilter: (state, action) => {
      state.filters.inStock = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        minPrice: null,
        maxPrice: null,
        inStock: false,
      };
      state.filteredProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Product By ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Product With Category
      .addCase(getProductWithCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductWithCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.productWithCategory = action.payload;
      })
      .addCase(getProductWithCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Products By Category
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Products In Stock
      .addCase(getProductsInStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsInStock.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(getProductsInStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Products By Price Range
      .addCase(getProductsByPriceRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByPriceRange.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(getProductsByPriceRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Featured Products
      .addCase(getFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Discounted Products
      .addCase(getDiscountedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDiscountedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.discountedProducts = action.payload;
      })
      .addCase(getDiscountedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.currentProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Product With Category
      .addCase(createProductWithCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductWithCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.currentProduct = action.payload;
        state.productWithCategory = action.payload; // Since this comes with category info
      })
      .addCase(createProductWithCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
        
        // Update in products array
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        
        // Update in filtered products if exists
        const filterIndex = state.filteredProducts.findIndex(product => product.id === action.payload.id);
        if (filterIndex !== -1) {
          state.filteredProducts[filterIndex] = action.payload;
        }
        
        // Update productWithCategory if it's the same product
        if (state.productWithCategory && state.productWithCategory.id === action.payload.id) {
          // Preserve the category information
          const category = state.productWithCategory.category;
          state.productWithCategory = {
            ...action.payload,
            category,
          };
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(product => product.id !== action.payload);
        state.filteredProducts = state.filteredProducts.filter(product => product.id !== action.payload);
        if (state.currentProduct && state.currentProduct.id === action.payload) {
          state.currentProduct = null;
        }
        if (state.productWithCategory && state.productWithCategory.id === action.payload) {
          state.productWithCategory = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Product Stock
      .addCase(updateProductStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        state.loading = false;
        
        // Update in products array
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        
        // Update in filtered products if exists
        const filterIndex = state.filteredProducts.findIndex(product => product.id === action.payload.id);
        if (filterIndex !== -1) {
          state.filteredProducts[filterIndex] = action.payload;
        }
        
        // Update current product if it's the same
        if (state.currentProduct && state.currentProduct.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
        
        // Update productWithCategory if it's the same product
        if (state.productWithCategory && state.productWithCategory.id === action.payload.id) {
          // Preserve the category information
          const category = state.productWithCategory.category;
          state.productWithCategory = {
            ...action.payload,
            category,
          };
        }
      })
      .addCase(updateProductStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Restock Product
      .addCase(restockProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restockProduct.fulfilled, (state, action) => {
        state.loading = false;
        
        // Update in products array
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        
        // Update in filtered products if exists
        const filterIndex = state.filteredProducts.findIndex(product => product.id === action.payload.id);
        if (filterIndex !== -1) {
          state.filteredProducts[filterIndex] = action.payload;
        }
        
        // Update current product if it's the same
        if (state.currentProduct && state.currentProduct.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
        
        // Update productWithCategory if it's the same product
        if (state.productWithCategory && state.productWithCategory.id === action.payload.id) {
          // Preserve the category information
          const category = state.productWithCategory.category;
          state.productWithCategory = {
            ...action.payload,
            category,
          };
        }
      })
      .addCase(restockProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Apply Discount
      .addCase(applyDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyDiscount.fulfilled, (state, action) => {
        state.loading = false;
        
        // Update in products array
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        
        // Update in filtered products if exists
        const filterIndex = state.filteredProducts.findIndex(product => product.id === action.payload.id);
        if (filterIndex !== -1) {
          state.filteredProducts[filterIndex] = action.payload;
        }
        
        // Update current product if it's the same
        if (state.currentProduct && state.currentProduct.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
        
        // Update productWithCategory if it's the same product
        if (state.productWithCategory && state.productWithCategory.id === action.payload.id) {
          // Preserve the category information
          const category = state.productWithCategory.category;
          state.productWithCategory = {
            ...action.payload,
            category,
          };
        }
      })
      .addCase(applyDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  resetProductState, 
  clearProductError, 
  setSearchTerm, 
  setCategoryFilter, 
  setPriceFilter, 
  setInStockFilter, 
  clearFilters 
} = productSlice.actions;

export default productSlice.reducer; 