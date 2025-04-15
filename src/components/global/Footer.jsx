import React from 'react';
import { Link } from 'react-router-dom';
// import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" style={{ 
      position: 'relative',
      zIndex: 25,
      background: 'linear-gradient(to right, rgba(43, 43, 61, 0.95), rgba(58, 43, 77, 0.95))',
      backdropFilter: 'blur(5px)'
    }}>
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-section about-section">
            <h3 className="footer-title">Mystical Marketplace</h3>
            <p className="footer-description">
              Your premier destination for all magical necessities. Quality mystical products since 1692.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <span className="social-icon">📘</span>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <span className="social-icon">📷</span>
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <span className="social-icon">📌</span>
              </a>
            </div>
          </div>
          
          <div className="footer-section links-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/products" className="footer-link">Shop</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div className="footer-section category-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li><Link to="/category/potions" className="footer-link">Potions</Link></li>
              <li><Link to="/category/spellbooks" className="footer-link">Spell Books</Link></li>
              <li><Link to="/category/crystals" className="footer-link">Crystals</Link></li>
              <li><Link to="/category/herbs" className="footer-link">Herbs</Link></li>
              <li><Link to="/category/artifacts" className="footer-link">Magical Artifacts</Link></li>
            </ul>
          </div>
          
          <div className="footer-section contact-section">
            <h3 className="footer-title">Contact Us</h3>
            <p className="contact-info">
              <span className="contact-icon">📍</span> 42 Diagon Alley, London
            </p>
            <p className="contact-info">
              <span className="contact-icon">📧</span> support@mysticalmarketplace.com
            </p>
            <p className="contact-info">
              <span className="contact-icon">📱</span> +44 20 7946 0713
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Mystical Marketplace. All rights reserved.
          </p>
          <p className="footer-disclaimer">
            Magic is real, but our website's legal jurisdiction follows mortal laws.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 