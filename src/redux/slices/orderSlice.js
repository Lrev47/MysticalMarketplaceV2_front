import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as orderAPI from '../../api/orderAPI';

// Async thunks
export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await orderAPI.getAllOrders();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get orders');
    }
  }
);

export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (id, { rejectWithValue }) => {
    try {
      return await orderAPI.getOrderById(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get order');
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (userId, { rejectWithValue }) => {
    try {
      return await orderAPI.getUserOrders(userId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get user orders');
    }
  }
);

export const getOrdersByStatus = createAsyncThunk(
  'orders/getOrdersByStatus',
  async (status, { rejectWithValue }) => {
    try {
      return await orderAPI.getOrdersByStatus(status);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get orders by status');
    }
  }
);

export const getOrderWithItems = createAsyncThunk(
  'orders/getOrderWithItems',
  async (id, { rejectWithValue }) => {
    try {
      return await orderAPI.getOrderWithItems(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get order with items');
    }
  }
);

// New thunks for missing API methods
export const getOrderWithUser = createAsyncThunk(
  'orders/getOrderWithUser',
  async (id, { rejectWithValue }) => {
    try {
      return await orderAPI.getOrderWithUser(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get order with user');
    }
  }
);

export const getOrderWithAddress = createAsyncThunk(
  'orders/getOrderWithAddress',
  async (id, { rejectWithValue }) => {
    try {
      return await orderAPI.getOrderWithAddress(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get order with address');
    }
  }
);

export const getCompleteOrder = createAsyncThunk(
  'orders/getCompleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      return await orderAPI.getCompleteOrder(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get complete order');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      return await orderAPI.createOrder(orderData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create order');
    }
  }
);

export const createNewOrder = createAsyncThunk(
  'orders/createNewOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      return await orderAPI.createNewOrder(orderData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create new order');
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, orderData }, { rejectWithValue }) => {
    try {
      return await orderAPI.updateOrder(id, orderData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update order');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await orderAPI.updateOrderStatus(id, status);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update order status');
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      await orderAPI.deleteOrder(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete order');
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (id, { rejectWithValue }) => {
    try {
      return await orderAPI.cancelOrder(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to cancel order');
    }
  }
);

// Initial state
const initialState = {
  orders: [],
  userOrders: [],
  currentOrder: null,
  orderWithItems: null,
  orderWithUser: null,  // Added to store order with user information
  orderWithAddress: null, // Added to store order with address information
  completeOrder: null,
  ordersByStatus: [],
  loading: false,
  error: null,
};

// Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.error = null;
      state.loading = false;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.orderWithItems = null;
      state.orderWithUser = null;  // Clear the order with user
      state.orderWithAddress = null; // Clear the order with address
      state.completeOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User Orders
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Orders By Status
      .addCase(getOrdersByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersByStatus = action.payload;
      })
      .addCase(getOrdersByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Order With Items
      .addCase(getOrderWithItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderWithItems.fulfilled, (state, action) => {
        state.loading = false;
        state.orderWithItems = action.payload;
      })
      .addCase(getOrderWithItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Order With User
      .addCase(getOrderWithUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderWithUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orderWithUser = action.payload;
      })
      .addCase(getOrderWithUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Order With Address
      .addCase(getOrderWithAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderWithAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.orderWithAddress = action.payload;
      })
      .addCase(getOrderWithAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Complete Order
      .addCase(getCompleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.completeOrder = action.payload;
      })
      .addCase(getCompleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
        
        // Update userOrders if it matches the user ID
        if (action.payload.userId && state.userOrders.length > 0) {
          const firstOrder = state.userOrders[0];
          if (firstOrder && firstOrder.userId === action.payload.userId) {
            state.userOrders.push(action.payload);
          }
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create New Order
      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
        state.orderWithItems = action.payload; // This likely includes items
        
        // Update userOrders if it matches the user ID
        if (action.payload.userId && state.userOrders.length > 0) {
          const firstOrder = state.userOrders[0];
          if (firstOrder && firstOrder.userId === action.payload.userId) {
            state.userOrders.push(action.payload);
          }
        }
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        
        // Update in orders array
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        
        // Update in userOrders if exists
        const userOrderIndex = state.userOrders.findIndex(order => order.id === action.payload.id);
        if (userOrderIndex !== -1) {
          state.userOrders[userOrderIndex] = action.payload;
        }
        
        // Update ordersByStatus if exists
        const statusIndex = state.ordersByStatus.findIndex(order => order.id === action.payload.id);
        if (statusIndex !== -1) {
          state.ordersByStatus[statusIndex] = action.payload;
        }
        
        // Update orderWithItems if it's the same order
        if (state.orderWithItems && state.orderWithItems.id === action.payload.id) {
          // Preserve the items array
          const items = state.orderWithItems.orderItems || [];
          state.orderWithItems = {
            ...action.payload,
            orderItems: items,
          };
        }
        
        // Update orderWithUser if it's the same order
        if (state.orderWithUser && state.orderWithUser.id === action.payload.id) {
          // Preserve the user information
          const user = state.orderWithUser.user;
          state.orderWithUser = {
            ...action.payload,
            user,
          };
        }
        
        // Update orderWithAddress if it's the same order
        if (state.orderWithAddress && state.orderWithAddress.id === action.payload.id) {
          // Preserve the address information
          const address = state.orderWithAddress.address || state.orderWithAddress.shippingAddress;
          state.orderWithAddress = {
            ...action.payload,
            address: address,
          };
        }
        
        // Update completeOrder if it's the same order
        if (state.completeOrder && state.completeOrder.id === action.payload.id) {
          // Preserve all the related data
          state.completeOrder = {
            ...state.completeOrder,
            ...action.payload,
          };
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        
        // Similar updates as updateOrder
        // Update in orders array
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        
        // Update in userOrders if exists
        const userOrderIndex = state.userOrders.findIndex(order => order.id === action.payload.id);
        if (userOrderIndex !== -1) {
          state.userOrders[userOrderIndex] = action.payload;
        }
        
        // Update ordersByStatus - need to remove if status changed
        state.ordersByStatus = state.ordersByStatus.filter(order => {
          return order.id !== action.payload.id || order.status === action.payload.status;
        });
        
        // Update current order if it's the same one
        if (state.currentOrder && state.currentOrder.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
        
        // Update orderWithItems if it's the same order
        if (state.orderWithItems && state.orderWithItems.id === action.payload.id) {
          // Preserve the items array
          const items = state.orderWithItems.orderItems || [];
          state.orderWithItems = {
            ...action.payload,
            orderItems: items,
          };
        }
        
        // Update orderWithUser if it's the same order
        if (state.orderWithUser && state.orderWithUser.id === action.payload.id) {
          // Preserve the user information
          const user = state.orderWithUser.user;
          state.orderWithUser = {
            ...action.payload,
            user,
          };
        }
        
        // Update orderWithAddress if it's the same order
        if (state.orderWithAddress && state.orderWithAddress.id === action.payload.id) {
          // Preserve the address information
          const address = state.orderWithAddress.address || state.orderWithAddress.shippingAddress;
          state.orderWithAddress = {
            ...action.payload,
            address: address,
          };
        }
        
        // Update completeOrder if it's the same order
        if (state.completeOrder && state.completeOrder.id === action.payload.id) {
          // Preserve all the related data
          state.completeOrder = {
            ...state.completeOrder,
            ...action.payload,
          };
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order.id !== action.payload);
        state.userOrders = state.userOrders.filter(order => order.id !== action.payload);
        state.ordersByStatus = state.ordersByStatus.filter(order => order.id !== action.payload);
        
        if (state.currentOrder && state.currentOrder.id === action.payload) {
          state.currentOrder = null;
        }
        if (state.orderWithItems && state.orderWithItems.id === action.payload) {
          state.orderWithItems = null;
        }
        if (state.orderWithUser && state.orderWithUser.id === action.payload) {
          state.orderWithUser = null;
        }
        if (state.orderWithAddress && state.orderWithAddress.id === action.payload) {
          state.orderWithAddress = null;
        }
        if (state.completeOrder && state.completeOrder.id === action.payload) {
          state.completeOrder = null;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Similar to updateOrderStatus, as it changes the status to 'cancelled'
        
        // Update in orders array
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        
        // Update in userOrders if exists
        const userOrderIndex = state.userOrders.findIndex(order => order.id === action.payload.id);
        if (userOrderIndex !== -1) {
          state.userOrders[userOrderIndex] = action.payload;
        }
        
        // Update ordersByStatus - need to remove if was in a different status
        state.ordersByStatus = state.ordersByStatus.filter(order => {
          return order.id !== action.payload.id || order.status === action.payload.status;
        });
        
        // Update current order if it's the same one
        if (state.currentOrder && state.currentOrder.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
        
        // Update orderWithItems if it's the same order
        if (state.orderWithItems && state.orderWithItems.id === action.payload.id) {
          // Preserve the items array
          const items = state.orderWithItems.orderItems || [];
          state.orderWithItems = {
            ...action.payload,
            orderItems: items,
          };
        }
        
        // Update orderWithUser if it's the same order
        if (state.orderWithUser && state.orderWithUser.id === action.payload.id) {
          // Preserve the user information
          const user = state.orderWithUser.user;
          state.orderWithUser = {
            ...action.payload,
            user,
          };
        }
        
        // Update orderWithAddress if it's the same order
        if (state.orderWithAddress && state.orderWithAddress.id === action.payload.id) {
          // Preserve the address information
          const address = state.orderWithAddress.address || state.orderWithAddress.shippingAddress;
          state.orderWithAddress = {
            ...action.payload,
            address: address,
          };
        }
        
        // Update completeOrder if it's the same order
        if (state.completeOrder && state.completeOrder.id === action.payload.id) {
          // Preserve all the related data
          state.completeOrder = {
            ...state.completeOrder,
            ...action.payload,
          };
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState, clearOrderError, clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer; 