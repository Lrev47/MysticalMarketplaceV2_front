import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userAPI from '../../api/userAPI';

// Async thunks
export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await userAPI.getAllUsers();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get users');
    }
  }
);

export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (id, { rejectWithValue }) => {
    try {
      return await userAPI.getUserById(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get user');
    }
  }
);

export const getUserByUsername = createAsyncThunk(
  'users/getUserByUsername',
  async (username, { rejectWithValue }) => {
    try {
      return await userAPI.getUserByUsername(username);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get user by username');
    }
  }
);

// New thunk for missing API method
export const getUserByEmail = createAsyncThunk(
  'users/getUserByEmail',
  async (email, { rejectWithValue }) => {
    try {
      return await userAPI.getUserByEmail(email);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get user by email');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      return await userAPI.updateUser(id, userData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update user');
    }
  }
);

export const getUserWithAddresses = createAsyncThunk(
  'users/getUserWithAddresses',
  async (id, { rejectWithValue }) => {
    try {
      return await userAPI.getUserWithAddresses(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get user with addresses');
    }
  }
);

export const getUserWithOrders = createAsyncThunk(
  'users/getUserWithOrders',
  async (id, { rejectWithValue }) => {
    try {
      return await userAPI.getUserWithOrders(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get user with orders');
    }
  }
);

// New thunk for missing API method
export const getUserComplete = createAsyncThunk(
  'users/getUserComplete',
  async (id, { rejectWithValue }) => {
    try {
      return await userAPI.getUserComplete(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get complete user data');
    }
  }
);

export const addMoneyToUser = createAsyncThunk(
  'users/addMoneyToUser',
  async ({ id, amount }, { rejectWithValue }) => {
    try {
      return await userAPI.addMoneyToUser(id, amount);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add money');
    }
  }
);

export const deductMoneyFromUser = createAsyncThunk(
  'users/deductMoneyFromUser',
  async ({ id, amount }, { rejectWithValue }) => {
    try {
      return await userAPI.deductMoneyFromUser(id, amount);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to deduct money');
    }
  }
);

export const updateFavoriteProduct = createAsyncThunk(
  'users/updateFavoriteProduct',
  async ({ id, productId }, { rejectWithValue }) => {
    try {
      return await userAPI.updateFavoriteProduct(id, productId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update favorite product');
    }
  }
);

export const purchaseOrder = createAsyncThunk(
  'users/purchaseOrder',
  async ({ id, orderId }, { rejectWithValue }) => {
    try {
      return await userAPI.purchaseOrder(id, orderId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to purchase order');
    }
  }
);

// Initial state
const initialState = {
  users: [],
  currentUser: null,
  userWithAddresses: null,
  userWithOrders: null,
  userComplete: null, // Added to store complete user data
  loading: false,
  error: null,
};

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.error = null;
      state.loading = false;
    },
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User By ID
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User By Username
      .addCase(getUserByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User By Email
      .addCase(getUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        
        // Update in users array if exists
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        
        // Update userWithAddresses if it's the same user
        if (state.userWithAddresses && state.userWithAddresses.id === action.payload.id) {
          // Preserve the addresses
          const addresses = state.userWithAddresses.addresses || [];
          state.userWithAddresses = {
            ...action.payload,
            addresses,
          };
        }
        
        // Update userWithOrders if it's the same user
        if (state.userWithOrders && state.userWithOrders.id === action.payload.id) {
          // Preserve the orders
          const orders = state.userWithOrders.orders || [];
          state.userWithOrders = {
            ...action.payload,
            orders,
          };
        }
        
        // Update userComplete if it's the same user
        if (state.userComplete && state.userComplete.id === action.payload.id) {
          // Preserve all the related data
          state.userComplete = {
            ...state.userComplete,
            ...action.payload,
          };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User With Addresses
      .addCase(getUserWithAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWithAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.userWithAddresses = action.payload;
      })
      .addCase(getUserWithAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User With Orders
      .addCase(getUserWithOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWithOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userWithOrders = action.payload;
      })
      .addCase(getUserWithOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User Complete
      .addCase(getUserComplete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserComplete.fulfilled, (state, action) => {
        state.loading = false;
        state.userComplete = action.payload;
      })
      .addCase(getUserComplete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Money To User
      .addCase(addMoneyToUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMoneyToUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        
        // Update in users array if exists
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        
        // Update other user objects if needed
        if (state.userWithAddresses && state.userWithAddresses.id === action.payload.id) {
          state.userWithAddresses = {
            ...state.userWithAddresses,
            ...action.payload,
          };
        }
        
        if (state.userWithOrders && state.userWithOrders.id === action.payload.id) {
          state.userWithOrders = {
            ...state.userWithOrders,
            ...action.payload,
          };
        }
        
        if (state.userComplete && state.userComplete.id === action.payload.id) {
          state.userComplete = {
            ...state.userComplete,
            ...action.payload,
          };
        }
      })
      .addCase(addMoneyToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Deduct Money From User
      .addCase(deductMoneyFromUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deductMoneyFromUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        
        // Update in users array if exists
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        
        // Update other user objects if needed
        if (state.userWithAddresses && state.userWithAddresses.id === action.payload.id) {
          state.userWithAddresses = {
            ...state.userWithAddresses,
            ...action.payload,
          };
        }
        
        if (state.userWithOrders && state.userWithOrders.id === action.payload.id) {
          state.userWithOrders = {
            ...state.userWithOrders,
            ...action.payload,
          };
        }
        
        if (state.userComplete && state.userComplete.id === action.payload.id) {
          state.userComplete = {
            ...state.userComplete,
            ...action.payload,
          };
        }
      })
      .addCase(deductMoneyFromUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Favorite Product
      .addCase(updateFavoriteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFavoriteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        
        // Update in users array if exists
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        
        // Update other user objects if needed
        if (state.userWithAddresses && state.userWithAddresses.id === action.payload.id) {
          state.userWithAddresses = {
            ...state.userWithAddresses,
            ...action.payload,
          };
        }
        
        if (state.userWithOrders && state.userWithOrders.id === action.payload.id) {
          state.userWithOrders = {
            ...state.userWithOrders,
            ...action.payload,
          };
        }
        
        if (state.userComplete && state.userComplete.id === action.payload.id) {
          state.userComplete = {
            ...state.userComplete,
            ...action.payload,
          };
        }
      })
      .addCase(updateFavoriteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Purchase Order
      .addCase(purchaseOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(purchaseOrder.fulfilled, (state, action) => {
        state.loading = false;
        // The backend might return updated user info
        if (action.payload.user) {
          state.currentUser = action.payload.user;
          
          // Update in users array if exists
          const index = state.users.findIndex(user => user.id === action.payload.user.id);
          if (index !== -1) {
            state.users[index] = action.payload.user;
          }
          
          // Update other user objects if needed
          if (state.userWithAddresses && state.userWithAddresses.id === action.payload.user.id) {
            // Preserve addresses
            const addresses = state.userWithAddresses.addresses || [];
            state.userWithAddresses = {
              ...action.payload.user,
              addresses,
            };
          }
          
          if (state.userWithOrders && state.userWithOrders.id === action.payload.user.id) {
            // Update orders if returned, otherwise preserve existing
            const orders = action.payload.orders || state.userWithOrders.orders || [];
            state.userWithOrders = {
              ...action.payload.user,
              orders,
            };
          }
          
          if (state.userComplete && state.userComplete.id === action.payload.user.id) {
            state.userComplete = {
              ...state.userComplete,
              ...action.payload.user,
            };
          }
        }
      })
      .addCase(purchaseOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserState, clearUserError } = userSlice.actions;

export default userSlice.reducer; 