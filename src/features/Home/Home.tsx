import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import KitsSection from './components/KitsPreview';
import BlogPreview from './components/BlogPreview';
import TestimonialsSection from './components/Testimonials';
// Eliminamos Navbar y Footer de los imports

const Home = () => {
  return (
    <div className="w-full">
      {/* El Navbar ya vendrá por el Layout */}
      
      <HeroSection />
      <AboutSection/>
      <KitsSection/>
      <BlogPreview/>
      <TestimonialsSection/>

      {/* El Footer ya vendrá por el Layout */}
    </div>
  );
};

export default Home;