import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as orderItemAPI from '../../api/orderItemAPI';

// Async thunks
export const getAllOrderItems = createAsyncThunk(
  'orderItems/getAllOrderItems',
  async (_, { rejectWithValue }) => {
    try {
      return await orderItemAPI.getAllOrderItems();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get order items');
    }
  }
);

export const getOrderItemById = createAsyncThunk(
  'orderItems/getOrderItemById',
  async (id, { rejectWithValue }) => {
    try {
      return await orderItemAPI.getOrderItemById(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get order item');
    }
  }
);

export const getOrderItemsByOrderId = createAsyncThunk(
  'orderItems/getOrderItemsByOrderId',
  async (orderId, { rejectWithValue }) => {
    try {
      return await orderItemAPI.getOrderItemsByOrderId(orderId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get order items by order ID');
    }
  }
);

export const getOrderItemsByProductId = createAsyncThunk(
  'orderItems/getOrderItemsByProductId',
  async (productId, { rejectWithValue }) => {
    try {
      return await orderItemAPI.getOrderItemsByProductId(productId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get order items by product ID');
    }
  }
);

export const getOrderItemWithProduct = createAsyncThunk(
  'orderItems/getOrderItemWithProduct',
  async (id, { rejectWithValue }) => {
    try {
      return await orderItemAPI.getOrderItemWithProduct(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get order item with product');
    }
  }
);

// New thunk for missing API method
export const getOrderItemWithOrder = createAsyncThunk(
  'orderItems/getOrderItemWithOrder',
  async (id, { rejectWithValue }) => {
    try {
      return await orderItemAPI.getOrderItemWithOrder(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get order item with order');
    }
  }
);

export const getOrderItemsByOrderIdWithProducts = createAsyncThunk(
  'orderItems/getOrderItemsByOrderIdWithProducts',
  async (orderId, { rejectWithValue }) => {
    try {
      return await orderItemAPI.getOrderItemsByOrderIdWithProducts(orderId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get order items with products');
    }
  }
);

export const createOrderItem = createAsyncThunk(
  'orderItems/createOrderItem',
  async (orderItemData, { rejectWithValue }) => {
    try {
      return await orderItemAPI.createOrderItem(orderItemData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create order item');
    }
  }
);

export const createOrderItems = createAsyncThunk(
  'orderItems/createOrderItems',
  async (items, { rejectWithValue }) => {
    try {
      return await orderItemAPI.createOrderItems(items);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create order items');
    }
  }
);

export const updateOrderItem = createAsyncThunk(
  'orderItems/updateOrderItem',
  async ({ id, orderItemData }, { rejectWithValue }) => {
    try {
      return await orderItemAPI.updateOrderItem(id, orderItemData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update order item');
    }
  }
);

export const deleteOrderItem = createAsyncThunk(
  'orderItems/deleteOrderItem',
  async (id, { rejectWithValue }) => {
    try {
      await orderItemAPI.deleteOrderItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete order item');
    }
  }
);

export const deleteOrderItemsByOrderId = createAsyncThunk(
  'orderItems/deleteOrderItemsByOrderId',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderItemAPI.deleteOrderItemsByOrderId(orderId);
      return { orderId, response };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete order items');
    }
  }
);

export const calculateOrderTotal = createAsyncThunk(
  'orderItems/calculateOrderTotal',
  async (orderId, { rejectWithValue }) => {
    try {
      return await orderItemAPI.calculateOrderTotal(orderId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to calculate order total');
    }
  }
);

export const addProductToOrder = createAsyncThunk(
  'orderItems/addProductToOrder',
  async ({ orderId, productData }, { rejectWithValue }) => {
    try {
      return await orderItemAPI.addProductToOrder(orderId, productData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add product to order');
    }
  }
);

// Initial state
const initialState = {
  orderItems: [],
  currentOrderItem: null,
  orderItemsByOrderId: {},
  orderItemsByProductId: {},
  orderItemsWithProducts: {},
  orderItemWithOrder: null, // Added to store order item with its order
  orderTotal: {},
  loading: false,
  error: null,
};

// Slice
const orderItemSlice = createSlice({
  name: 'orderItems',
  initialState,
  reducers: {
    resetOrderItemState: (state) => {
      state.error = null;
      state.loading = false;
    },
    clearOrderItemError: (state) => {
      state.error = null;
    },
    clearCurrentOrderItem: (state) => {
      state.currentOrderItem = null;
      state.orderItemWithOrder = null; // Clear order item with order
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Order Items
      .addCase(getAllOrderItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrderItems.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItems = action.payload;
      })
      .addCase(getAllOrderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Order Item By ID
      .addCase(getOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrderItem = action.payload;
      })
      .addCase(getOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Order Items By Order ID
      .addCase(getOrderItemsByOrderId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderItemsByOrderId.fulfilled, (state, action) => {
        state.loading = false;
        // Store by order ID for easier access
        const orderId = action.meta.arg; // The orderId that was passed to the thunk
        state.orderItemsByOrderId[orderId] = action.payload;
      })
      .addCase(getOrderItemsByOrderId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Order Items By Product ID
      .addCase(getOrderItemsByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderItemsByProductId.fulfilled, (state, action) => {
        state.loading = false;
        // Store by product ID for easier access
        const productId = action.meta.arg; // The productId that was passed to the thunk
        state.orderItemsByProductId[productId] = action.payload;
      })
      .addCase(getOrderItemsByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Order Item With Product
      .addCase(getOrderItemWithProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderItemWithProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrderItem = action.payload;
      })
      .addCase(getOrderItemWithProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Order Item With Order
      .addCase(getOrderItemWithOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderItemWithOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItemWithOrder = action.payload;
      })
      .addCase(getOrderItemWithOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Order Items By Order ID With Products
      .addCase(getOrderItemsByOrderIdWithProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderItemsByOrderIdWithProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Store by order ID for easier access
        const orderId = action.meta.arg; // The orderId that was passed to the thunk
        state.orderItemsWithProducts[orderId] = action.payload;
      })
      .addCase(getOrderItemsByOrderIdWithProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Order Item
      .addCase(createOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItems.push(action.payload);
        state.currentOrderItem = action.payload;
        
        // Update orderItemsByOrderId if it exists
        const orderId = action.payload.orderId;
        if (state.orderItemsByOrderId[orderId]) {
          state.orderItemsByOrderId[orderId].push(action.payload);
        }
        
        // Update orderItemsByProductId if it exists
        const productId = action.payload.productId;
        if (state.orderItemsByProductId[productId]) {
          state.orderItemsByProductId[productId].push(action.payload);
        }
      })
      .addCase(createOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Order Items (Bulk)
      .addCase(createOrderItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderItems.fulfilled, (state) => {
        state.loading = false;
        // Update counts only, since we don't get the items back
      })
      .addCase(createOrderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Order Item
      .addCase(updateOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrderItem = action.payload;
        
        // Update in orderItems array
        const index = state.orderItems.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.orderItems[index] = action.payload;
        }
        
        // Update in orderItemsByOrderId if it exists
        const orderId = action.payload.orderId;
        if (state.orderItemsByOrderId[orderId]) {
          const orderIndex = state.orderItemsByOrderId[orderId].findIndex(
            item => item.id === action.payload.id
          );
          if (orderIndex !== -1) {
            state.orderItemsByOrderId[orderId][orderIndex] = action.payload;
          }
        }
        
        // Update in orderItemsByProductId if it exists
        const productId = action.payload.productId;
        if (state.orderItemsByProductId[productId]) {
          const productIndex = state.orderItemsByProductId[productId].findIndex(
            item => item.id === action.payload.id
          );
          if (productIndex !== -1) {
            state.orderItemsByProductId[productId][productIndex] = action.payload;
          }
        }
        
        // Update in orderItemsWithProducts if it exists
        if (state.orderItemsWithProducts[orderId]) {
          const itemIndex = state.orderItemsWithProducts[orderId].findIndex(
            item => item.id === action.payload.id
          );
          if (itemIndex !== -1) {
            // Preserve the product information
            const product = state.orderItemsWithProducts[orderId][itemIndex].product;
            state.orderItemsWithProducts[orderId][itemIndex] = {
              ...action.payload,
              product,
            };
          }
        }
        
        // Update orderItemWithOrder if it's the same order item
        if (state.orderItemWithOrder && state.orderItemWithOrder.id === action.payload.id) {
          // Preserve the order information
          const order = state.orderItemWithOrder.order;
          state.orderItemWithOrder = {
            ...action.payload,
            order,
          };
        }
      })
      .addCase(updateOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Order Item
      .addCase(deleteOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        const itemId = action.payload;
        
        // Remove from general list
        state.orderItems = state.orderItems.filter(item => item.id !== itemId);
        
        // Clear current item if it's the same
        if (state.currentOrderItem && state.currentOrderItem.id === itemId) {
          state.currentOrderItem = null;
        }
        
        // Clear orderItemWithOrder if it's the same
        if (state.orderItemWithOrder && state.orderItemWithOrder.id === itemId) {
          state.orderItemWithOrder = null;
        }
        
        // Remove from all orderItemsByOrderId lists
        Object.keys(state.orderItemsByOrderId).forEach(orderId => {
          state.orderItemsByOrderId[orderId] = state.orderItemsByOrderId[orderId].filter(
            item => item.id !== itemId
          );
        });
        
        // Remove from all orderItemsByProductId lists
        Object.keys(state.orderItemsByProductId).forEach(productId => {
          state.orderItemsByProductId[productId] = state.orderItemsByProductId[productId].filter(
            item => item.id !== itemId
          );
        });
        
        // Remove from all orderItemsWithProducts lists
        Object.keys(state.orderItemsWithProducts).forEach(orderId => {
          state.orderItemsWithProducts[orderId] = state.orderItemsWithProducts[orderId].filter(
            item => item.id !== itemId
          );
        });
      })
      .addCase(deleteOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Order Items By Order ID
      .addCase(deleteOrderItemsByOrderId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderItemsByOrderId.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId } = action.payload;
        
        // Remove this order's items from all collections
        
        // Remove from general list
        if (state.orderItemsByOrderId[orderId]) {
          const itemIds = state.orderItemsByOrderId[orderId].map(item => item.id);
          state.orderItems = state.orderItems.filter(item => !itemIds.includes(item.id));
          
          // Clear current item if it's one of these
          if (state.currentOrderItem && itemIds.includes(state.currentOrderItem.id)) {
            state.currentOrderItem = null;
          }
          
          // Clear orderItemWithOrder if it's one of these
          if (state.orderItemWithOrder && itemIds.includes(state.orderItemWithOrder.id)) {
            state.orderItemWithOrder = null;
          }
          
          // Remove from all orderItemsByProductId lists
          Object.keys(state.orderItemsByProductId).forEach(productId => {
            state.orderItemsByProductId[productId] = state.orderItemsByProductId[productId].filter(
              item => !itemIds.includes(item.id)
            );
          });
        }
        
        // Clear these collections for the order
        delete state.orderItemsByOrderId[orderId];
        delete state.orderItemsWithProducts[orderId];
        delete state.orderTotal[orderId];
      })
      .addCase(deleteOrderItemsByOrderId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Calculate Order Total
      .addCase(calculateOrderTotal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateOrderTotal.fulfilled, (state, action) => {
        state.loading = false;
        // Store the total by order ID
        const orderId = action.meta.arg; // The orderId that was passed to the thunk
        state.orderTotal[orderId] = action.payload.total;
      })
      .addCase(calculateOrderTotal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Product To Order
      .addCase(addProductToOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItems.push(action.payload);
        state.currentOrderItem = action.payload;
        
        // Update orderItemsByOrderId if it exists
        const orderId = action.payload.orderId;
        if (state.orderItemsByOrderId[orderId]) {
          state.orderItemsByOrderId[orderId].push(action.payload);
        }
        
        // Update orderItemsByProductId if it exists
        const productId = action.payload.productId;
        if (state.orderItemsByProductId[productId]) {
          state.orderItemsByProductId[productId].push(action.payload);
        }
      })
      .addCase(addProductToOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderItemState, clearOrderItemError, clearCurrentOrderItem } = orderItemSlice.actions;

export default orderItemSlice.reducer; 