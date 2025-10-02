import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Shield,
  Bell,
  CreditCard,
  HelpCircle,
  Edit3
} from 'lucide-react';
import { useAuth } from '../../../../../../context/AuthContext';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, user } = useAuth();

  if (!user) return null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action) => {
    setIsOpen(false);
    // In real app, handle navigation or actions here
    if (action === 'logout') {
      logout();
    }
  };

  const menuItems = [
    {
      id: 'profile',
      label: 'View Profile',
      icon: User,
      action: 'profile'
    },
    {
      id: 'edit-profile',
      label: 'Edit Profile',
      icon: Edit3,
      action: 'edit-profile'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: 'settings'
    },
    {
      id: 'notifications',
      label: 'Notification Settings',
      icon: Bell,
      action: 'notifications'
    },
    {
      id: 'billing',
      label: 'Billing & Payments',
      icon: CreditCard,
      action: 'billing'
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      action: 'help'
    }
  ];

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10
    }
  };

  const avatarUrl = user.avatar || 'https://picsum.photos/32/32?random=5';

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button
        className={`profile-trigger ${isOpen ? 'active' : ''}`}
        onClick={toggleDropdown}
        aria-label="User profile menu"
      >
        <div className="profile-info">
          <img
            src={avatarUrl}
            alt={user.name}
            className="profile-avatar"
          />
          <div className="profile-details">
            <span className="profile-name">{user.name}</span>
            <span className="profile-role">{user.user_type ? user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1) : ''}</span>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-menu"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <div className="dropdown-header">
              <div className="user-info">
                <img
                  src={avatarUrl}
                  alt={user.name}
                  className="user-avatar"
                />
                <div className="user-details">
                  <h4 className="user-name">
                    {user.name}
                    {user.verified && (
                      <Shield size={14} className="verified-badge" />
                    )}
                  </h4>
                  <p className="user-email">{user.email}</p>
                  <span className="user-role-badge">{user.user_type ? user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1) : ''}</span>
                </div>
              </div>
            </div>

            <div className="dropdown-separator"></div>

            <div className="dropdown-menu-items">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    className="dropdown-menu-item"
                    onClick={() => handleMenuItemClick(item.action)}
                  >
                    <IconComponent size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="dropdown-separator"></div>

            <button
              className="dropdown-menu-item logout-item"
              onClick={() => handleMenuItemClick('logout')}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
