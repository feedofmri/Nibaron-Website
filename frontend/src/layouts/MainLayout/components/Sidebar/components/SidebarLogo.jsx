import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SidebarLogo = ({ isCollapsed }) => {
  return (
    <Link to="/dashboard" className="logo-container">
      <div className="logo-content">
        {/* Logo Icon */}
        <div className="logo-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="logo-svg"
          >
            {/* Wheat/Rice grain icon */}
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
            <path
              d="M8 12C8 12 6 16 10 16C14 16 16 12 16 12"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary-500"
            />
            <path
              d="M24 12C24 12 26 16 22 16C18 16 16 12 16 12"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary-500"
            />
          </svg>
        </div>

        {/* Logo Text */}
        <motion.div
          className="logo-text"
          animate={{
            opacity: isCollapsed ? 0 : 1,
            width: isCollapsed ? 0 : 'auto',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <h1 className="logo-title">Nibaron</h1>
          <span className="logo-subtitle">Bazaar</span>
        </motion.div>
      </div>
    </Link>
  );
};

export default SidebarLogo;
