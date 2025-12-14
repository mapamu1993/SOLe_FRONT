import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import KitsSection from './components/KitsPreview';
import BlogPreview from './components/BlogPreview';
import TestimonialsSection from './components/Testimonials';
// AÑADE ESTAS IMPORTACIONES:
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';

const Home = () => {
  return (
    <div className="w-full">
      {/* 1. PON EL NAVBAR AQUÍ ARRIBA */}
      <Navbar /> 
      
      <HeroSection />
      <AboutSection/>
      <KitsSection/>
      <BlogPreview/>
      <TestimonialsSection/>

      {/* 2. PON EL FOOTER AQUÍ ABAJO */}
      <Footer />
    </div>
  );
};

export default Home;