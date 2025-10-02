import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TrendIndicator from './components/TrendIndicator/TrendIndicator';
import './StatCard.css';

const StatCard = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Parse numeric value from stat.value
  const getNumericValue = (value) => {
    const numStr = value.replace(/[^\d.,]/g, '');
    const num = parseFloat(numStr.replace(/,/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const targetValue = getNumericValue(stat.value);

  // Animate counter when component comes into view
  useEffect(() => {
    if (isVisible && targetValue > 0) {
      const duration = 2000;
      const steps = 60;
      const stepValue = targetValue / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCount(Math.floor(stepValue * currentStep));
        } else {
          setCount(targetValue);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, targetValue]);

  const formatDisplayValue = (value) => {
    const originalValue = stat.value;
    if (originalValue.includes('৳')) {
      return `৳${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      className={`stat-card stat-card--${stat.color}`}
      variants={cardVariants}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 }
      }}
      onViewportEnter={() => setIsVisible(true)}
    >
      {/* Icon */}
      <div className="stat-card__icon">
        {stat.icon}
      </div>

      {/* Content */}
      <div className="stat-card__content">
        <h3 className="stat-card__title">{stat.title}</h3>

        <div className="stat-card__value">
          {targetValue > 0 ? formatDisplayValue(count) : stat.value}
        </div>

        <TrendIndicator
          change={stat.change}
          type={stat.changeType}
        />
      </div>

      {/* Background Pattern */}
      <div className="stat-card__pattern">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <pattern id={`pattern-${stat.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#pattern-${stat.id})`}/>
        </svg>
      </div>

      {/* Glow Effect */}
      <div className="stat-card__glow" />
    </motion.div>
  );
};

export default StatCard;
