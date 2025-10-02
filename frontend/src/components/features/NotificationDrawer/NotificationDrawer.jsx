import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Check, Clock, AlertCircle, Package, TrendingUp, MessageCircle } from 'lucide-react';
import './NotificationDrawer.css';

const NotificationDrawer = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your pre-order for 50kg Basmati Rice has been confirmed by Karim Rahman.',
      timestamp: '5 minutes ago',
      isRead: false,
      icon: Package,
      color: 'green'
    },
    {
      id: 2,
      type: 'prediction',
      title: 'New Crop Prediction',
      message: 'High yield prediction for tomatoes in your region. Expected harvest: December 2025.',
      timestamp: '1 hour ago',
      isRead: false,
      icon: TrendingUp,
      color: 'blue'
    },
    {
      id: 3,
      type: 'community',
      title: 'Community Update',
      message: 'Dr. Fatima Ahmed shared new farming tips in the community feed.',
      timestamp: '2 hours ago',
      isRead: true,
      icon: MessageCircle,
      color: 'purple'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Weather Alert',
      message: 'Heavy rainfall expected in Dhaka division. Protect your crops accordingly.',
      timestamp: '3 hours ago',
      isRead: false,
      icon: AlertCircle,
      color: 'orange'
    },
    {
      id: 5,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order of organic vegetables has been delivered successfully.',
      timestamp: '1 day ago',
      isRead: true,
      icon: Check,
      color: 'green'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="notification-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="notification-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="drawer-header">
              <div className="header-title">
                <Bell size={20} />
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <span className="unread-badge">{unreadCount}</span>
                )}
              </div>
              <div className="header-actions">
                {unreadCount > 0 && (
                  <button
                    className="mark-all-read-btn"
                    onClick={markAllAsRead}
                  >
                    Mark all read
                  </button>
                )}
                <button className="close-btn" onClick={onClose}>
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="notifications-list">
              {notifications.length === 0 ? (
                <div className="empty-state">
                  <Bell size={48} />
                  <h4>No notifications</h4>
                  <p>You're all caught up! Check back later for updates.</p>
                </div>
              ) : (
                notifications.map((notification, index) => {
                  const IconComponent = notification.icon;
                  return (
                    <motion.div
                      key={notification.id}
                      className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="notification-content">
                        <div className="notification-icon-wrapper">
                          <div className={`notification-icon ${notification.color}`}>
                            <IconComponent size={16} />
                          </div>
                          {!notification.isRead && <div className="unread-dot" />}
                        </div>

                        <div className="notification-body">
                          <h4 className="notification-title">{notification.title}</h4>
                          <p className="notification-message">{notification.message}</p>
                          <div className="notification-footer">
                            <span className="notification-time">
                              <Clock size={12} />
                              {notification.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {notifications.length > 0 && (
              <div className="drawer-footer">
                <button className="view-all-btn">
                  View All Notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDrawer;
