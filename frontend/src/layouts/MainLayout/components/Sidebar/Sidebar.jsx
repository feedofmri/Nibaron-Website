import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  ShoppingBag,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';
import SidebarLogo from './components/SidebarLogo';
import NavItem from './components/NavItem';
import UserInfo from './components/UserInfo';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, hasAnyRole } = useAuth();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home size={20} />,
      path: '/dashboard',
      roles: ['buyer', 'seller', 'farmer', 'admin'],
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: <ShoppingBag size={20} />,
      path: '/marketplace',
      roles: ['buyer', 'seller', 'farmer', 'admin'],
    },
    {
      id: 'pre-orders',
      label: 'Pre-Orders',
      icon: <Package size={20} />,
      path: '/pre-orders',
      roles: ['buyer', 'seller', 'farmer', 'admin'],
    },
    {
      id: 'orders',
      label: 'My Orders',
      icon: <ShoppingCart size={20} />,
      path: '/orders',
      roles: ['buyer', 'seller', 'farmer', 'admin'],
    },
    {
      id: 'community',
      label: 'Community',
      icon: <Users size={20} />,
      path: '/community',
      roles: ['buyer', 'seller', 'farmer', 'admin'],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 size={20} />,
      path: '/analytics',
      roles: ['admin', 'seller', 'farmer'],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      path: '/settings',
      roles: ['buyer', 'seller', 'farmer', 'admin'],
    },
  ];

  const filteredNavigationItems = navigationItems.filter(item =>
    hasAnyRole(item.roles)
  );

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.aside
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      initial={false}
      animate={{
        width: isCollapsed ? 80 : 260,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <SidebarLogo isCollapsed={isCollapsed} />

        <button
          onClick={toggleCollapse}
          className="collapse-button"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>
      </div>

      {/* User Info Section */}
      <div className="user-section">
        <UserInfo user={user} isCollapsed={isCollapsed} />
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <div className="nav-items">
          {filteredNavigationItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={location.pathname === item.path}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="footer-content">
            <div className="version-info">
              <span className="text-xs text-text-secondary">
                Nibaron Bazaar v1.0
              </span>
            </div>
            <div className="support-info">
              <Link
                to="/support"
                className="text-xs text-primary-500 hover:text-primary-600 transition-colors"
              >
                Need Help?
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
