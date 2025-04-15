import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import LoadingSpinner from '../components/global/LoadingSpinner';
import ProtectedRoute from './ProtectedRoutes';

// Lazy load components to improve initial load time
const Home = lazy(() => import('../components/pages/home/homeLayout'));
const Login = lazy(() => import('../components/pages/login/loginLayout'));
const Account = lazy(() => import('../components/pages/account/accountLayout'));
const ProductListing = lazy(() => import('../components/pages/productListing/productListingLayout'));
const ProductDetails = lazy(() => import('../components/pages/productDetails/productDetailsLayout'));
const CartPage = lazy(() => import('../components/pages/cart/cartLayout'));
const CheckoutPage = lazy(() => import('../components/pages/checkout/checkoutLayout'));
const OrderHistoery = lazy(() => import('../components/pages/orderHistory/orderHistoryLayout'));
const OrderComplete = lazy(() => import('../components/pages/orderComplete/orderCompleteLayout'));

const AppRouter = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Home />} />
            
            {/* Login Page */}
            <Route path="/login" element={<Login />} />
            
            {/* Product Details Page - Public */}
            <Route path="/product/:productId" element={<ProductDetails />} />
            
            {/* Products Page - Public */}
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product-listing" element={<ProductListing />} />
            
            {/* Protected Routes */}
            <Route 
              path="/account" 
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/order-history" 
              element={
                <ProtectedRoute>
                  <OrderHistoery />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/order-complete" 
              element={
                <ProtectedRoute>
                  <OrderComplete />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default AppRouter; 