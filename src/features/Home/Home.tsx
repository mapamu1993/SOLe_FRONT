import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import KitsSection from './components/KitsPreview';
import BlogPreview from './components/BlogPreview';
import TestimonialsSection from './components/Testimonials';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';

const Home = () => {
  return (
    <div className="w-full">
      <Navbar /> 
      

      <HeroSection />
      <AboutSection/>
      <KitsSection/>
      <BlogPreview/>
      <TestimonialsSection/>


      <Footer />
    </div>
  );
};

export default Home;