import React from 'react';
import HeroSection from './sections/HeroSection/HeroSection';
import FeaturesSection from './sections/FeaturesSection/FeaturesSection';
import HowItWorksSection from './sections/HowItWorksSection/HowItWorksSection';
import StatsSection from './sections/StatsSection/StatsSection';
import CTASection from './sections/CTASection/CTASection';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <HowItWorksSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default Home;
