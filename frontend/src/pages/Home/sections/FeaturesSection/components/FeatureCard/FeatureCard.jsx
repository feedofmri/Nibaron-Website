import React from 'react';
import { motion } from 'framer-motion';
import './FeatureCard.css';

const FeatureCard = ({ feature, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      className={`feature-card feature-card--${feature.color}`}
      variants={cardVariants}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      <div className="feature-card__content">
        {/* Icon */}
        <div className="feature-card__icon">
          {feature.icon}
        </div>

        {/* Title */}
        <h3 className="feature-card__title">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="feature-card__description">
          {feature.description}
        </p>

        {/* Benefits List */}
        <ul className="feature-card__benefits">
          {feature.benefits.map((benefit, idx) => (
            <li key={idx} className="feature-card__benefit">
              <svg className="benefit-check" width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                  fill="currentColor"
                />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Hover Animation Background */}
      <div className="feature-card__glow" />
    </motion.div>
  );
};

export default FeatureCard;
