import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import orderReducer from './slices/orderSlice';
import orderItemReducer from './slices/orderItemSlice';
import addressReducer from './slices/addressSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    products: productReducer,
    categories: categoryReducer,
    orders: orderReducer,
    orderItems: orderItemReducer,
    addresses: addressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/non-serializable/action'],
        // Ignore these paths in the state
        ignoredPaths: ['some.path.to.non-serializable.value'],
      },
    }),
});

export default store;
