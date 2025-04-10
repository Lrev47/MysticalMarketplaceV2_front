import React, { useState, useEffect } from 'react';
import '../style/ProductGallery.css';

const ProductGallery = ({ imageUrl, productName }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadedImageUrl, setLoadedImageUrl] = useState(null);
  
  // Default fallback image - using URL-encoded SVG for reliability
  const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23546e7a" /%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="%23ffffff"%3EMystical Product%3C/text%3E%3C/svg%3E';
  
  // Process image to add fallback
  useEffect(() => {
    if (!imageUrl) {
      console.log('No product image URL provided, using fallback');
      setLoadedImageUrl(fallbackImage);
      setImageLoaded(true);
      return;
    }
    
    console.log('Loading product image:', imageUrl);
    
    // Preload image and verify it loads correctly
    const image = new Image();
    image.onload = () => {
      console.log('Product image loaded successfully');
      setLoadedImageUrl(imageUrl);
      setImageLoaded(true);
    };
    image.onerror = () => {
      console.log(`Product image failed to load: ${imageUrl}`);
      setLoadedImageUrl(fallbackImage);
      setImageLoaded(true);
    };
    image.src = imageUrl;
  }, [imageUrl]);
  
  // Handle zoom toggle
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };
  
  // Handle mouse movement for zoom effect
  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  // Show loading state while image is loading
  if (!imageLoaded) {
    return (
      <div className="product-gallery">
        <div className="main-image-container loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="product-gallery">
      {/* Main Image */}
      <div 
        className={`main-image-container ${isZoomed ? 'zoomed' : ''}`}
        onClick={handleZoomToggle}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <div 
          className="main-image" 
          style={{
            backgroundImage: `url(${loadedImageUrl})`,
            backgroundPosition: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center'
          }}
        />
        
        <div className="zoom-instructions">
          {isZoomed ? 'Click to exit zoom' : 'Click to zoom'}
        </div>
        
        <div className="mystic-overlay"></div>
      </div>
    </div>
  );
};

export default ProductGallery; 