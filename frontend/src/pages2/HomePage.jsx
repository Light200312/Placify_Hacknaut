import React from 'react';
import Header from '../components2/Home/Header';
import HeroSection from '../components2/Home/HeroSection';
import FeaturedCompanies from '../components2/Home/FeaturedCompanies';
import FeaturesSection from '../components2/Home/FeaturesSection';
import HowItWorksSection from '../components2/Home/HowItWorksSection';
import TestimonialsSection from '../components2/Home/TestimonialsSection';
import CTASection from '../components2/Home/CTASection';
import Footer from '../components2/Home/Footer';

function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      <HeroSection />
      <FeaturedCompanies />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default HomePage;
