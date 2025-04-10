import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as categoryAPI from '../../api/categoryAPI';

// Async thunks
export const getAllCategories = createAsyncThunk(
  'categories/getAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await categoryAPI.getAllCategories();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get categories');
    }
  }
);

export const getCategoryById = createAsyncThunk(
  'categories/getCategoryById',
  async (id, { rejectWithValue }) => {
    try {
      return await categoryAPI.getCategoryById(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get category');
    }
  }
);

export const getCategoryByName = createAsyncThunk(
  'categories/getCategoryByName',
  async (name, { rejectWithValue }) => {
    try {
      return await categoryAPI.getCategoryByName(name);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get category by name');
    }
  }
);

export const getCategoryWithProducts = createAsyncThunk(
  'categories/getCategoryWithProducts',
  async (id, { rejectWithValue }) => {
    try {
      return await categoryAPI.getCategoryWithProducts(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get category with products');
    }
  }
);

export const getAllCategoriesWithProducts = createAsyncThunk(
  'categories/getAllCategoriesWithProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await categoryAPI.getAllCategoriesWithProducts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get categories with products');
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      return await categoryAPI.createCategory(categoryData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      return await categoryAPI.updateCategory(id, categoryData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update category');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await categoryAPI.deleteCategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete category');
    }
  }
);

// New thunks for missing API methods
export const createOrUpdateCategory = createAsyncThunk(
  'categories/createOrUpdateCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      return await categoryAPI.createOrUpdateCategory(categoryData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create or update category');
    }
  }
);

export const getOrCreateCategory = createAsyncThunk(
  'categories/getOrCreateCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      return await categoryAPI.getOrCreateCategory(categoryData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get or create category');
    }
  }
);

// Initial state
const initialState = {
  categories: [],
  currentCategory: null,
  categoryWithProducts: null,
  categoriesWithProducts: [],
  loading: false,
  error: null,
};

// Slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategoryState: (state) => {
      state.error = null;
      state.loading = false;
    },
    clearCategoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Categories
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Category By ID
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Category By Name
      .addCase(getCategoryByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryByName.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload;
      })
      .addCase(getCategoryByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Category With Products
      .addCase(getCategoryWithProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryWithProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryWithProducts = action.payload;
      })
      .addCase(getCategoryWithProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get All Categories With Products
      .addCase(getAllCategoriesWithProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategoriesWithProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesWithProducts = action.payload;
      })
      .addCase(getAllCategoriesWithProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.currentCategory = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload;
        
        // Update in categories array
        const index = state.categories.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        
        // Update in categoriesWithProducts if exists
        const withProductsIndex = state.categoriesWithProducts.findIndex(
          category => category.id === action.payload.id
        );
        if (withProductsIndex !== -1) {
          // Preserve the products array
          const products = state.categoriesWithProducts[withProductsIndex].products;
          state.categoriesWithProducts[withProductsIndex] = {
            ...action.payload,
            products,
          };
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(category => category.id !== action.payload);
        state.categoriesWithProducts = state.categoriesWithProducts.filter(
          category => category.id !== action.payload
        );
        if (state.currentCategory && state.currentCategory.id === action.payload) {
          state.currentCategory = null;
        }
        if (state.categoryWithProducts && state.categoryWithProducts.id === action.payload) {
          state.categoryWithProducts = null;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create or Update Category
      .addCase(createOrUpdateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrUpdateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload;
        
        // Check if it's an update (has ID) or create
        const index = state.categories.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          // Update existing category
          state.categories[index] = action.payload;
          
          // Update in categoriesWithProducts if exists
          const withProductsIndex = state.categoriesWithProducts.findIndex(
            category => category.id === action.payload.id
          );
          if (withProductsIndex !== -1) {
            // Preserve the products array
            const products = state.categoriesWithProducts[withProductsIndex].products;
            state.categoriesWithProducts[withProductsIndex] = {
              ...action.payload,
              products,
            };
          }
        } else {
          // New category
          state.categories.push(action.payload);
        }
      })
      .addCase(createOrUpdateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get or Create Category
      .addCase(getOrCreateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrCreateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload;
        
        // Check if it already exists in our categories array
        const index = state.categories.findIndex(category => category.id === action.payload.id);
        if (index === -1) {
          // If it doesn't exist, add it
          state.categories.push(action.payload);
        } else {
          // If it exists, make sure it's up to date
          state.categories[index] = action.payload;
        }
      })
      .addCase(getOrCreateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCategoryState, clearCategoryError } = categorySlice.actions;

export default categorySlice.reducer; 