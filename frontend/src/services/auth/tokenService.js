// Token management service for JWT tokens
class TokenService {
  constructor() {
    this.TOKEN_KEY = 'nibaron_access_token';
    this.REFRESH_TOKEN_KEY = 'nibaron_refresh_token';
  }

  // Get access token from localStorage
  getToken() {
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  // Set access token in localStorage
  setToken(token) {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
      return true;
    } catch (error) {
      console.error('Error setting token:', error);
      return false;
    }
  }

  // Remove access token from localStorage
  removeToken() {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      return true;
    } catch (error) {
      console.error('Error removing token:', error);
      return false;
    }
  }

  // Get refresh token
  getRefreshToken() {
    try {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  // Set refresh token
  setRefreshToken(token) {
    try {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
      return true;
    } catch (error) {
      console.error('Error setting refresh token:', error);
      return false;
    }
  }

  // Decode JWT token (without verification)
  decodeToken(token) {
    try {
      if (!token || typeof token !== 'string') {
        return null;
      }

      const parts = token.split('.');
      if (parts.length !== 3) {
        // Not a valid JWT format
        return null;
      }

      const base64Url = parts[1];
      if (!base64Url) {
        return null;
      }

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Check if token is expired
  isTokenExpired(token) {
    try {
      if (!token || typeof token !== 'string') {
        return true;
      }

      // For Laravel Sanctum tokens, they are not JWTs, so we can't decode them
      // Sanctum tokens are simple bearer tokens stored in the database
      // We should assume they're valid if they exist and let the server validate them
      if (token.includes('|')) {
        // This is likely a Sanctum token (format: id|hash)
        return false;
      }

      // For JWT tokens, decode and check expiration
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) {
        return true;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      const isExpired = decoded.exp < currentTime;
      return isExpired;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  // Get token expiration time
  getTokenExpiration(token) {
    try {
      const decoded = this.decodeToken(token);
      return decoded ? decoded.exp * 1000 : null;
    } catch (error) {
      console.error('Error getting token expiration:', error);
      return null;
    }
  }

  // Get user info from token
  getUserFromToken(token) {
    try {
      const decoded = this.decodeToken(token);
      return decoded ? {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name,
      } : null;
    } catch (error) {
      console.error('Error getting user from token:', error);
      return null;
    }
  }

  // Check if token will expire soon (within 5 minutes)
  willExpireSoon(token) {
    try {
      const expiration = this.getTokenExpiration(token);
      if (!expiration) return true;

      const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
      return (expiration - Date.now()) < fiveMinutes;
    } catch (error) {
      console.error('Error checking if token will expire soon:', error);
      return true;
    }
  }

  // Get time until token expires
  getTimeUntilExpiry(token) {
    try {
      const expiration = this.getTokenExpiration(token);
      if (!expiration) return 0;
      return Math.max(0, expiration - Date.now());
    } catch (error) {
      console.error('Error getting time until expiry:', error);
      return 0;
    }
  }

  // Clear all tokens and user data
  clearAll() {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      // Clear any other user-related data
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('nibaron_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Error clearing all tokens:', error);
      return false;
    }
  }
}

// Create singleton instance
export const tokenService = new TokenService();
