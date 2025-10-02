import React, { createContext, useContext, useState, useEffect } from 'react';
import { notificationService } from '../services/featureServices';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    all: true,
    orders: false,
    preorders: false,
    community: false,
    alerts: false,
  });

  const { user, isAuthenticated } = useAuth();

  // Load notifications when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadNotifications();
      setupWebSocket();
    } else {
      // Clear notifications when not authenticated
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, user]);

  const loadNotifications = async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await notificationService.getNotifications();
      const notificationsData = response.data || [];
      setNotifications(notificationsData);
      setUnreadCount(notificationsData.filter(n => !n.read_at).length);
    } catch (err) {
      console.error('Failed to load notifications:', err);
      // Don't show error toast for 401s as they're handled by API interceptor
      if (err.response?.status !== 401) {
        setNotifications([]);
        setUnreadCount(0);
      }
    } finally {
      setLoading(false);
    }
  };

  const setupWebSocket = () => {
    // WebSocket setup for real-time notifications
    // This would connect to your Laravel WebSocket server
    console.log('Setting up WebSocket for real-time notifications');

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);

      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read_at: new Date().toISOString() }
            : notification
        )
      );

      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();

      setNotifications(prev =>
        prev.map(notification => ({
          ...notification,
          read_at: notification.read_at || new Date().toISOString()
        }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const removeNotification = async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);

      const notification = notifications.find(n => n.id === notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));

      if (notification && !notification.read_at) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      created_at: new Date().toISOString(),
      read_at: null,
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const toggleDrawer = () => {
    setIsOpen(prev => !prev);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const openDrawer = () => {
    setIsOpen(true);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const getFilteredNotifications = () => {
    if (filters.all) return notifications;

    return notifications.filter(notification => {
      if (filters.orders && notification.type === 'order_update') return true;
      if (filters.preorders && notification.type === 'preorder_alert') return true;
      if (filters.community && notification.type === 'community_reply') return true;
      if (filters.alerts && notification.type === 'system_alert') return true;
      return false;
    });
  };

  // Request notification permission
  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  const value = {
    notifications,
    unreadCount,
    isOpen,
    filters,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    toggleDrawer,
    openDrawer,
    closeDrawer,
    updateFilters,
    getFilteredNotifications,
    requestPermission,
    loadNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
