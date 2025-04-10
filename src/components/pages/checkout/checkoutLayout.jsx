import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import components
import OrderSummary from './components/OrderSummary';
import UserFunds from './components/UserFunds';
import PaymentOptions from './components/PaymentOptions';
import InsufficientFunds from './components/InsufficientFunds';

// Import Redux actions
import { createNewOrder } from '../../redux/slices/orderSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import { purchaseUserOrder } from '../../redux/slices/userSlice';

// Import styles
import './style/CheckoutPage.css';

const CheckoutLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // States
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [processingStep, setProcessingStep] = useState('');
  
  // Get cart items, user info, and user balance from Redux store
  const { items: cartItems, productDetails } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const { userDetails } = useSelector(state => state.user);
  
  // Get the user's actual balance from the user details
  const userBalance = userDetails?.moneyNum || 0;
  
  // Check if user has enough funds
  const hasEnoughFunds = userBalance >= orderTotal;
  
  // Calculate order total
  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      setOrderTotal(total);
    }
  }, [cartItems]);
  
  // Handle order submission
  const handlePlaceOrder = async () => {
    if (!hasEnoughFunds) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Step 1: Create a new order
      setProcessingStep('Creating order...');
      
      // Ensure userId is a number - convert it if it's a string
      const userId = typeof user.id === 'string' ? parseInt(user.id, 10) : user.id;
      
      const createOrderResult = await dispatch(createNewOrder({
        userId: userId, // Use the converted numeric userId
        addressId: user.defaultAddressId ? 
          (typeof user.defaultAddressId === 'string' ? 
            parseInt(user.defaultAddressId, 10) : 
            user.defaultAddressId) : 
          null,
        items: cartItems.map(item => ({
          productId: typeof item.productId === 'string' ? 
            parseInt(item.productId, 10) : 
            item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: orderTotal,
        paymentMethod: 'Account Balance'
      })).unwrap();
      
      // Step 2: Process payment for the order
      setProcessingStep('Processing payment...');
      
      // Log the response to understand its structure
      console.log('Order creation response:', createOrderResult);
      
      // Try to find the order ID in various possible locations in the response
      let orderId = null;
      
      if (createOrderResult) {
        // Check common patterns for where the ID might be
        if (typeof createOrderResult === 'object') {
          // Direct properties
          orderId = createOrderResult.id || createOrderResult.orderId || createOrderResult.order_id;
          
          // Nested in data property
          if (!orderId && createOrderResult.data) {
            orderId = createOrderResult.data.id || createOrderResult.data.orderId || createOrderResult.data.order_id;
          }
          
          // Nested in order property
          if (!orderId && createOrderResult.order) {
            orderId = createOrderResult.order.id || createOrderResult.order.orderId || createOrderResult.order.order_id;
          }
        } else if (typeof createOrderResult === 'number') {
          // Sometimes APIs just return the ID directly
          orderId = createOrderResult;
        }
      }
      
      if (!orderId) {
        console.error('Cannot find order ID in response:', createOrderResult);
        throw new Error('Order created but no order ID returned from server');
      }
      
      console.log(`Found order ID: ${orderId}`);
      
      // Process the payment by calling purchaseUserOrder
      const purchaseResult = await dispatch(purchaseUserOrder({
        userId: userId, // Use the converted numeric userId
        orderId: typeof orderId === 'string' ? parseInt(orderId, 10) : orderId
      })).unwrap();
      
      // Step 3: Handle successful payment
      setProcessingStep('Finalizing your order...');
      
      // Clear cart after successful order creation and payment
      dispatch(clearCart());
      
      // Show success message
      alert(`Order #${orderId} placed successfully! Your new balance is $${purchaseResult.newBalance?.toFixed(2) || purchaseResult.user?.moneyNum?.toFixed(2) || userBalance.toFixed(2)}`);
      
      // Navigate to the order confirmation or order details page
      navigate(`/account?tab=orders`);
    } catch (error) {
      console.error('Checkout error:', error);
      
      // Show appropriate error message based on the error type
      if (error.message?.includes('insufficient funds') || 
          error.message?.toLowerCase().includes('balance') ||
          error.message?.toLowerCase().includes('money')) {
        alert('You have insufficient funds to complete this purchase. Please add more money to your account.');
      } else if (error.message?.includes('inventory') || 
                error.message?.toLowerCase().includes('stock') ||
                error.message?.toLowerCase().includes('quantity')) {
        alert('Some items in your order are no longer in stock in the requested quantity.');
      } else {
        alert(`There was an error processing your order: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };
  
  // Redirect to account page to add funds
  const handleAddFunds = () => {
    // Navigate to the account page with focus on the add funds section
    navigate('/account');
  };
  
  // Create cart items with product details
  const cartItemsWithProducts = cartItems.map(item => ({
    ...item,
    product: {
      ...(productDetails[item.productId] || {}),
      name: item.productName || (productDetails[item.productId]?.name || 'Product'),
      imageUrl: item.imageUrl || (productDetails[item.productId]?.imageUrl || '/placeholder-image.jpg')
    }
  }));
  
  // Redirect to cart if it's empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);
  
  if (cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="checkout-page">
      <h1 className="checkout-page-title">Complete Your Order</h1>
      
      <div className="checkout-content">
        <div className="checkout-main">
          <OrderSummary cartItems={cartItemsWithProducts} totalAmount={orderTotal} />
          
          <UserFunds balance={userBalance} totalAmount={orderTotal} />
          
          {hasEnoughFunds ? (
            <PaymentOptions 
              onPlaceOrder={handlePlaceOrder}
              isProcessing={isProcessing}
              processingStep={processingStep}
            />
          ) : (
            <InsufficientFunds 
              onAddFunds={handleAddFunds}
              missing={orderTotal - userBalance}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout; 