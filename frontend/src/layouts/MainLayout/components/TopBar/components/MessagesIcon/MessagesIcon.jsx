import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import './MessagesIcon.css';

const MessagesIcon = ({ onToggleMessages, unreadCount = 0 }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggleMessages?.();
    setTimeout(() => setIsAnimating(false), 200);
  };

  return (
    <button
      className={`messages-icon ${isAnimating ? 'animating' : ''}`}
      onClick={handleClick}
      aria-label={`Messages ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
    >
      <div className="message-icon-wrapper">
        <MessageCircle size={20} />
        {unreadCount > 0 && (
          <span className="message-count">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>
    </button>
  );
};

export default MessagesIcon;
