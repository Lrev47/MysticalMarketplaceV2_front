import { useEffect, useRef, useState } from 'react';
import '../styles.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const [logoVersion, setLogoVersion] = useState('Gradient');
  const animationFrameRef = useRef(null);

  // Switch between logo versions
  const switchLogo = () => {
    if (logoVersion === 'Gradient') {
      setLogoVersion('Gold');
    } else if (logoVersion === 'Gold') {
      setLogoVersion('White');
    } else if (logoVersion === 'White') {
      setLogoVersion('Black');
    } else {
      setLogoVersion('Gradient');
    }
  };

  // Canvas setup and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Create a particle
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 20;
        this.size = Math.random() * 3 + 0.8; // Slightly smaller for better aesthetics
        this.speedY = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1;
        this.color = this.getRandomColor();
        this.life = 0;
        this.maxLife = Math.random() * 400 + 100;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      getRandomColor() {
        // Warm ember colors: oranges, reds, yellows
        const colors = [
          '#ff4500', // Red-orange
          '#ff7f50', // Coral
          '#ff8c00', // Dark orange
          '#ffa500', // Orange
          '#ffcc00', // Gold
          '#ff0000', // Red
          '#ff4d00'  // Bright orange
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Move the particle upwards
        this.y -= this.speedY;
        this.x += this.speedX;
        
        // Slowly reduce size as it rises
        if (this.size > 0.2) this.size -= 0.01;
        
        // Fade out as it reaches its lifespan
        this.life++;
        
        if (this.life > this.maxLife * 0.7) {
          this.opacity -= 0.01;
          if (this.opacity < 0) this.opacity = 0;
        }
      }

      draw(ctx) {
        // Create a glowing effect
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Outer glow - slightly reduced
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.restore();
      }

      // Check if the particle needs to be removed
      isExpired() {
        return this.opacity <= 0 || this.y < 0 || this.size <= 0.1;
      }
    }

    // Initialize canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      // Semi-transparent background to create trails
      ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add new particles randomly - reduced frequency and quantity
      if (Math.random() < 0.15) {
        for (let i = 0; i < 2; i++) {
          particles.push(new Particle());
        }
      }
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);
        
        // Remove expired particles
        if (particle.isExpired()) {
          particles.splice(index, 1);
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="hero-section" style={{ position: 'relative', zIndex: 5 }}>
      <canvas 
        ref={canvasRef} 
        className="particle-canvas"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 4
        }}
      />
      
      <div className="hero-content" style={{ position: 'relative', zIndex: 10 }}>
        <div className="logo-container">
          <img
            src={`/Assets/Mystical-Marketplace-${logoVersion}.svg`}
            alt="Mystical Marketplace Logo"
            className="logo"
            onClick={switchLogo}
          />
        </div>
        
        <h1 className="hero-title">Mystical Marketplace</h1>
        <p className="hero-subtitle">Discover the Magic Within</p>
        
        <div className="hero-actions">
          <a href="/product-listing" className="cta-button">Explore Products</a>
        </div>
      </div>
    </div>
  );
};

export default Hero; 