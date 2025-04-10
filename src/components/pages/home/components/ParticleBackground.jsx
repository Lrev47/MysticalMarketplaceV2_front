import { useEffect, useRef } from 'react';

const ParticleBackground = ({ mode = 'float', intensity = 'medium', color = 'ember' }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Canvas setup and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    // Set canvas to full width/height
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Particle class for embers
    class Particle {
      constructor() {
        // Determine size based on intensity
        let sizeMultiplier = 1;
        if (intensity === 'low') sizeMultiplier = 0.6;
        if (intensity === 'high') sizeMultiplier = 1.4;
        
        // Basic properties
        this.size = (Math.random() * 3 + 0.5) * sizeMultiplier; // Smaller particles overall
        this.opacity = Math.random() * 0.4 + 0.2; // More subtle opacity
        
        // Color selection based on theme
        this.color = this.getColor(color);
        
        // Position - distribute across screen
        this.x = Math.random() * canvas.width;
        
        if (mode === 'rise') {
          // Rising particles start from bottom
          this.y = canvas.height + Math.random() * 20;
          this.speedY = (Math.random() * 0.7 + 0.3) * sizeMultiplier; // Rising speed
          this.speedX = (Math.random() - 0.5) * 0.5 * sizeMultiplier; // Slight horizontal drift
        } else { // float mode
          // Floating particles can be anywhere
          this.y = Math.random() * canvas.height;
          this.speedY = (Math.random() - 0.5) * 0.3 * sizeMultiplier; // Random up/down float
          this.speedX = (Math.random() - 0.5) * 0.3 * sizeMultiplier; // Random left/right float
        }
        
        this.life = 0;
        this.maxLife = Math.random() * 300 + 100;
      }
      
      getColor(theme) {
        let colors;
        
        if (theme === 'ember') {
          // Warm ember colors
          colors = [
            '#ff4500', // Red-orange
            '#ff7f50', // Coral
            '#ff8c00', // Dark orange
            '#ffa500', // Orange
            '#ffcc00', // Gold
          ];
        } else if (theme === 'magic') {
          // Magic/purple colors
          colors = [
            '#9966cc', // Amethyst
            '#8a2be2', // BlueViolet
            '#9370db', // MediumPurple
            '#ba55d3', // MediumOrchid
            '#9932cc', // DarkOrchid
          ];
        } else if (theme === 'mystic') {
          // Mix of blue and purple
          colors = [
            '#4169e1', // RoyalBlue
            '#7b68ee', // MediumSlateBlue
            '#6a5acd', // SlateBlue
            '#483d8b', // DarkSlateBlue
            '#4682b4', // SteelBlue
          ];
        }
        
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        if (mode === 'rise') {
          // Particles move upward
          this.y -= this.speedY;
          this.x += this.speedX;
          
          // Slowly reduce size as it rises
          if (this.size > 0.2) this.size -= 0.003;
        } else {
          // Floating movement with subtle sine wave
          this.y += this.speedY + Math.sin(this.life / 30) * 0.1;
          this.x += this.speedX + Math.cos(this.life / 30) * 0.1;
          
          // Wrap around edges
          if (this.x < 0) this.x = canvas.width;
          if (this.x > canvas.width) this.x = 0;
          if (this.y < 0) this.y = canvas.height;
          if (this.y > canvas.height) this.y = 0;
        }
        
        // Increase life
        this.life++;
        
        // Fade out as it reaches its lifespan
        if (this.life > this.maxLife * 0.7) {
          this.opacity -= 0.01;
          if (this.opacity < 0) this.opacity = 0;
        }
      }
      
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Outer glow
        ctx.shadowBlur = 5 + this.size * 2;
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
        if (mode === 'rise') {
          return this.opacity <= 0 || this.y < 0 || this.size <= 0.1;
        } else {
          return this.opacity <= 0;
        }
      }
    }

    // Initialize canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      // Semi-transparent background to create trails
      ctx.fillStyle = 'rgba(26, 26, 46, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Determine particle creation rate based on intensity
      let particleCreationChance = 0.15; // medium default
      if (intensity === 'low') particleCreationChance = 0.07;
      if (intensity === 'high') particleCreationChance = 0.25;
      
      // Add new particles randomly
      if (Math.random() < particleCreationChance) {
        let particlesToAdd = mode === 'rise' ? 3 : 1;
        for (let i = 0; i < particlesToAdd; i++) {
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
  }, [mode, intensity, color]);

  return (
    <canvas 
      ref={canvasRef} 
      className="particle-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: intensity === 'low' ? 0.7 : 1
      }}
    />
  );
};

export default ParticleBackground; 