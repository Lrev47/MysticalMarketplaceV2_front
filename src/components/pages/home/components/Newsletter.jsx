import React, { useState } from 'react';

const Newsletter = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  
  // Array of 15 fantasy-themed newsletter confirmation messages
  const magicalConfirmations = [
    "A mystical owl has been dispatched to your realm with arcane scrolls of knowledge!",
    "The Council of Wizards has approved your subscription. Expect magical missives via enchanted parchment!",
    "A fairy messenger is currently navigating through the mists carrying your first scroll!",
    "A raven from beyond the wall has been sent with your magical correspondence!",
    "Your subscription has been sealed with dragon fire. Magical communications shall arrive via phoenix flame!",
    "A bottled message has been cast into the ethereal streams that flow between realms!",
    "Forest sprites are weaving your newsletter from gossamer threads and morning dew!",
    "The ancient crystal ball network has added you to its visions. Prepare for prophetic insights!",
    "The great wizard Merlin himself has added your name to the Book of Subscribers!",
    "Your magical communication will arrive via dream whispers during the next full moon!",
    "A scroll has been inscribed with your name in the Grand Library of Arcane Knowledge!",
    "The enchanted mirror network has been programmed to reflect our newsletters directly to your location!",
    "Your subscription has been cast as a spell. Newsletters will materialize in a puff of purple smoke!",
    "A magically-enhanced carrier pigeon has been released with your first missive!",
    "The magical subscription cauldron bubbles with delight! Prepare for wisdom delivered by spectral messengers!"
  ];
  
  const handleSubscribe = () => {
    // Select a random confirmation message
    const randomIndex = Math.floor(Math.random() * magicalConfirmations.length);
    setConfirmationMessage(magicalConfirmations[randomIndex]);
    
    // Show success message
    setIsSubmitted(true);
    
    // You would typically handle an actual subscription here
    console.log('User subscribed to newsletter');
    
    // Reset success message after a delay
    setTimeout(() => {
      setIsSubmitted(false);
      setConfirmationMessage('');
    }, 6000);
  };
  
  return (
    <section className="newsletter-section" style={{ 
      backgroundColor: 'rgba(22, 33, 62, 0.7)', 
      backdropFilter: 'blur(3px)',
      boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(79, 157, 233, 0.2)',
      border: '1px solid rgba(79, 157, 233, 0.2)',
      position: 'relative',
      zIndex: 5
    }}>
      <div className="newsletter-content">
        <h2>Join Our Mystical Circle</h2>
        <p>Subscribe to receive special offers, product updates, and arcane knowledge directly to your realm.</p>
        
        {isSubmitted ? (
          <div className="success-message" style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'rgba(79, 157, 233, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(79, 157, 233, 0.3)',
            marginTop: '20px',
            animation: 'glowing 2s infinite',
            backdropFilter: 'blur(4px)'
          }}>
            <p style={{ fontSize: '1.1rem' }}>✨ {confirmationMessage} ✨</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <button 
              onClick={handleSubscribe}
              style={{
                padding: '12px 30px',
                fontSize: '1.1rem',
                background: 'linear-gradient(45deg, rgba(79, 157, 233, 0.8), rgba(138, 115, 250, 0.8))',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(79, 157, 233, 0.3)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(3px)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 157, 233, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(79, 157, 233, 0.3)';
              }}
            >
              Subscribe to Magical Dispatches
            </button>
          </div>
        )}
        
        <p className="newsletter-disclaimer" style={{ 
          marginTop: '20px',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          By subscribing, you agree to receive mystical communications. No spam, only magic.
        </p>
      </div>
      
      <style jsx>{`
        @keyframes glowing {
          0% { box-shadow: 0 0 5px rgba(79, 157, 233, 0.5); }
          50% { box-shadow: 0 0 20px rgba(79, 157, 233, 0.8), 0 0 30px rgba(138, 115, 250, 0.5); }
          100% { box-shadow: 0 0 5px rgba(79, 157, 233, 0.5); }
        }
      `}</style>
    </section>
  );
};

export default Newsletter; 