import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../../redux/slices/categorySlice';
import '../style/RelatedProducts.css';

const RelatedProducts = ({ categoryId, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get data from Redux store
  const { productsByCategory, loading, error } = useSelector(state => state.categories);
  
  // Fetch products for this category when component mounts or categoryId changes
  useEffect(() => {
    if (categoryId) {
      console.log(`🔍 Fetching products for category ID: ${categoryId}`);
      dispatch(fetchProductsByCategory(categoryId))
        .unwrap()
        .catch(err => {
          setFetchError(err?.message || 'Failed to fetch related products');
          console.error('Error in RelatedProducts component:', err);
        });
    } else {
      console.log('⚠️ No categoryId provided to RelatedProducts');
      setRelatedProducts([]);
    }
  }, [categoryId, dispatch]);
  
  // Process the fetched data whenever it changes
  useEffect(() => {
    try {
      if (!loading && productsByCategory && categoryId && productsByCategory[categoryId]) {
        const products = productsByCategory[categoryId];
        console.log(`📦 Processing ${products ? (Array.isArray(products) ? products.length : 'non-array') : 'undefined'} products from category ${categoryId}`);
        
        // Check if products is an array before filtering
        if (!Array.isArray(products)) {
          console.log('⚠️ Products is not an array:', products);
          setRelatedProducts([]);
          return;
        }
        
        if (products.length === 0) {
          console.log('⚠️ Products array is empty');
          setRelatedProducts([]);
          return;
        }
        
        // Step 1: Filter out the current product and any invalid products
        const filteredProducts = products.filter(product => 
          product && 
          product.id && 
          currentProductId && 
          product.id.toString() !== currentProductId.toString()
        );
        
        console.log(`🔄 After filtering current product: ${filteredProducts.length} products remain`);
        
        if (filteredProducts.length === 0) {
          console.log('⚠️ No products left after filtering');
          setRelatedProducts([]);
          return;
        }
        
        // Step 2: Shuffle the products
        const shuffledProducts = shuffleArray([...filteredProducts]);
        
        // Step 3: Take only up to 3 products
        const selectedProducts = shuffledProducts.slice(0, 3);
        
        console.log(`✅ Selected ${selectedProducts.length} products to display`);
        
        setRelatedProducts(selectedProducts);
        setFetchError(null);
      } else {
        // Reset related products if data is not available
        setRelatedProducts([]);
      }
    } catch (err) {
      console.error('Error processing related products:', err);
      setRelatedProducts([]);
      setFetchError('Error processing related products data');
    }
  }, [productsByCategory, categoryId, loading, currentProductId]);
  
  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    if (!Array.isArray(array)) return [];
    try {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    } catch (err) {
      console.error('Error shuffling array:', err);
      return array; // Return original array if shuffling fails
    }
  };
  
  // Safe navigation to product details to prevent infinite loops
  const handleProductClick = (e, productId) => {
    if (!e || !productId) return;
    
    e.preventDefault();
    if (productId.toString() === currentProductId?.toString()) {
      return; // Don't navigate to the same product or invalid ID
    }
    
    // Use navigate instead of Link to have more control
    navigate(`/product/${productId}`);
  };
  
  if (loading) {
    return (
      <div className="related-products-section">
        <h2 className="section-title">You May Also Like</h2>
        <div className="loading-placeholder">
          <div className="loading-card"></div>
          <div className="loading-card"></div>
          <div className="loading-card"></div>
        </div>
      </div>
    );
  }
  
  if (fetchError) {
    console.log('❌ Error fetching related products:', fetchError);
    return null; // Don't show anything if there was an error
  }
  
  // Only return a component if we actually have products to show
  if (!relatedProducts || relatedProducts.length === 0) {
    console.log('📭 No related products to display');
    return null;
  }
  
  // Calculate discounted price
  const getPrice = (product) => {
    if (!product || !product.price) return '0.00';
    
    // Ensure price is a number
    const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    
    // If no valid discount, return the original price
    if (!product.discount || isNaN(product.discount) || product.discount <= 0) {
      return price.toFixed(2);
    }
    
    // Calculate discounted price
    const discountedPrice = price - (price * (product.discount / 100));
    return discountedPrice.toFixed(2);
  };
  
  return (
    <div className="related-products-section">
      <h2 className="section-title">
        You May Also Like
      </h2>
      
      <div className="related-products-grid">
        {relatedProducts.map(product => (
          <a 
            href={`/product/${product.id}`}
            className="related-product-card" 
            key={product.id}
            onClick={(e) => handleProductClick(e, product.id)}
          >
            <div className="related-product-image-container">
              <img 
                src={product.imageUrl || 'https://via.placeholder.com/300x200?text=Mystical+Item'} 
                alt={product.name || 'Mystical Item'}
                className="related-product-image"
                onError={(e) => {
                  console.log(`Error loading image for product ${product.id}`);
                  e.target.src = 'https://via.placeholder.com/300x200?text=Mystical+Item';
                  e.target.onerror = null; // Prevent infinite loops
                }}
              />
              
              {product.discount && product.discount > 0 && (
                <div className="related-discount-badge">
                  {product.discount}% OFF
                </div>
              )}
              
              <div className="related-mystical-overlay"></div>
            </div>
            
            <div className="related-product-info">
              <h3 className="related-product-name">{product.name || 'Mystical Item'}</h3>
              
              <div className="related-product-price">
                {product.discount && product.discount > 0 && (
                  <span className="related-original-price">
                    ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : (product.price ? product.price.toFixed(2) : '0.00')}
                  </span>
                )}
                <span className="related-price">
                  ${getPrice(product)}
                </span>
              </div>
              
              <div className="related-category">
                {product.category || product.categoryName || ""}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts; 