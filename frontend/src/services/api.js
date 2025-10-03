import axios from 'axios';

// Use Vite's environment variable system
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nibaron_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Only handle 401 errors if there was actually a token (meaning user was authenticated)
      const hadToken = localStorage.getItem('nibaron_access_token');

      // Log the error for debugging with more details
      console.warn('🔒 API Authentication Error (401):', {
        url: error.config?.url,
        method: error.config?.method,
        message: error.response?.data?.message || 'Unauthorized',
        hadToken: hadToken ? 'Yes' : 'No',
        fullResponse: error.response?.data
      });

      // Only clear tokens and dispatch logout event if user was actually authenticated
      if (hadToken) {
        // Clear invalid tokens and user data
        localStorage.removeItem('nibaron_access_token');
        localStorage.removeItem('nibaron_refresh_token');
        localStorage.removeItem('nibaron_user_data');

        // Dispatch a custom event to notify components about auth failure
        window.dispatchEvent(new CustomEvent('auth:logout', {
          detail: { reason: 'token_expired' }
        }));
      }

    } else if (error.response?.status >= 400) {
      // Log other API errors for debugging
      console.warn(`🚨 API Error (${error.response.status}):`, {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      });
    }
    return Promise.reject(error);
  }
);

export default api;
