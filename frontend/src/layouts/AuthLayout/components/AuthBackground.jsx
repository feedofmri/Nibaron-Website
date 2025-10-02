import React from 'react';
import { motion } from 'framer-motion';

const AuthBackground = () => {
  return (
    <div className="auth-background">
      {/* Grid Pattern */}
      <div className="auth-grid-pattern" />

      {/* Floating Elements */}
      <div className="auth-floating-elements">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="auth-floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? '🌾' : i % 3 === 1 ? '🍃' : '•'}
          </motion.div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="auth-gradient-overlay" />
    </div>
  );
};

export default AuthBackground;
