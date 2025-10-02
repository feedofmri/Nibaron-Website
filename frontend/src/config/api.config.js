// API configuration for Nibaron Bazaar
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000/ws';

export const apiConfig = {
  baseURL: API_BASE_URL,
  wsURL: WS_BASE_URL,
  timeout: 10000,

  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
      verifyOtp: '/auth/verify-otp',
      resendOtp: '/auth/resend-otp',
    },
    user: {
      profile: '/user/profile',
      updateProfile: '/user/profile',
      avatar: '/user/avatar',
      settings: '/user/settings',
      verifyBusiness: '/user/verify-business',
    },
    products: {
      list: '/products',
      detail: '/products/:id',
      search: '/products/search',
      categories: '/products/categories',
      filters: '/products/filters',
      reviews: '/products/:id/reviews',
      addReview: '/products/:id/reviews',
    },
    preOrders: {
      list: '/pre-orders',
      create: '/pre-orders',
      detail: '/pre-orders/:id',
      predictions: '/pre-orders/predictions',
      weather: '/pre-orders/weather/:id',
    },
    orders: {
      list: '/orders',
      create: '/orders',
      detail: '/orders/:id',
      cancel: '/orders/:id/cancel',
      track: '/orders/:id/track',
      invoice: '/orders/:id/invoice',
      history: '/orders/history',
    },
    cart: {
      get: '/cart',
      add: '/cart/add',
      update: '/cart/update',
      remove: '/cart/remove',
      clear: '/cart/clear',
      apply_coupon: '/cart/coupon',
    },
    community: {
      posts: '/community/posts',
      create: '/community/posts',
      detail: '/community/posts/:id',
      responses: '/community/posts/:id/responses',
      respond: '/community/posts/:id/respond',
      categories: '/community/categories',
      search: '/community/search',
    },
    analytics: {
      dashboard: '/analytics/dashboard',
      revenue: '/analytics/revenue',
      crops: '/analytics/crops',
      regions: '/analytics/regions',
      predictions: '/analytics/predictions',
      activity: '/analytics/activity',
      export: '/analytics/export',
    },
    notifications: {
      list: '/notifications',
      markRead: '/notifications/:id/read',
      markAllRead: '/notifications/read-all',
      settings: '/notifications/settings',
    },
    upload: {
      image: '/upload/image',
      document: '/upload/document',
      avatar: '/upload/avatar',
    },
  },

  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export default apiConfig;
