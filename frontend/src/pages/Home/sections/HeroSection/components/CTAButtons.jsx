import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const CTAButtons = () => {
  return (
    <div className="cta-buttons">
      <Link to="/marketplace">
        <motion.button
          className="btn-primary cta-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Browse Marketplace</span>
          <ArrowRight size={20} className="ml-2" />
        </motion.button>
      </Link>

      <Link to="/pre-orders">
        <motion.button
          className="btn-outline cta-secondary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play size={18} className="mr-2" />
          <span>View Pre-Orders</span>
        </motion.button>
      </Link>
    </div>
  );
};

export default CTAButtons;
