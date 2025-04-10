import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

// Import components
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';
import LoadingSpinner from '../../global/LoadingSpinner';

// Import Redux actions (uncomment when you have these slices ready)
// import { 
//   fetchProductForCartItem, 
//   updateQuantity, 
//   removeFromCart,
//   clearCart 
// } from '../../../redux/slices/cartSlice';
// import { createNewOrder } from '../../../redux/slices/orderSlice';

// Import styles
import './style/cartLayout.css';

const CartLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get cart items and product details from Redux store
  const { items: cartItems = [], productDetails = {}, loading = false } = 
    useSelector(state => state.cart || { items: [], productDetails: {}, loading: false });
  const { user } = useSelector(state => state.auth || {});
  
  // Local loading state
  const [localLoading, setLocalLoading] = useState(false);
  
  // Fetch product details for each cart item
  useEffect(() => {
    // Only fetch product details if needed for additional information
    // that isn't already stored in the cart item
    const fetchMissingProductDetails = async () => {
      // Uncomment when cart slice is ready
      // Only fetch if we actually need additional details beyond what's in the cart item
      // const itemsNeedingDetails = cartItems.filter(item => 
      //   (!item.productName || !item.imageUrl) && !productDetails[item.productId]
      // );
      
      // if (itemsNeedingDetails.length === 0) {
      //   // No need to fetch anything if we have all needed info
      //   return;
      // }
      
      setLocalLoading(true);
      
      try {
        // Only fetch for items that need it
        // Uncomment when cart slice is ready
        // const fetchPromises = itemsNeedingDetails.map(item => 
        //   dispatch(fetchProductForCartItem(item.productId))
        // );
        
        // await Promise.all(fetchPromises);
        
        // Temporary timeout to simulate fetching
        setTimeout(() => {
          setLocalLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLocalLoading(false);
      }
    };
    
    if (cartItems.length > 0) {
      fetchMissingProductDetails();
    } else {
      setLocalLoading(false);
    }
  }, [dispatch, cartItems, productDetails]);
  
  // Handle quantity update
  const handleUpdateQuantity = (itemId, newQuantity) => {
    // Uncomment when cart slice is ready
    // dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    console.log(`Update quantity for item ${itemId} to ${newQuantity}`);
  };
  
  // Handle removing an item
  const handleRemoveItem = (itemId) => {
    // Uncomment when cart slice is ready
    // dispatch(removeFromCart(itemId));
    console.log(`Remove item ${itemId} from cart`);
  };
  
  // Handle clearing the cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      // Uncomment when cart slice is ready
      // dispatch(clearCart());
      console.log('Clear cart');
    }
  };
  
  // Create cart items with product details
  const cartItemsWithProducts = cartItems.map(item => ({
    ...item,
    // Prioritize using data directly from cart item, fall back to product details
    product: {
      ...(productDetails[item.productId] || {}),
      // Override with data we already have in the cart item
      name: item.productName || (productDetails[item.productId]?.name || 'Product'),
      imageUrl: item.imageUrl || (productDetails[item.productId]?.imageUrl || '/placeholder-image.jpg')
    }
  }));
  
  // Handle checkout process
  const handleCheckout = async (orderSummary) => {
    if (!user) {
      // Redirect to login if user is not logged in
      alert('Please log in to checkout');
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    
    setLocalLoading(true);
    
    try {
      console.log('Processing checkout with summary:', orderSummary);
      
      // Create new order
      // Uncomment when order slice is ready
      // const orderResult = await dispatch(createNewOrder({
      //   userId: user.id,
      //   addressId: user.defaultAddressId || null, // Use default address if available
      //   items: cartItems.map(item => ({
      //     productId: item.productId,
      //     quantity: item.quantity,
      //     price: item.price
      //   })),
      //   discountCode: orderSummary.promoDiscount > 0 ? 'APPLIED' : null,
      //   shippingMethod: orderSummary.shipping === 0 ? 'Free Shipping' : 'Standard Shipping'
      // }));
      
      // For now, just simulate successful order creation
      const orderResult = {
        meta: { requestStatus: 'fulfilled' },
        payload: { id: 'temp-order-id' }
      };
      
      if (orderResult.meta.requestStatus === 'fulfilled') {
        // Clear cart after successful order creation
        // Uncomment when cart slice is ready
        // dispatch(clearCart());
        
        // Redirect to order confirmation page
        navigate(`/order-complete`);
      } else {
        alert('There was an error processing your order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  };
  
  // Create CSS files for styles since they weren't created yet
  useEffect(() => {
    // This is just a message for development, will be removed in production
    console.log('Remember to create style files: CartItem.css, CartSummary.css, EmptyCart.css, cartLayout.css');
  }, []);
  
  // Show loading state only when cart is completely empty
  if (loading && cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-page-title">Your Mystical Cart</h1>
        <div className="loading-message">
          <LoadingSpinner />
          <p>Preparing your mystical cart...</p>
        </div>
      </div>
    );
  }
  
  // Mocked empty cart for initial development
  const isCartEmpty = cartItems.length === 0;
  
  // Show empty cart state
  if (isCartEmpty) {
    return (
      <div className="cart-page">
        <h1 className="cart-page-title">Your Mystical Cart</h1>
        <div className="cart-empty-state">
          <EmptyCart />
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Your Mystical Cart</h1>
      
      {/* Show a small loading indicator when fetching additional details */}
      {localLoading && (
        <div className="fetching-details-message">
          <div className="small-spinner"></div>
          <p>Fetching additional product details...</p>
        </div>
      )}
      
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-page-header">
            <p className="items-count">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
            <button className="clear-cart-btn" onClick={handleClearCart}>
              <FaTrashAlt />
              <span>Clear Cart</span>
            </button>
          </div>
          
          {cartItemsWithProducts.map(item => (
            <CartItem 
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          ))}
        </div>
        
        <div className="cart-summary-container">
          <CartSummary 
            cartItems={cartItemsWithProducts}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default CartLayout; 