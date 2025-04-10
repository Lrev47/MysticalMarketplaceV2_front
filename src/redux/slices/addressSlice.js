import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as addressAPI from '../../api/addressAPI';

// Async thunks
export const getAllAddresses = createAsyncThunk(
  'addresses/getAllAddresses',
  async (_, { rejectWithValue }) => {
    try {
      return await addressAPI.getAllAddresses();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get addresses');
    }
  }
);

export const getAddressById = createAsyncThunk(
  'addresses/getAddressById',
  async (id, { rejectWithValue }) => {
    try {
      return await addressAPI.getAddressById(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get address');
    }
  }
);

export const getUserAddresses = createAsyncThunk(
  'addresses/getUserAddresses',
  async (userId, { rejectWithValue }) => {
    try {
      return await addressAPI.getUserAddresses(userId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get user addresses');
    }
  }
);

export const getUserDefaultAddress = createAsyncThunk(
  'addresses/getUserDefaultAddress',
  async (userId, { rejectWithValue }) => {
    try {
      return await addressAPI.getUserDefaultAddress(userId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get user default address');
    }
  }
);

export const createAddress = createAsyncThunk(
  'addresses/createAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      return await addressAPI.createAddress(addressData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create address');
    }
  }
);

export const addUserAddress = createAsyncThunk(
  'addresses/addUserAddress',
  async ({ userId, addressData }, { rejectWithValue }) => {
    try {
      return await addressAPI.addUserAddress(userId, addressData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add user address');
    }
  }
);

export const updateAddress = createAsyncThunk(
  'addresses/updateAddress',
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      return await addressAPI.updateAddress(id, addressData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update address');
    }
  }
);

export const deleteAddress = createAsyncThunk(
  'addresses/deleteAddress',
  async (id, { rejectWithValue }) => {
    try {
      await addressAPI.deleteAddress(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete address');
    }
  }
);

export const setDefaultAddress = createAsyncThunk(
  'addresses/setDefaultAddress',
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await addressAPI.setDefaultAddress(userId, addressId);
      return { addressId, userId, response };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to set default address');
    }
  }
);

// Initial state
const initialState = {
  addresses: [],
  currentAddress: null,
  userAddresses: {},
  userDefaultAddress: {},
  loading: false,
  error: null,
};

// Slice
const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    resetAddressState: (state) => {
      state.error = null;
      state.loading = false;
    },
    clearAddressError: (state) => {
      state.error = null;
    },
    clearCurrentAddress: (state) => {
      state.currentAddress = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Addresses
      .addCase(getAllAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Address By ID
      .addCase(getAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAddress = action.payload;
      })
      .addCase(getAddressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User Addresses
      .addCase(getUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        // Store by user ID for easier access
        const userId = action.meta.arg; // The userId that was passed to the thunk
        state.userAddresses[userId] = action.payload;
      })
      .addCase(getUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User Default Address
      .addCase(getUserDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        // Store by user ID for easier access
        const userId = action.meta.arg; // The userId that was passed to the thunk
        state.userDefaultAddress[userId] = action.payload;
      })
      .addCase(getUserDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Address
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
        state.currentAddress = action.payload;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add User Address
      .addCase(addUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
        state.currentAddress = action.payload;
        
        // Update userAddresses if it exists
        const userId = action.meta.arg.userId;
        if (state.userAddresses[userId]) {
          state.userAddresses[userId].push(action.payload);
        }
        
        // Update userDefaultAddress if this is a default address
        if (action.payload.isDefault) {
          state.userDefaultAddress[userId] = action.payload;
        }
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAddress = action.payload;
        
        // Update in addresses array
        const index = state.addresses.findIndex(address => address.id === action.payload.id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
        
        // Update in userAddresses if exists
        const userId = action.payload.userId;
        if (state.userAddresses[userId]) {
          const userAddressIndex = state.userAddresses[userId].findIndex(
            address => address.id === action.payload.id
          );
          if (userAddressIndex !== -1) {
            state.userAddresses[userId][userAddressIndex] = action.payload;
          }
        }
        
        // Update userDefaultAddress if this is a default address or if the existing default address is being updated
        if (action.payload.isDefault) {
          state.userDefaultAddress[userId] = action.payload;
        } else if (
          state.userDefaultAddress[userId] && 
          state.userDefaultAddress[userId].id === action.payload.id
        ) {
          // If this was the default address but isDefault is now false, remove it from userDefaultAddress
          delete state.userDefaultAddress[userId];
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        const addressId = action.payload;
        
        // Find the address to get the userId before removing it
        const address = state.addresses.find(addr => addr.id === addressId);
        const userId = address?.userId;
        
        // Remove from addresses array
        state.addresses = state.addresses.filter(address => address.id !== addressId);
        
        // Clear current address if it's the same
        if (state.currentAddress && state.currentAddress.id === addressId) {
          state.currentAddress = null;
        }
        
        // Remove from userAddresses if exists
        if (userId && state.userAddresses[userId]) {
          state.userAddresses[userId] = state.userAddresses[userId].filter(
            address => address.id !== addressId
          );
        }
        
        // Clear userDefaultAddress if it's the same
        if (
          userId && 
          state.userDefaultAddress[userId] && 
          state.userDefaultAddress[userId].id === addressId
        ) {
          delete state.userDefaultAddress[userId];
        }
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Set Default Address
      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        const { addressId, userId } = action.payload;
        
        // Find the address in our state
        const address = state.addresses.find(addr => addr.id === addressId);
        if (address) {
          // Update the address to be default
          address.isDefault = true;
          
          // Update userDefaultAddress
          state.userDefaultAddress[userId] = address;
          
          // Update all other addresses for this user to not be default
          state.addresses = state.addresses.map(addr => {
            if (addr.userId === userId && addr.id !== addressId) {
              return { ...addr, isDefault: false };
            }
            return addr;
          });
          
          // Update in userAddresses if exists
          if (state.userAddresses[userId]) {
            state.userAddresses[userId] = state.userAddresses[userId].map(addr => {
              if (addr.id === addressId) {
                return { ...addr, isDefault: true };
              } else {
                return { ...addr, isDefault: false };
              }
            });
          }
        }
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAddressState, clearAddressError, clearCurrentAddress } = addressSlice.actions;

export default addressSlice.reducer; 