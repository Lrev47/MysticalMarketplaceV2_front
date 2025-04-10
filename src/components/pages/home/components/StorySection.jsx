import React from 'react';

const StorySection = () => {
  return (
    <section className="story-section" style={{ 
      backgroundColor: 'rgba(22, 33, 62, 0.7)', 
      backdropFilter: 'blur(3px)',
      boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(79, 157, 233, 0.2)',
      border: '1px solid rgba(79, 157, 233, 0.2)',
      position: 'relative',
      zIndex: 5
    }}>
      <h2 className="section-title">Our Mystical Journey</h2>
      <p className="section-description">
        The magical tale of how our marketplace came to be.
      </p>
      
      <div className="story-content" style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '30px',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap'
      }}>
        <div className="story-image" style={{
          backgroundColor: 'rgba(26, 26, 46, 0.5)',
          backdropFilter: 'blur(2px)',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(79, 157, 233, 0.15)',
          borderRadius: '12px',
          minHeight: '300px',
          flex: '1 1 300px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <img 
            src="/Assets/marketplace-hall.jpg" 
            alt="Mystical Marketplace Hall" 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.8
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.parentNode.style.background = 'linear-gradient(135deg, rgba(79, 157, 233, 0.3), rgba(26, 26, 46, 0.8))';
              e.target.parentNode.style.display = 'flex';
              e.target.parentNode.style.justifyContent = 'center';
              e.target.parentNode.style.alignItems = 'center';
              const textNode = document.createElement('span');
              textNode.innerText = '✦ Mystical Marketplace ✦';
              textNode.style.color = 'rgba(255, 255, 255, 0.8)';
              textNode.style.fontSize = '1.4rem';
              textNode.style.fontWeight = 'bold';
              e.target.parentNode.appendChild(textNode);
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(26, 26, 46, 0), rgba(26, 26, 46, 0.8))'
          }}></div>
        </div>
        
        <div className="story-text" style={{
          backgroundColor: 'rgba(26, 26, 46, 0.6)',
          backdropFilter: 'blur(2px)',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(79, 157, 233, 0.15)',
          borderRadius: '8px',
          padding: '25px',
          flex: '1 1 500px',
          maxWidth: '100%'
        }}>
          <p>Founded in the ancient times of 2023, The Mystical Marketplace began as a humble collection of magical artifacts discovered in the depths of digital realms.</p>
          <p>Our mission is to bring the finest magical items to both aspiring and experienced wizards, ensuring that quality and authenticity are never compromised.</p>
          <p>Every item in our collection has been carefully sourced from the most renowned magical craftsmen across the realms. We take pride in offering only the finest enchanted artifacts, potions, and scrolls that will enhance your mystical journey.</p>
          <a href="/about" className="learn-more-btn" style={{
            display: 'inline-block',
            marginTop: '15px',
            padding: '10px 25px',
            background: 'linear-gradient(45deg, rgba(79, 157, 233, 0.8), rgba(138, 115, 250, 0.8))',
            backdropFilter: 'blur(3px)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '30px',
            transition: 'all 0.3s ease'
          }}>Learn More About Us</a>
        </div>
      </div>
    </section>
  );
};

export default StorySection; 