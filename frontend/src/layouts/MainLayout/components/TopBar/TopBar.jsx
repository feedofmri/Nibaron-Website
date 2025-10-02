import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import NotificationBell from './components/NotificationBell/NotificationBell';
import MessagesIcon from './components/MessagesIcon/MessagesIcon';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import ProfileDropdown from './components/ProfileDropdown/ProfileDropdown';
import './TopBar.css';

const navLinks = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Pre-Orders', path: '/pre-orders' },
  { label: 'My Orders', path: '/orders' },
  { label: 'Community', path: '/community' },
  { label: 'Settings', path: '/settings' },
];

const TopBar = () => {
  return (
    <header className="topbar">
      <div className="topbar-content">
        {/* Left Section - Logo */}
        <div className="topbar-logo">
          <Link to="/dashboard" className="logo-link">
            <span className="logo-text">Nibaron</span>
          </Link>
        </div>

        {/* Left Section - Search */}
        <div className="topbar-left">
          <SearchBar />
        </div>

        {/* Center Section - Navigation */}
        <nav className="topbar-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="topbar-nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section - Actions */}
        <div className="topbar-right">
          <NotificationBell />
          <MessagesIcon />
          <ThemeToggle />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
