import api from './api';

export const profileService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const formData = new FormData();
    Object.keys(profileData).forEach(key => {
      if (profileData[key] !== null && profileData[key] !== undefined) {
        formData.append(key, profileData[key]);
      }
    });

    const response = await api.put('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.post('/profile/change-password', passwordData);
    return response.data;
  },
};

export const settingsService = {
  // Get user settings
  getSettings: async () => {
    const response = await api.get('/settings');
    return response.data;
  },

  // Update notification settings
  updateNotifications: async (notifications) => {
    const response = await api.put('/settings/notifications', notifications);
    return response.data;
  },

  // Update preferences
  updatePreferences: async (preferences) => {
    const response = await api.put('/settings/preferences', preferences);
    return response.data;
  },

  // Delete account
  deleteAccount: async (confirmationData) => {
    const response = await api.delete('/settings/account', { data: confirmationData });
    return response.data;
  },
};

export const preOrderService = {
  // Get all pre-orders
  getPreOrders: async (params = {}) => {
    const response = await api.get('/pre-orders', { params });
    return response.data;
  },

  // Get single pre-order
  getPreOrder: async (id) => {
    const response = await api.get(`/pre-orders/${id}`);
    return response.data;
  },

  // Create pre-order
  createPreOrder: async (preOrderData) => {
    const response = await api.post('/pre-orders', preOrderData);
    return response.data;
  },

  // Update pre-order
  updatePreOrder: async (id, preOrderData) => {
    const response = await api.put(`/pre-orders/${id}`, preOrderData);
    return response.data;
  },

  // Cancel pre-order
  cancelPreOrder: async (id) => {
    const response = await api.post(`/pre-orders/${id}/cancel`);
    return response.data;
  },
};

export const orderService = {
  // Get all orders
  getOrders: async (params = {}) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  // Get single order
  getOrder: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

export const communityService = {
  // Get community posts
  getPosts: async (params = {}) => {
    const response = await api.get('/community/posts', { params });
    return response.data;
  },

  // Get single post
  getPost: async (id) => {
    const response = await api.get(`/community/posts/${id}`);
    return response.data;
  },

  // Create post
  createPost: async (postData) => {
    const formData = new FormData();
    Object.keys(postData).forEach(key => {
      if (key === 'tags' && Array.isArray(postData[key])) {
        formData.append('tags', JSON.stringify(postData[key]));
      } else if (postData[key] !== null && postData[key] !== undefined) {
        formData.append(key, postData[key]);
      }
    });

    const response = await api.post('/community/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update post
  updatePost: async (id, postData) => {
    const response = await api.put(`/community/posts/${id}`, postData);
    return response.data;
  },

  // Delete post
  deletePost: async (id) => {
    const response = await api.delete(`/community/posts/${id}`);
    return response.data;
  },
};

export const supportService = {
  // Get FAQs
  getFAQs: async () => {
    const response = await api.get('/support/faqs');
    return response.data;
  },

  // Get contact info
  getContactInfo: async () => {
    const response = await api.get('/support/contact');
    return response.data;
  },

  // Get support tickets
  getTickets: async () => {
    const response = await api.get('/support/tickets');
    return response.data;
  },

  // Get single ticket
  getTicket: async (id) => {
    const response = await api.get(`/support/tickets/${id}`);
    return response.data;
  },

  // Create support ticket
  createTicket: async (ticketData) => {
    const formData = new FormData();
    Object.keys(ticketData).forEach(key => {
      if (key === 'attachments' && Array.isArray(ticketData[key])) {
        ticketData[key].forEach((file, index) => {
          formData.append(`attachments[${index}]`, file);
        });
      } else {
        formData.append(key, ticketData[key]);
      }
    });

    const response = await api.post('/support/tickets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const productService = {
  // Get all products
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product
  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (query, params = {}) => {
    const response = await api.get('/products/search', {
      params: { query, ...params }
    });
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category, params = {}) => {
    const response = await api.get(`/products/category/${category}`, { params });
    return response.data;
  },
};

export const notificationService = {
  // Get all notifications
  getNotifications: async (params = {}) => {
    const response = await api.get('/notifications', { params });
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/mark-all-read');
    return response.data;
  },

  // Delete notification
  deleteNotification: async (id) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  },
};

export const messagingService = {
  // Get conversations
  getConversations: async (params = {}) => {
    const response = await api.get('/messages/conversations', { params });
    return response.data;
  },

  // Get messages in a conversation
  getMessages: async (conversationId, params = {}) => {
    const response = await api.get(`/messages/conversations/${conversationId}`, { params });
    return response.data;
  },

  // Send message
  sendMessage: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },

  // Start new conversation
  startConversation: async (conversationData) => {
    const response = await api.post('/messages/conversations', conversationData);
    return response.data;
  },

  // Mark conversation as read
  markConversationAsRead: async (conversationId) => {
    const response = await api.put(`/messages/conversations/${conversationId}/read`);
    return response.data;
  },

  // Get unread message count
  getUnreadCount: async () => {
    const response = await api.get('/messages/unread-count');
    return response.data;
  },
};
