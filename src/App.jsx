import { useState, useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import {
  authReducer,
  userReducer,
  productReducer,
  categoryReducer,
  orderReducer,
  orderItemReducer,
  addressReducer
} from './redux/slices'

// Auth actions
import {
  login,
  register,
  logout,
  getProfile,
  refreshToken
} from './redux/slices/authSlice'

// User actions
import {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  updateUser,
  getUserWithAddresses,
  getUserWithOrders,
  getUserComplete,
  addMoneyToUser,
  deductMoneyFromUser,
  updateFavoriteProduct,
  purchaseOrder
} from './redux/slices/userSlice'

// Product actions
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsInStock,
  searchProducts,
  getProductsByPriceRange,
  getFeaturedProducts,
  getDiscountedProducts,
  getProductWithCategory,
  createProduct,
  createProductWithCategory,
  updateProduct,
  deleteProduct,
  updateProductStock,
  restockProduct,
  applyDiscount
} from './redux/slices/productSlice'

// Category actions
import {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  getCategoryWithProducts,
  getAllCategoriesWithProducts,
  createCategory,
  updateCategory,
  deleteCategory,
  createOrUpdateCategory,
  getOrCreateCategory
} from './redux/slices/categorySlice'

// Order actions
import {
  getAllOrders,
  getOrderById,
  getUserOrders,
  getOrdersByStatus,
  getOrderWithItems,
  getOrderWithUser,
  getOrderWithAddress,
  getCompleteOrder,
  createOrder,
  createNewOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  cancelOrder
} from './redux/slices/orderSlice'

// OrderItem actions
import {
  getAllOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId,
  getOrderItemsByProductId,
  getOrderItemWithProduct,
  getOrderItemWithOrder,
  getOrderItemsByOrderIdWithProducts,
  createOrderItem,
  createOrderItems,
  updateOrderItem,
  deleteOrderItem,
  deleteOrderItemsByOrderId,
  calculateOrderTotal,
  addProductToOrder
} from './redux/slices/orderItemSlice'

// Address actions
import {
  getAllAddresses,
  getAddressById,
  getUserAddresses,
  getUserDefaultAddress,
  createAddress,
  addUserAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from './redux/slices/addressSlice'

// Configure store
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    products: productReducer,
    categories: categoryReducer,
    orders: orderReducer,
    orderItems: orderItemReducer,
    addresses: addressReducer
  }
})

// Main App Component
function App() {
  return (
    <Provider store={store}>
      <div className="app-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Mystical Marketplace API Testing</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <AuthTester />
          <UserTester />
          <ProductTester />
          <CategoryTester />
          <OrderTester />
          <OrderItemTester />
          <AddressTester />
        </div>
      </div>
    </Provider>
  )
}

// ========================
// Auth Testing Component
// ========================
function AuthTester() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [credentials, setCredentials] = useState({ 
    usernameOrEmail: 'GandalfTheGrey', 
    password: 'YouShallNotPass!' 
  })
  const [userData, setUserData] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' })
  const [requestStatus, setRequestStatus] = useState({ loading: false, error: null, success: null, operation: null })
  
  // Auto-login on component mount
  useEffect(() => {
    if (!auth.isAuthenticated) {
      handleLogin();
    }
  }, []);
  
  const handleLogin = async () => {
    try {
      console.log('Login request with:', credentials)
      setRequestStatus({ loading: true, error: null, operation: 'login' })
      const resultAction = await dispatch(login(credentials))
      console.log('Login response:', resultAction)
      if (login.rejected.match(resultAction)) {
        // Handle error
        setRequestStatus({ loading: false, error: resultAction.payload || 'Login failed', operation: 'login' })
      } else {
        setRequestStatus({ loading: false, error: null, operation: null, success: 'Login successful! Your token is now being used for all API requests.' })
        // Store token in localStorage for other components to use
        if (resultAction.payload && resultAction.payload.token) {
          localStorage.setItem('token', resultAction.payload.token);
          console.log('Token stored in localStorage for future requests');
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setRequestStatus({ loading: false, error: error.message || 'Login failed', operation: 'login' })
    }
  }
  
  const handleRegister = async () => {
    try {
      console.log('Register request with:', userData)
      setRequestStatus({ loading: true, error: null, success: null, operation: 'register' })
      const resultAction = await dispatch(register(userData))
      console.log('Register response:', resultAction)
      if (register.rejected.match(resultAction)) {
        setRequestStatus({ loading: false, error: resultAction.payload || 'Registration failed', success: null, operation: 'register' })
      } else {
        setRequestStatus({ loading: false, error: null, success: 'Registration successful! You are now logged in.', operation: null })
      }
    } catch (error) {
      console.error('Register error:', error)
      setRequestStatus({ loading: false, error: error.message || 'Registration failed', success: null, operation: 'register' })
    }
  }
  
  const handleLogout = async () => {
    try {
      setRequestStatus({ loading: true, error: null, success: null, operation: 'logout' })
      const resultAction = await dispatch(logout())
      if (logout.rejected.match(resultAction)) {
        setRequestStatus({ loading: false, error: resultAction.payload || 'Logout failed', success: null, operation: 'logout' })
      } else {
        setRequestStatus({ loading: false, error: null, success: 'Successfully logged out', operation: null })
      }
    } catch (error) {
      console.error('Logout error:', error)
      setRequestStatus({ loading: false, error: error.message || 'Logout failed', success: null, operation: 'logout' })
    }
  }
  
  const handleGetProfile = async () => {
    try {
      setRequestStatus({ loading: true, error: null, success: null, operation: 'getProfile' })
      const resultAction = await dispatch(getProfile())
      if (getProfile.rejected.match(resultAction)) {
        setRequestStatus({ loading: false, error: resultAction.payload || 'Failed to get profile', success: null, operation: 'getProfile' })
      } else {
        setRequestStatus({ loading: false, error: null, success: 'Successfully retrieved profile data', operation: null })
      }
    } catch (error) {
      console.error('Get profile error:', error)
      setRequestStatus({ loading: false, error: error.message || 'Failed to get profile', success: null, operation: 'getProfile' })
    }
  }
  
  const handleRefreshToken = async () => {
    try {
      setRequestStatus({ loading: true, error: null, success: null, operation: 'refreshToken' })
      const resultAction = await dispatch(refreshToken())
      if (refreshToken.rejected.match(resultAction)) {
        setRequestStatus({ loading: false, error: resultAction.payload || 'Failed to refresh token', success: null, operation: 'refreshToken' })
      } else {
        setRequestStatus({ loading: false, error: null, success: 'Token refreshed successfully', operation: null })
      }
    } catch (error) {
      console.error('Refresh token error:', error)
      setRequestStatus({ loading: false, error: error.message || 'Failed to refresh token', success: null, operation: 'refreshToken' })
    }
  }
  
  // Function to check if backend is reachable
  const checkBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/mystical/health', { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      alert(`Backend status: ${data.status || 'Connected'} - ${data.message || ''}`);
    } catch (error) {
      console.error('Backend connection error:', error);
      alert(`Backend connection error: ${error.message}. Make sure the server is running on http://localhost:3000`);
    }
  };
  
  return (
    <div className="tester-section">
      <h2>Authentication Testing</h2>
      
      {requestStatus.error && (
        <div className="error-message" style={{ color: 'red', padding: '10px', backgroundColor: '#ffeeee', borderRadius: '5px', marginBottom: '10px' }}>
          Error: {requestStatus.error}
        </div>
      )}
      
      {requestStatus.success && (
        <div className="success-message" style={{ color: 'green', padding: '10px', backgroundColor: '#eeffee', borderRadius: '5px', marginBottom: '10px' }}>
          {requestStatus.success}
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="action-panel">
          <h3>Login</h3>
          <input
            type="text"
            placeholder="Username or Email"
            value={credentials.usernameOrEmail}
            onChange={(e) => setCredentials({ ...credentials, usernameOrEmail: e.target.value })}
            disabled={requestStatus.loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            disabled={requestStatus.loading}
          />
          <button 
            onClick={handleLogin} 
            disabled={requestStatus.loading}
            className={requestStatus.loading && requestStatus.operation === 'login' ? 'loading' : ''}
          >
            {requestStatus.loading && requestStatus.operation === 'login' ? 'Logging in...' : 'Login'}
          </button>
          
          <h3>Register</h3>
          <input
            type="text"
            placeholder="First Name"
            value={userData.firstName}
            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
            disabled={requestStatus.loading}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={userData.lastName}
            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            disabled={requestStatus.loading}
          />
          <input
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            disabled={requestStatus.loading}
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            disabled={requestStatus.loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            disabled={requestStatus.loading}
          />
          <button 
            onClick={handleRegister} 
            disabled={requestStatus.loading}
            className={requestStatus.loading && requestStatus.operation === 'register' ? 'loading' : ''}
          >
            {requestStatus.loading && requestStatus.operation === 'register' ? 'Registering...' : 'Register'}
          </button>
          
          <h3>Other Actions</h3>
          <button 
            onClick={handleLogout} 
            disabled={requestStatus.loading}
            className={requestStatus.loading && requestStatus.operation === 'logout' ? 'loading' : ''}
          >
            {requestStatus.loading && requestStatus.operation === 'logout' ? 'Logging out...' : 'Logout'}
          </button>
          <button 
            onClick={handleGetProfile} 
            disabled={requestStatus.loading}
            className={requestStatus.loading && requestStatus.operation === 'getProfile' ? 'loading' : ''}
          >
            {requestStatus.loading && requestStatus.operation === 'getProfile' ? 'Loading profile...' : 'Get Profile'}
          </button>
          <button 
            onClick={handleRefreshToken} 
            disabled={requestStatus.loading}
            className={requestStatus.loading && requestStatus.operation === 'refreshToken' ? 'loading' : ''}
          >
            {requestStatus.loading && requestStatus.operation === 'refreshToken' ? 'Refreshing token...' : 'Refresh Token'}
          </button>
          
          <button 
            onClick={checkBackendConnection}
            className="mt-20" 
          >
            Check Backend Connection
          </button>
        </div>
        
        <div className="state-panel">
          <h3>Auth State</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto', maxHeight: '400px' }}>
            {JSON.stringify(auth, null, 2)}
          </pre>
          
          <h3 className="mt-20">Current Status</h3>
          <div>
            {auth.isAuthenticated ? (
              <span className="text-success">✓ Logged in</span>
            ) : (
              <span className="text-danger">✗ Not logged in</span>
            )}
          </div>
          {auth.loading && <div className="loading">Loading...</div>}
          {auth.error && <div className="text-danger">Error: {auth.error}</div>}
          {auth.user && (
            <div className="mt-10">
              <strong>Current User:</strong> {auth.user.username || auth.user.email}
            </div>
          )}
          {auth.token && (
            <div className="mt-10">
              <strong>Authentication:</strong> Token is active and will be used for all API requests
              <div style={{ fontSize: '0.8em', marginTop: '5px', color: '#666' }}>
                Token: {auth.token.substring(0, 15)}...{auth.token.substring(auth.token.length - 10)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ========================
// User Testing Component
// ========================
function UserTester() {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '' })
  const [moneyAmount, setMoneyAmount] = useState(0)
  const [productId, setProductId] = useState('')
  const [orderId, setOrderId] = useState('')
  
  return (
    <div className="tester-section">
      <h2>User Testing</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="action-panel">
          <h3>User Actions</h3>
          <button onClick={() => dispatch(getAllUsers())}>Get All Users</button>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={() => dispatch(getUserById(userId))}>Get User by ID</button>
            <button onClick={() => dispatch(getUserWithAddresses(userId))}>Get User with Addresses</button>
            <button onClick={() => dispatch(getUserWithOrders(userId))}>Get User with Orders</button>
            <button onClick={() => dispatch(getUserComplete(userId))}>Get Complete User</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={() => dispatch(getUserByUsername(username))}>Get User by Username</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => dispatch(getUserByEmail(email))}>Get User by Email</button>
          </div>
          
          <h3>Update User</h3>
          <input
            type="text"
            placeholder="First Name"
            value={userData.firstName}
            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={userData.lastName}
            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <button onClick={() => dispatch(updateUser({ id: userId, userData }))}>Update User</button>
          
          <h3>Money Operations</h3>
          <input
            type="number"
            placeholder="Amount"
            value={moneyAmount}
            onChange={(e) => setMoneyAmount(parseFloat(e.target.value))}
          />
          <button onClick={() => dispatch(addMoneyToUser({ id: userId, amount: moneyAmount }))}>Add Money</button>
          <button onClick={() => dispatch(deductMoneyFromUser({ id: userId, amount: moneyAmount }))}>Deduct Money</button>
          
          <h3>Other User Actions</h3>
          <input
            type="text"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button onClick={() => dispatch(updateFavoriteProduct({ id: userId, productId }))}>Update Favorite Product</button>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button onClick={() => dispatch(purchaseOrder({ id: userId, orderId }))}>Purchase Order</button>
          </div>
        </div>
        
        <div className="state-panel">
          <h3>User State</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto', maxHeight: '400px' }}>
            {JSON.stringify(users, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

// ========================
// Product Testing Component
// ========================
function ProductTester() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const [productId, setProductId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 100 })
  const [productData, setProductData] = useState({ 
    name: '', 
    description: '', 
    price: 0, 
    stockQuantity: 0, 
    categoryId: '',
    discountPercentage: 0,
    isFeatured: false
  })
  const [quantity, setQuantity] = useState(0)
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [featuredLimit, setFeaturedLimit] = useState(5)

  return (
    <div className="tester-section">
      <h2>Product Testing</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="action-panel">
          <h3>Product Actions</h3>
          <button onClick={() => dispatch(getAllProducts())}>Get All Products</button>
          <button onClick={() => dispatch(getProductsInStock())}>Get In-Stock Products</button>
          <button onClick={() => dispatch(getDiscountedProducts())}>Get Discounted Products</button>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="number"
              placeholder="Limit"
              value={featuredLimit}
              onChange={(e) => setFeaturedLimit(parseInt(e.target.value))}
            />
            <button onClick={() => dispatch(getFeaturedProducts(featuredLimit))}>Get Featured Products</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <button onClick={() => dispatch(getProductById(productId))}>Get Product by ID</button>
            <button onClick={() => dispatch(getProductWithCategory(productId))}>Get Product with Category</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Category ID"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
            <button onClick={() => dispatch(getProductsByCategory(categoryId))}>Get Products by Category</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Search Term"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => dispatch(searchProducts(searchTerm))}>Search Products</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="number"
              placeholder="Min Price"
              value={priceRange.minPrice}
              onChange={(e) => setPriceRange({ ...priceRange, minPrice: parseFloat(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={priceRange.maxPrice}
              onChange={(e) => setPriceRange({ ...priceRange, maxPrice: parseFloat(e.target.value) })}
            />
            <button onClick={() => dispatch(getProductsByPriceRange(priceRange))}>
              Get Products by Price Range
            </button>
          </div>
          
          <h3>Create Product</h3>
          <input
            type="text"
            placeholder="Name"
            value={productData.name}
            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={productData.price}
            onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={productData.stockQuantity}
            onChange={(e) => setProductData({ ...productData, stockQuantity: parseInt(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Category ID"
            value={productData.categoryId}
            onChange={(e) => setProductData({ ...productData, categoryId: e.target.value })}
          />
      <div>
            <label>
              <input
                type="checkbox"
                checked={productData.isFeatured}
                onChange={(e) => setProductData({ ...productData, isFeatured: e.target.checked })}
              />
              Is Featured
            </label>
          </div>
          <button onClick={() => dispatch(createProduct(productData))}>Create Product</button>
          <button onClick={() => dispatch(createProductWithCategory(productData))}>Create Product with Category</button>
          <button onClick={() => dispatch(updateProduct({ id: productId, productData }))}>Update Product</button>
          
          <h3>Stock Management</h3>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button onClick={() => dispatch(updateProductStock({ id: productId, quantity }))}>
            Update Stock
          </button>
          <button onClick={() => dispatch(restockProduct({ id: productId, quantity }))}>
            Restock Product
          </button>
          
          <h3>Discount Management</h3>
          <input
            type="number"
            placeholder="Discount Percentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(parseFloat(e.target.value))}
          />
          <button onClick={() => dispatch(applyDiscount({ id: productId, discountPercentage }))}>
            Apply Discount
          </button>
          
          <h3>Delete Product</h3>
          <button onClick={() => dispatch(deleteProduct(productId))}>Delete Product</button>
        </div>
        
        <div className="state-panel">
          <h3>Product State</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto', maxHeight: '400px' }}>
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

// ========================
// Category Testing Component
// ========================
function CategoryTester() {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories)
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [categoryData, setCategoryData] = useState({ 
    name: '', 
    description: '', 
    imageUrl: '' 
  })
  
  return (
    <div className="tester-section">
      <h2>Category Testing</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="action-panel">
          <h3>Category Actions</h3>
          <button onClick={() => dispatch(getAllCategories())}>Get All Categories</button>
          <button onClick={() => dispatch(getAllCategoriesWithProducts())}>Get All Categories with Products</button>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Category ID"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
            <button onClick={() => dispatch(getCategoryById(categoryId))}>Get Category by ID</button>
            <button onClick={() => dispatch(getCategoryWithProducts(categoryId))}>Get Category with Products</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button onClick={() => dispatch(getCategoryByName(categoryName))}>Get Category by Name</button>
          </div>
          
          <h3>Create/Update Category</h3>
          <input
            type="text"
            placeholder="Name"
            value={categoryData.name}
            onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={categoryData.description}
            onChange={(e) => setCategoryData({ ...categoryData, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={categoryData.imageUrl}
            onChange={(e) => setCategoryData({ ...categoryData, imageUrl: e.target.value })}
          />
          <button onClick={() => dispatch(createCategory(categoryData))}>Create Category</button>
          <button onClick={() => dispatch(updateCategory({ id: categoryId, categoryData }))}>Update Category</button>
          <button onClick={() => dispatch(createOrUpdateCategory(categoryData))}>Create or Update Category</button>
          <button onClick={() => dispatch(getOrCreateCategory(categoryData))}>Get or Create Category</button>
          
          <h3>Delete Category</h3>
          <button onClick={() => dispatch(deleteCategory(categoryId))}>Delete Category</button>
        </div>
        
        <div className="state-panel">
          <h3>Category State</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto', maxHeight: '400px' }}>
            {JSON.stringify(categories, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

// ========================
// Order Testing Component
// ========================
function OrderTester() {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders)
  const [orderId, setOrderId] = useState('')
  const [userId, setUserId] = useState('')
  const [status, setStatus] = useState('')
  const [orderData, setOrderData] = useState({ 
    userId: '', 
    addressId: '', 
    status: 'pending',
    totalAmount: 0,
    notes: ''
  })
  
  return (
    <div className="tester-section">
      <h2>Order Testing</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="action-panel">
          <h3>Order Actions</h3>
          <button onClick={() => dispatch(getAllOrders())}>Get All Orders</button>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button onClick={() => dispatch(getOrderById(orderId))}>Get Order by ID</button>
            <button onClick={() => dispatch(getOrderWithItems(orderId))}>Get Order with Items</button>
            <button onClick={() => dispatch(getOrderWithUser(orderId))}>Get Order with User</button>
            <button onClick={() => dispatch(getOrderWithAddress(orderId))}>Get Order with Address</button>
            <button onClick={() => dispatch(getCompleteOrder(orderId))}>Get Complete Order</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={() => dispatch(getUserOrders(userId))}>Get User Orders</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Status (pending, processing, shipped, delivered, cancelled)"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <button onClick={() => dispatch(getOrdersByStatus(status))}>Get Orders by Status</button>
          </div>
          
          <h3>Create Order</h3>
          <input
            type="text"
            placeholder="User ID"
            value={orderData.userId}
            onChange={(e) => setOrderData({ ...orderData, userId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address ID"
            value={orderData.addressId}
            onChange={(e) => setOrderData({ ...orderData, addressId: e.target.value })}
          />
          <select
            value={orderData.status}
            onChange={(e) => setOrderData({ ...orderData, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="number"
            placeholder="Total Amount"
            value={orderData.totalAmount}
            onChange={(e) => setOrderData({ ...orderData, totalAmount: parseFloat(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Notes"
            value={orderData.notes}
            onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
          />
          <button onClick={() => dispatch(createOrder(orderData))}>Create Order</button>
          <button onClick={() => dispatch(createNewOrder({ ...orderData, items: [] }))}>Create New Order</button>
          
          <h3>Update Order</h3>
          <button onClick={() => dispatch(updateOrder({ id: orderId, orderData }))}>Update Order</button>
          <button onClick={() => dispatch(updateOrderStatus({ id: orderId, status }))}>Update Order Status</button>
          
          <h3>Other Order Actions</h3>
          <button onClick={() => dispatch(cancelOrder(orderId))}>Cancel Order</button>
          <button onClick={() => dispatch(deleteOrder(orderId))}>Delete Order</button>
        </div>
        
        <div className="state-panel">
          <h3>Order State</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto', maxHeight: '400px' }}>
            {JSON.stringify(orders, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

// ========================
// OrderItem Testing Component
// ========================
function OrderItemTester() {
  const dispatch = useDispatch()
  const orderItems = useSelector(state => state.orderItems)
  const [orderItemId, setOrderItemId] = useState('')
  const [orderId, setOrderId] = useState('')
  const [productId, setProductId] = useState('')
  const [itemData, setItemData] = useState({ 
    orderId: '', 
    productId: '', 
    quantity: 1,
    price: 0
  })
  
  return (
    <div className="tester-section">
      <h2>Order Item Testing</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="action-panel">
          <h3>Order Item Actions</h3>
          <button onClick={() => dispatch(getAllOrderItems())}>Get All Order Items</button>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Order Item ID"
              value={orderItemId}
              onChange={(e) => setOrderItemId(e.target.value)}
            />
            <button onClick={() => dispatch(getOrderItemById(orderItemId))}>Get Order Item by ID</button>
            <button onClick={() => dispatch(getOrderItemWithProduct(orderItemId))}>Get Order Item with Product</button>
            <button onClick={() => dispatch(getOrderItemWithOrder(orderItemId))}>Get Order Item with Order</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button onClick={() => dispatch(getOrderItemsByOrderId(orderId))}>Get Items by Order ID</button>
            <button onClick={() => dispatch(getOrderItemsByOrderIdWithProducts(orderId))}>
              Get Items with Products
            </button>
            <button onClick={() => dispatch(calculateOrderTotal(orderId))}>Calculate Order Total</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <button onClick={() => dispatch(getOrderItemsByProductId(productId))}>Get Items by Product ID</button>
          </div>
          
          <h3>Create Order Item</h3>
          <input
            type="text"
            placeholder="Order ID"
            value={itemData.orderId}
            onChange={(e) => setItemData({ ...itemData, orderId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Product ID"
            value={itemData.productId}
            onChange={(e) => setItemData({ ...itemData, productId: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={itemData.quantity}
            onChange={(e) => setItemData({ ...itemData, quantity: parseInt(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Price"
            value={itemData.price}
            onChange={(e) => setItemData({ ...itemData, price: parseFloat(e.target.value) })}
          />
          <button onClick={() => dispatch(createOrderItem(itemData))}>Create Order Item</button>
          <button onClick={() => dispatch(createOrderItems([itemData]))}>Create Multiple Items</button>
          <button onClick={() => dispatch(addProductToOrder({ 
            orderId: itemData.orderId, 
            productData: { 
              productId: itemData.productId, 
              quantity: itemData.quantity, 
              price: itemData.price 
            } 
          }))}>
            Add Product to Order
          </button>
          
          <h3>Update Order Item</h3>
          <button onClick={() => dispatch(updateOrderItem({ id: orderItemId, orderItemData: itemData }))}>
            Update Order Item
          </button>
          
          <h3>Delete Order Item</h3>
          <button onClick={() => dispatch(deleteOrderItem(orderItemId))}>Delete Order Item</button>
          <button onClick={() => dispatch(deleteOrderItemsByOrderId(orderId))}>Delete Order Items by Order ID</button>
        </div>
        
        <div className="state-panel">
          <h3>Order Item State</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto', maxHeight: '400px' }}>
            {JSON.stringify(orderItems, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

// ========================
// Address Testing Component
// ========================
function AddressTester() {
  const dispatch = useDispatch()
  const addresses = useSelector(state => state.addresses)
  const [addressId, setAddressId] = useState('')
  const [userId, setUserId] = useState('')
  const [addressData, setAddressData] = useState({ 
    userId: '', 
    street: '', 
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false
  })
  
  return (
    <div className="tester-section">
      <h2>Address Testing</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="action-panel">
          <h3>Address Actions</h3>
          <button onClick={() => dispatch(getAllAddresses())}>Get All Addresses</button>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Address ID"
              value={addressId}
              onChange={(e) => setAddressId(e.target.value)}
            />
            <button onClick={() => dispatch(getAddressById(addressId))}>Get Address by ID</button>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={() => dispatch(getUserAddresses(userId))}>Get User Addresses</button>
            <button onClick={() => dispatch(getUserDefaultAddress(userId))}>Get User Default Address</button>
          </div>
          
          <h3>Create Address</h3>
          <input
            type="text"
            placeholder="User ID"
            value={addressData.userId}
            onChange={(e) => setAddressData({ ...addressData, userId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Street"
            value={addressData.street}
            onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            value={addressData.city}
            onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="State"
            value={addressData.state}
            onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={addressData.postalCode}
            onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
          />
          <input
            type="text"
            placeholder="Country"
            value={addressData.country}
            onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
          />
          <div>
            <label>
              <input
                type="checkbox"
                checked={addressData.isDefault}
                onChange={(e) => setAddressData({ ...addressData, isDefault: e.target.checked })}
              />
              Is Default
            </label>
          </div>
          <button onClick={() => dispatch(createAddress(addressData))}>Create Address</button>
          <button onClick={() => dispatch(addUserAddress({ 
            userId: addressData.userId, 
            addressData: { ...addressData, userId: undefined } 
          }))}>
            Add User Address
          </button>
          
          <h3>Update Address</h3>
          <button onClick={() => dispatch(updateAddress({ id: addressId, addressData }))}>Update Address</button>
          <button onClick={() => dispatch(setDefaultAddress({ 
            userId: userId, 
            addressId: addressId 
          }))}>
            Set Default Address
        </button>
          
          <h3>Delete Address</h3>
          <button onClick={() => dispatch(deleteAddress(addressId))}>Delete Address</button>
        </div>
        
        <div className="state-panel">
          <h3>Address State</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto', maxHeight: '400px' }}>
            {JSON.stringify(addresses, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

// Styling
const styles = document.createElement('style')
styles.textContent = `
  .tester-section {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .action-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  button {
    background-color: #4a76a8;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 5px;
  }
  
  button:hover {
    background-color: #3a5a78;
  }
  
  input, select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 5px;
  }
  
  h2 {
    color: #2c3e50;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  
  h3 {
    margin-top: 15px;
    color: #34495e;
  }
`

document.head.appendChild(styles)

export default App
