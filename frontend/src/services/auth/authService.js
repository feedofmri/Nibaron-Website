import { apiConfig } from '../../config/api.config';
import { tokenService } from './tokenService';

class AuthService {
  constructor() {
    this.baseURL = apiConfig.baseURL;
  }

  // Helper method for API calls
  async makeRequest(url, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${url}`, config);
      const data = await response.json();

      if (response.ok) {
        return { success: true, data, status: response.status };
      } else {
        return {
          success: false,
          message: data.message || 'Request failed',
          errors: data.errors,
          status: response.status
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Network error occurred',
        status: 0
      };
    }
  }

  // Login user
  async login(credentials) {
    const response = await this.makeRequest('/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        remember: credentials.remember || false,
      }),
    });

    // If login successful, store additional user data
    if (response.success && response.data) {
      // Store user type and profile information for easy access
      const userData = {
        user: response.data.user,
        user_type: response.data.user_type,
        buyer_profile: response.data.buyer_profile || null,
        farmer_profile: response.data.farmer_profile || null,
        token: response.data.token
      };

      // Store in localStorage for persistence
      localStorage.setItem('nibaron_user_data', JSON.stringify(userData));
    }

    return response;
  }

  // Register user (updated for buyers)
  async register(userData) {
    const registrationData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      user_type: userData.user_type || 'buyer',
    };

    // Add buyer-specific fields if registering as buyer
    if (userData.user_type === 'buyer') {
      registrationData.buyer_type = userData.buyer_type;
      registrationData.business_name = userData.business_name;
      registrationData.phone = userData.phone;
      registrationData.address = userData.address;
      registrationData.district = userData.district;
    }

    return this.makeRequest('/register', {
      method: 'POST',
      body: JSON.stringify(registrationData),
    });
  }

  // Verify OTP
  async verifyOTP(otpData) {
    return this.makeRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({
        email: otpData.email,
        otp: otpData.otp,
        type: otpData.type || 'registration',
      }),
    });
  }

  // Resend OTP
  async resendOTP(email, type = 'registration') {
    return this.makeRequest('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email, type }),
    });
  }

  // Forgot password
  async forgotPassword(email) {
    return this.makeRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Reset password
  async resetPassword(resetData) {
    return this.makeRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        email: resetData.email,
        token: resetData.token,
        password: resetData.password,
        password_confirmation: resetData.passwordConfirmation,
      }),
    });
  }

  // Get current user
  async getCurrentUser() {
    const response = await this.makeRequest('/user');

    if (response.success && response.data) {
      // Store enhanced user data in localStorage
      const userData = {
        user: response.data.user,
        user_type: response.data.user_type,
        buyer_profile: response.data.buyer_profile || null,
        farmer_profile: response.data.farmer_profile || null,
      };

      // Merge with existing stored data (preserve token)
      const existingData = JSON.parse(localStorage.getItem('nibaron_user_data') || '{}');
      const mergedData = { ...existingData, ...userData };
      localStorage.setItem('nibaron_user_data', JSON.stringify(mergedData));

      return response.data;
    }

    return null;
  }

  // Update user profile
  async updateProfile(userData) {
    return this.makeRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Upload avatar
  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.makeRequest('/user/avatar', {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData
      },
      body: formData,
    });
  }

  // Logout user
  async logout() {
    return this.makeRequest('/logout', {
      method: 'POST',
    });
  }

  // Refresh token
  async refreshToken() {
    const refreshToken = tokenService.getRefreshToken();
    return this.makeRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  }

  // Change password
  async changePassword(passwordData) {
    return this.makeRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        current_password: passwordData.currentPassword,
        password: passwordData.newPassword,
        password_confirmation: passwordData.passwordConfirmation,
      }),
    });
  }

  // Enable 2FA
  async enable2FA() {
    return this.makeRequest('/auth/2fa/enable', {
      method: 'POST',
    });
  }

  // Confirm 2FA setup
  async confirm2FA(code) {
    return this.makeRequest('/auth/2fa/confirm', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  // Disable 2FA
  async disable2FA(password) {
    return this.makeRequest('/auth/2fa/disable', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  }

  // Verify 2FA code
  async verify2FA(code) {
    return this.makeRequest('/auth/2fa/verify', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  // Get active sessions
  async getActiveSessions() {
    return this.makeRequest('/auth/sessions');
  }

  // Logout from specific session
  async logoutSession(sessionId) {
    return this.makeRequest(`/auth/sessions/${sessionId}`, {
      method: 'DELETE',
    });
  }

  // Logout from all other sessions
  async logoutOtherSessions(password) {
    return this.makeRequest('/auth/sessions/others', {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    });
  }

  // Get login history
  async getLoginHistory() {
    return this.makeRequest('/auth/login-history');
  }

  // Verify business/farmer credentials
  async verifyBusiness(businessData) {
    const formData = new FormData();

    Object.entries(businessData).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    return this.makeRequest('/user/verify-business', {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData
      },
      body: formData,
    });
  }

  // Social login (Google, Facebook, etc.)
  async socialLogin(provider, accessToken) {
    return this.makeRequest('/auth/social', {
      method: 'POST',
      body: JSON.stringify({
        provider,
        access_token: accessToken,
      }),
    });
  }
}

// Create singleton instance
export const authService = new AuthService();
