import React, { useEffect } from 'react';
import './styles.css';
import HeroSection from './components/hero';
import ParticleBackground from './components/ParticleBackground';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Testimonials from './components/Testimonials';
import StorySection from './components/StorySection';
import Newsletter from './components/Newsletter';

const HomeLayout = () => {
  // Reset scroll position when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Log component mounting
    console.log("HomeLayout component mounted");
  }, []);

  return (
    <div className="home-page">
      {/* Hero section */}
      <div className="hero-container" style={{ 
        height: '100vh', 
        width: '100%', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <HeroSection />
      </div>
      
      {/* Content sections below hero */}
      <div className="home-content">
        {/* Particle background for decorative effect */}
        <ParticleBackground mode="float" intensity="low" color="ember" />
        
        {/* Content sections with higher z-index */}
        <div style={{ 
          position: 'relative', 
          zIndex: 20, 
          backgroundColor: 'transparent'
        }}>
          <div style={{ margin: '0 0 80px 0' }}>
            <FeaturedProducts />
          </div>
          
          <div style={{ margin: '0 0 80px 0' }}>
            <Categories />
          </div>
          
          <div style={{ margin: '0 0 80px 0' }}>
            <Testimonials />
          </div>
          
          <div style={{ margin: '0 0 80px 0' }}>
            <StorySection />
          </div>
          
          <div style={{ margin: '0 0 80px 0' }}>
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout; 