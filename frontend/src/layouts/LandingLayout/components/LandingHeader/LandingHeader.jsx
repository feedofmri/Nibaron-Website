import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const LandingHeader = () => {
  return (
    <motion.header
      className="landing-header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 2C16 2 12 6 12 10C12 14 16 16 16 16C16 16 20 14 20 10C20 6 16 2 16 2Z"
                fill="currentColor"
                className="text-primary-500"
              />
              <path
                d="M16 16C16 16 12 18 12 22C12 26 16 30 16 30C16 30 20 26 20 22C20 18 16 16 16 16Z"
                fill="currentColor"
                className="text-accent-500"
              />
            </svg>
          </div>
          <span className="logo-text">Nibaron Bazaar</span>
        </Link>

        {/* Navigation */}
        <nav className="header-nav">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Auth Buttons */}
        <div className="header-auth">
          <Link to="/login" className="btn-outline">
            Sign In
          </Link>
          <Link to="/signup" className="btn-primary">
            Get Started
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.header>
  );
};

export default LandingHeader;
