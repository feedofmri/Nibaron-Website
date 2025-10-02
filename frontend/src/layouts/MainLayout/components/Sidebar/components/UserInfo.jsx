import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle } from 'lucide-react';

const UserInfo = ({ user, isCollapsed }) => {
  if (!user) return null;

  const getAvatarUrl = () => {
    return user.avatar || '/assets/images/placeholders/profile-placeholder.jpg';
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      farmer: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      seller: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      buyer: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    };
    return colors[role] || colors.buyer;
  };

  return (
    <div className="user-info">
      <div className="user-avatar-container">
        <img
          src={getAvatarUrl()}
          alt={user.name}
          className="user-avatar"
          onError={(e) => {
            e.target.src = '/assets/images/placeholders/profile-placeholder.jpg';
          }}
        />

        {/* Online Status Indicator */}
        <div className="online-indicator" />

        {/* Verification Badge */}
        {user.email_verified_at && (
          <div className="verification-badge">
            <CheckCircle size={12} className="text-success" />
          </div>
        )}
      </div>

      <motion.div
        className="user-details"
        animate={{
          opacity: isCollapsed ? 0 : 1,
          width: isCollapsed ? 0 : 'auto',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="user-name">
          {user.name}
        </div>

        <div className="user-meta">
          <span className={`role-badge ${getRoleBadgeColor(user.user_type)}`}>
            {user.user_type?.charAt(0).toUpperCase() + user.user_type?.slice(1) || 'User'}
          </span>

          {user.email_verified_at && (
            <span className="business-verified">
              <CheckCircle size={12} />
              Verified
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserInfo;
