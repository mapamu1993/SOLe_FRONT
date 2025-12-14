import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import KitsSection from './components/KitsPreview';
import BlogPreview from './components/BlogPreview';
import TestimonialsSection from './components/Testimonials';


const Home = () => {
  return (
    <div className="w-full">
      
      <HeroSection />

      
      <AboutSection/>


      <KitsSection/>


      <BlogPreview/>


      <TestimonialsSection/>

    </div>
  );
};

export default Home;