import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaSadTear } from 'react-icons/fa';
import '../style/EmptyCart.css';

const EmptyCart = () => {
  const navigate = useNavigate();
  
  return (
    <div className="empty-cart">
      <div className="empty-cart-icon">
        <FaSadTear />
        <div className="mystical-glow"></div>
      </div>
      
      <h2>Your Mystical Cart is Empty</h2>
      
      <p>
        It seems your cart is devoid of magical items. Explore our collection
        of mystical treasures and enchanted artifacts to fill your cart with wonder!
      </p>
      
      <button 
        className="shop-now-btn" 
        onClick={() => navigate('/products')}
      >
        <FaShoppingBag className="btn-icon" />
        <span>Explore Magical Items</span>
      </button>
      
      <div className="popular-categories">
        <h3>Popular Categories</h3>
        <div className="category-links">
          <button onClick={() => navigate('/products?category=potions')}>
            Potions
          </button>
          <button onClick={() => navigate('/products?category=crystals')}>
            Crystals
          </button>
          <button onClick={() => navigate('/products?category=spellbooks')}>
            Spellbooks
          </button>
          <button onClick={() => navigate('/products?category=artifacts')}>
            Artifacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart; 