import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Leaf, Shield, Users, Star } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../../components/common/Button/Button';
import toast from 'react-hot-toast';
import './Login.css';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
        remember: data.remember,
      });

      if (result.success) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      {/* Left Side - Branding & Features (Desktop Only) */}
      <div className="auth-branding">
        <div className="branding-content">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="logo-section"
          >
            <div className="logo">
              <Leaf size={32} />
              <span>Nibaron</span>
            </div>
            <h1 className="branding-title">
              Connect with Fresh<br />
              Agricultural Products
            </h1>
            <p className="branding-subtitle">
              Join thousands of buyers and farmers in Bangladesh's leading agricultural marketplace
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="features-grid"
          >
            <div className="feature-card">
              <Shield size={28} />
              <h3>Verified Network</h3>
            </div>
            <div className="feature-card">
              <Users size={28} />
              <h3>Fast Processing</h3>
            </div>
            <div className="feature-card">
              <Star size={28} />
              <h3>Quality Guarantee</h3>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-form-container">
        <motion.div
          className="auth-form-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile Logo */}
          <div className="mobile-logo">
            <Leaf size={24} />
            <span>Nibaron</span>
          </div>

          {/* Header */}
          <div className="form-header">
            <h1 className="form-title">Welcome Back</h1>
            <p className="form-subtitle">
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-container">
                <Mail size={20} className="input-icon" />
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-container">
                <Lock size={20} className="input-icon" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-container">
                <input
                  {...register('remember')}
                  type="checkbox"
                  className="checkbox"
                />
                <span className="checkmark"></span>
                Remember me
              </label>

              <Link to="/auth/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="auth-button"
              loading={isLoading}
              loadingText="Signing in..."
              rightIcon={<ArrowRight size={20} />}
            >
              Sign In
            </Button>

            {/* Social Login */}
            <div className="social-login">
              <div className="divider">
                <span>Or continue with</span>
              </div>

              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="google-button"
                leftIcon={
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                }
              >
                Continue with Google
              </Button>
            </div>

            {/* Register Link */}
            <div className="auth-footer">
              <span>Don't have an account? </span>
              <Link to="/signup" className="auth-link">Create one here</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
