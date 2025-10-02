import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import './NotificationBell.css';

const NotificationBell = ({ onToggleNotifications, unreadCount = 0 }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggleNotifications?.();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      className={`notification-bell ${isAnimating ? 'animating' : ''}`}
      onClick={handleClick}
      aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
    >
      <div className="bell-icon-wrapper">
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-count">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>
      {unreadCount > 0 && <div className="notification-pulse" />}
    </button>
  );
};

export default NotificationBell;
