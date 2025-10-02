import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <motion.div
        className="not-found-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 404 Illustration */}
        <div className="not-found-illustration">
          <div className="error-code">404</div>
          <div className="error-icon">🌾</div>
        </div>

        {/* Content */}
        <div className="not-found-text">
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-description">
            The page you're looking for seems to have wandered off like a lost farmer in the fields.
            Let's help you find your way back to the marketplace.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            <Home size={20} />
            Go Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-outline">
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="helpful-links">
          <h3>Popular Pages:</h3>
          <div className="links-grid">
            <Link to="/marketplace" className="helpful-link">
              🛍️ Browse Marketplace
            </Link>
            <Link to="/pre-orders" className="helpful-link">
              📦 View Pre-Orders
            </Link>
            <Link to="/community" className="helpful-link">
              👥 Join Community
            </Link>
            <Link to="/auth/register" className="helpful-link">
              🚀 Get Started
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
