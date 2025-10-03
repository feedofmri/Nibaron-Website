import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import FloatingElements from './components/FloatingElements/FloatingElements';
import CTAButtons from './components/CTAButtons';
import ScrollIndicator from './components/ScrollIndicator';
import './HeroSection.css';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className="hero-section">
      {/* Background Effects */}
      <div className="hero-background">
        <div className="gradient-mesh" />
        <div className="grid-pattern" />
        <FloatingElements />
      </div>

      {/* Hero Content */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          willChange: 'auto', // Optimize for performance
          transform: 'translateZ(0)', // Force hardware acceleration
          position: 'relative'
        }}
      >
        {/* Logo Animation - Ensure it only animates once */}
        <motion.div
          className="hero-logo"
          variants={itemVariants}
          style={{ willChange: 'auto' }}
        >
          <h1 className="logo-text">
            {'Nibaron Bazaar'.split('').map((char, index) => (
              <motion.span
                key={index}
                className="logo-letter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ willChange: 'auto' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Main Headlines */}
        <motion.div
          className="hero-headlines"
          variants={itemVariants}
          style={{ willChange: 'auto' }}
        >
          <h2 className="hero-title bangla">স্মার্ট কৃষি বাজার</h2>
          <p className="hero-subtitle text-gray-500">
            AI-Powered Crop Predictions. Pre-Order Future Harvests.
            Supported by NASA Satellite Dataset.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          style={{ willChange: 'auto' }}
        >
          <CTAButtons />
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="trust-indicators"
          variants={itemVariants}
          style={{ willChange: 'auto' }}
        >
          <div className="trust-item">
            <span className="trust-number">500+</span>
            <span className="trust-label">Verified Farmers</span>
          </div>
          <div className="trust-divider">•</div>
          <div className="trust-item">
            <span className="trust-number">10,000</span>
            <span className="trust-label">Tons Traded</span>
          </div>
          <div className="trust-divider">•</div>
          <div className="trust-item">
            <span className="trust-number">95%</span>
            <span className="trust-label">Prediction Accuracy</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
