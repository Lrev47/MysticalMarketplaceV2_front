import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../../../redux/slices/productSlice';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { featuredProducts, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    // Fetch featured products when component mounts
    // Limit to 8 products for display
    console.log('FeaturedProducts component: Dispatching fetchFeaturedProducts');
    dispatch(fetchFeaturedProducts(8));
  }, [dispatch]);

  // Log what we received from Redux state
  useEffect(() => {
    console.log('FeaturedProducts component state:', { 
      featuredProductsLength: featuredProducts?.length || 0,
      loading, 
      error,
      featuredProductsSample: featuredProducts?.slice(0, 2) || 'none'
    });
  }, [featuredProducts, loading, error]);

  // Show loading spinner while fetching data
  if (loading && !featuredProducts.length) {
    return (
      <section className="featured-products-section" style={{ position: 'relative', zIndex: 10 }}>
        <h2 className="section-title">Featured Magical Items</h2>
        <div className="loading-container" style={{ textAlign: 'center', padding: '3rem 0' }}>
          <LoadingSpinner />
          <p>Summoning magical artifacts...</p>
        </div>
      </section>
    );
  }

  // Show error message if fetch failed
  if (error && !featuredProducts.length) {
    console.error('FeaturedProducts component error:', error);
    return (
      <section className="featured-products-section" style={{ position: 'relative', zIndex: 10 }}>
        <h2 className="section-title">Featured Magical Items</h2>
        <div className="error-message" style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
          <p>Failed to retrieve magical items. The crystal ball is cloudy.</p>
          <p>Error: {typeof error === 'string' ? error : 'Unknown error'}</p>
          <button 
            className="view-product-btn"
            onClick={() => dispatch(fetchFeaturedProducts(8))}
            style={{ marginTop: '1rem' }}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Log when we're about to render products
  if (featuredProducts.length > 0) {
    console.log(`FeaturedProducts component: Rendering ${featuredProducts.length} products`);
  } else {
    console.log('FeaturedProducts component: No products to render');
  }

  // Custom styles for smaller product cards
  const featuredGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px'
  };

  const productCardStyle = {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 3px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(26, 26, 46, 0.6)',
    border: '1px solid rgba(79, 157, 233, 0.1)'
  };

  const productImageWrapperStyle = {
    position: 'relative',
    paddingBottom: '65%', // Reduced height for image
    overflow: 'hidden'
  };

  const productTitleStyle = {
    padding: '15px 15px 5px',
    fontSize: '1rem',
    color: '#ffffff',
    margin: 0
  };

  const productPriceStyle = {
    padding: '0 15px',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#4f9de9',
    margin: '5px 0'
  };

  const viewButtonStyle = {
    margin: '10px 15px 15px',
    padding: '8px 0',
    backgroundColor: 'rgba(79, 157, 233, 0.2)',
    color: '#ffffff',
    border: '1px solid rgba(79, 157, 233, 0.5)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 'auto'
  };

  return (
    <section className="featured-products-section" style={{ 
      position: 'relative', 
      zIndex: 10,
      backgroundColor: 'rgba(22, 33, 62, 0.7)', 
      backdropFilter: 'blur(3px)',
      boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(79, 157, 233, 0.2)',
      border: '1px solid rgba(79, 157, 233, 0.2)'
    }}>
      <h2 className="section-title">Featured Magical Items</h2>
      <p className="section-description">
        Discover our most coveted mystical artifacts, each infused with ancient power.
      </p>
      
      <div style={{
        ...featuredGridStyle,
        position: 'relative',
        zIndex: 10
      }}>
        {featuredProducts.length > 0 ? (
          featuredProducts.slice(0, 8).map(product => (
            <div style={{
              ...productCardStyle,
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              backdropFilter: 'blur(2px)',
              boxShadow: '0 3px 15px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(79, 157, 233, 0.15)'
            }} key={product.id}>
              <div style={productImageWrapperStyle}>
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/Assets/placeholder-image.jpg";
                  }}
                />
                <div className="product-hover-effect"></div>
              </div>
              <h3 style={productTitleStyle}>{product.name}</h3>
              <p style={productPriceStyle}>${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}</p>
              <button 
                style={viewButtonStyle}
                onClick={() => window.location.href = `/product/${product.id}`}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
            <p>No featured products available at the moment.</p>
          </div>
        )}
      </div>
      
      <div className="section-cta">
        <a href="/product-listing" className="browse-all-btn">Browse All Items</a>
      </div>
    </section>
  );
};

export default FeaturedProducts; 