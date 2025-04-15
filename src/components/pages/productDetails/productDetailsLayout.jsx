import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearSelectedProduct } from '../../../redux/slices/productSlice';

// Import components
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductDescription from './components/ProductDescription';
import RelatedProducts from './components/RelatedProducts';
import AddToCartSection from './components/AddToCartSection';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

// Import styles
import './style/productDetails.css';

const ProductDetailsLayout = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get product data from Redux store
  const { 
    selectedProduct: product, 
    loading, 
    error 
  } = useSelector(state => state.products);
  
  // Fetch product data when component mounts or productId changes
  useEffect(() => {
    if (productId) {
      console.log(`Fetching product with ID: ${productId}`);
      dispatch(fetchProductById(productId));
    }
    
    // Clear selected product when component unmounts
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [productId, dispatch]);
  
  // Handle back to products navigation
  const handleBackToProducts = () => {
    navigate('/products');
  };
  
  if (loading) {
    return (
      <div className="product-details-page">
        <div className="loading-container">
          <LoadingSpinner />
          <p>Unveiling mystical item...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="product-details-page">
        <div className="error-message">
          <h2>🔮 The Crystal Ball Is Cloudy</h2>
          <p>{error || "We couldn't find the mystical item you're looking for."}</p>
          <button onClick={handleBackToProducts}>Return to Shop</button>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="product-details-page">
        <div className="error-message">
          <h2>🔮 Item Not Found</h2>
          <p>This mystical artifact seems to have vanished into the ethereal plane.</p>
          <button onClick={handleBackToProducts}>Return to Shop</button>
        </div>
      </div>
    );
  }
  
  // Safely extract data from product with fallbacks
  const categoryName = product.categoryName || (product.category && typeof product.category === 'string' ? product.category : '');
  const categoryId = product.categoryId || 
                    (product.category && typeof product.category === 'object' ? product.category.id : 
                     (product.category && typeof product.category === 'string' ? product.category : null));
  
  // Determine if we should show related products
  const showRelatedProducts = !!categoryId;
  
  console.log("Product data loaded:", {
    id: product.id,
    name: product.name,
    categoryId: categoryId,
    categoryName: categoryName
  });
  
  return (
    <div className="product-details-page">
      {/* Main Product Section */}
      <div className="product-main-section">
        <ProductGallery imageUrl={product.imageUrl} productName={product.name} />
        
        <div className="product-details-container">
          <ProductInfo 
            name={product.name}
            price={product.price}
            ratings={product.ratings}
            categoryName={categoryName}
            discount={product.discount || product.discountPercentage || 0}
          />
          
          <AddToCartSection 
            productId={product.id}
            stock={product.quantity || product.stock || 0}
            price={product.price}
            discount={product.discount || product.discountPercentage || 0}
            productName={product.name}
            imageUrl={product.imageUrl}
          />
        </div>
      </div>
      
      {/* Product Description & Specs */}
      <ProductDescription 
        description={product.longDescription || product.description}
        specifications={product.specifications || []}
      />
      
      {/* Related Products - only show if we have a category */}
      {showRelatedProducts && categoryId && (
        <RelatedProducts 
          categoryId={String(categoryId)}
          currentProductId={String(product.id)}
        />
      )}
      
      {/* Back to Top Button */}
      <button 
        className="back-to-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑ Back to Top
      </button>
    </div>
  );
};

export default ProductDetailsLayout; 