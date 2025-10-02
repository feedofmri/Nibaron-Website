import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth/authService';
import { tokenService } from '../services/auth/tokenService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = tokenService.getToken();

        if (token && !tokenService.isTokenExpired(token)) {
          // First, try to use stored user data if it exists and is valid
          try {
            const storedData = localStorage.getItem('nibaron_user_data');
            if (storedData) {
              const userData = JSON.parse(storedData);
              if (userData.user && userData.token === token) {
                setUser(userData.user);
                setIsAuthenticated(true);
                setIsLoading(false);
                return; // Successfully restored from localStorage
              }
            }
          } catch (storageError) {
            console.warn('Error reading localStorage:', storageError);
          }

          // If localStorage doesn't work, try API call
          try {
            const userProfile = await authService.getCurrentUser();
            if (userProfile && userProfile.user) {
              setUser(userProfile.user);
              setIsAuthenticated(true);
            } else {
              throw new Error('No user profile returned from API');
            }
          } catch (apiError) {
            // If API fails, clear everything and redirect to login
            tokenService.removeToken();
            localStorage.removeItem('nibaron_user_data');
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          // Token is expired or doesn't exist
          tokenService.removeToken();
          localStorage.removeItem('nibaron_user_data');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid token and data
        tokenService.removeToken();
        localStorage.removeItem('nibaron_user_data');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);

      if (response.success) {
        // The actual data is nested under response.data.data
        const responseData = response.data.data || response.data;

        // Defensive check for required data
        if (!responseData || !responseData.user || !responseData.token) {
          return {
            success: false,
            error: 'Invalid login response from server'
          };
        }

        // Store the token
        tokenService.setToken(responseData.token);

        // Store complete user data in localStorage for persistence
        const userData = {
          user: responseData.user,
          user_type: responseData.user_type || responseData.user.user_type,
          buyer_profile: responseData.buyer_profile || null,
          farmer_profile: responseData.farmer_profile || null,
          token: responseData.token
        };

        localStorage.setItem('nibaron_user_data', JSON.stringify(userData));

        // Set state
        setUser(responseData.user);
        setIsAuthenticated(true);

        return { success: true, user: responseData.user };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Login failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);

      if (response.success) {
        // Registration successful, but may need OTP verification
        return {
          success: true,
          requiresVerification: response.data.requiresVerification,
          message: response.message
        };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message || 'Registration failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otpData) => {
    try {
      setIsLoading(true);
      const response = await authService.verifyOTP(otpData);

      if (response.success) {
        tokenService.setToken(response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, user: response.data.user };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      return {
        success: false,
        error: error.message || 'OTP verification failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API call result
      tokenService.removeToken();
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);

      if (response.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: error.message || 'Profile update failed. Please try again.'
      };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      return {
        success: response.success,
        message: response.message,
        error: response.success ? null : response.message
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send reset email. Please try again.'
      };
    }
  };

  const resetPassword = async (resetData) => {
    try {
      const response = await authService.resetPassword(resetData);
      return {
        success: response.success,
        message: response.message,
        error: response.success ? null : response.message
      };
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        error: error.message || 'Password reset failed. Please try again.'
      };
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();

      if (response.success) {
        tokenService.setToken(response.data.token);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return false;
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.user_type === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.user_type);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    verifyOTP,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword,
    hasRole,
    hasAnyRole,
    // Enhanced user profile utilities
    getUserProfile: () => {
      try {
        const userData = JSON.parse(localStorage.getItem('nibaron_user_data') || '{}');
        return userData;
      } catch (error) {
        console.error('Error parsing user data:', error);
        return {};
      }
    },
    getBuyerProfile: () => {
      try {
        const userData = JSON.parse(localStorage.getItem('nibaron_user_data') || '{}');
        return userData.buyer_profile || null;
      } catch (error) {
        console.error('Error parsing buyer profile:', error);
        return null;
      }
    },
    getFarmerProfile: () => {
      try {
        const userData = JSON.parse(localStorage.getItem('nibaron_user_data') || '{}');
        return userData.farmer_profile || null;
      } catch (error) {
        console.error('Error parsing farmer profile:', error);
        return null;
      }
    },
    getUserType: () => {
      try {
        const userData = JSON.parse(localStorage.getItem('nibaron_user_data') || '{}');
        return userData.user_type || user?.user_type || null;
      } catch (error) {
        console.error('Error getting user type:', error);
        return user?.user_type || null;
      }
    },
    getBuyerType: () => {
      try {
        const userData = JSON.parse(localStorage.getItem('nibaron_user_data') || '{}');
        return userData.buyer_profile?.buyer_type || null;
      } catch (error) {
        console.error('Error getting buyer type:', error);
        return null;
      }
    },
    isVerified: () => {
      try {
        const userData = JSON.parse(localStorage.getItem('nibaron_user_data') || '{}');
        if (userData.buyer_profile) {
          return userData.buyer_profile.verification_status;
        }
        if (userData.farmer_profile) {
          return userData.farmer_profile.verification_status;
        }
        return false;
      } catch (error) {
        console.error('Error checking verification status:', error);
        return false;
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
