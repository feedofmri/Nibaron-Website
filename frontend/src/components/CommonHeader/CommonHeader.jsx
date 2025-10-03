import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ShoppingBag,
  Package,
  Users,
  LayoutDashboard,
  Info,
  Bell,
  MessageCircle,
  User,
  ShoppingCart,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useCart } from '../../context/CartContext';
import nibaronIcon from '../../assets/images/nibaron_icon.png';
import './CommonHeader.css';

const CommonHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const { itemCount = 0 } = useCart(); // Use itemCount instead of cartItems
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation items for logged-out users
  const publicNavItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { label: 'Pre-Orders', path: '/pre-orders', icon: Package },
    { label: 'About', path: '/about', icon: Info },
  ];

  // Navigation items for logged-in users
  const privateNavItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { label: 'Pre-Orders', path: '/pre-orders', icon: Package },
    { label: 'Community', path: '/community', icon: Users },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  // Profile dropdown menu items
  const profileMenuItems = [
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'My Orders', path: '/orders', icon: ShoppingBag },
    { label: 'Wishlist', path: '/wishlist', icon: Heart },
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Help & Support', path: '/help', icon: HelpCircle },
  ];

  const handleAuthAction = (action) => {
    if (action === 'signin') {
      navigate('/login');
    } else if (action === 'signup') {
      navigate('/signup');
    } else if (action === 'logout') {
      logout();
      setIsProfileOpen(false);
    }
  };

  const handleProfileMenuClick = (path) => {
    navigate(path);
    setIsProfileOpen(false);
  };

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getUserTypeDisplay = () => {
    if (!user?.user_type) return 'User';
    return user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1);
  };

  const avatarUrl = user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=68911b&color=fff`;

  return (
    <header className="common-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="brand-logo">
          <img src={nibaronIcon} alt="Nibaron Bazaar" className="logo-image" />
          <div className="brand-text">
            <span className="brand-title">Nibaron</span>
            <span className="brand-subtitle">Bazaar</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          {(isAuthenticated ? privateNavItems : publicNavItems).map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="header-actions">
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <button
                className="action-btn notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </button>

              {/* Messages */}
              <button className="action-btn">
                <MessageCircle size={20} />
              </button>

              {/* Cart */}
              <button className="action-btn">
                <Link to="/cart" className="action-btn cart-btn">
                  <ShoppingCart size={20} />
                  {itemCount > 0 && (
                      <span className="cart-badge">{itemCount}</span>
                  )}
                </Link>
                </button>

              {/* Profile Dropdown */}
              <div className="profile-dropdown" ref={profileRef}>
                <button
                  className={`profile-trigger ${isProfileOpen ? 'active' : ''}`}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <img
                    src={avatarUrl}
                    alt={user?.name}
                    className="profile-avatar"
                  />
                  <div className="profile-info">
                    <span className="profile-name">{user?.name}</span>
                    <span className="profile-type">{getUserTypeDisplay()}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`dropdown-arrow ${isProfileOpen ? 'rotated' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="dropdown-header">
                        <img
                          src={avatarUrl}
                          alt={user?.name}
                          className="dropdown-avatar"
                        />
                        <div className="dropdown-user-info">
                          <h4 className="dropdown-name">
                            {user?.name}
                            {user?.verified && (
                              <Shield size={14} className="verified-badge" />
                            )}
                          </h4>
                          <p className="dropdown-email">{user?.email}</p>
                          <span className="user-type-badge">{getUserTypeDisplay()}</span>
                        </div>
                      </div>

                      <div className="dropdown-separator"></div>

                      <div className="dropdown-items">
                        {profileMenuItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <button
                              key={item.path}
                              className="dropdown-item"
                              onClick={() => handleProfileMenuClick(item.path)}
                            >
                              <IconComponent size={16} />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="dropdown-separator"></div>

                      <button
                        className="dropdown-item logout-item"
                        onClick={() => handleAuthAction('logout')}
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              {/* Auth Buttons for logged-out users */}
              <button
                className="auth-btn signin-btn"
                onClick={() => handleAuthAction('signin')}
              >
                Sign In
              </button>
              <button
                className="auth-btn signup-btn"
                onClick={() => handleAuthAction('signup')}
              >
                Sign Up
              </button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-nav-items">
              {(isAuthenticated ? privateNavItems : publicNavItems).map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`mobile-nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {!isAuthenticated && (
                <div className="mobile-auth-buttons">
                  <button
                    className="mobile-auth-btn signin"
                    onClick={() => {
                      handleAuthAction('signin');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="mobile-auth-btn signup"
                    onClick={() => {
                      handleAuthAction('signup');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default CommonHeader;
