import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavItem = ({ item, isActive, isCollapsed }) => {
  return (
    <Link to={item.path} className={`nav-item ${isActive ? 'active' : ''}`}>
      <div className="nav-item-content">
        {/* Icon */}
        <div className="nav-item-icon">
          {item.icon}
        </div>

        {/* Label */}
        <motion.span
          className="nav-item-label"
          animate={{
            opacity: isCollapsed ? 0 : 1,
            width: isCollapsed ? 0 : 'auto',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {item.label}
        </motion.span>

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            className="active-indicator"
            layoutId="activeIndicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="nav-tooltip">
          {item.label}
        </div>
      )}
    </Link>
  );
};

export default NavItem;
