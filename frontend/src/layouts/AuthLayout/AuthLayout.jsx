import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthCard from './components/AuthCard';
import AuthBackground from './components/AuthBackground';
import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <AuthBackground />

      <div className="auth-content">
        <motion.div
          className="auth-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children || <Outlet />}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
