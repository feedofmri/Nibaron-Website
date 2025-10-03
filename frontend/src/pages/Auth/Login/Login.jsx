import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Shield, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../../components/common/Button/Button';
import toast from 'react-hot-toast';
import nibaronIconWhite from '../../../assets/images/nibaron_icon_white.png';
import './Login.css';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password
      });

      if (result.success) {
        toast.success('Login successful!');
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
      {/* Left Side - Branding & Benefits */}
      <div className="auth-branding login-branding">
        <div className="branding-content">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="logo-section"
          >
            <div className="logo">
              <img src={nibaronIconWhite} alt="Nibaron Logo" className="nibaron-logo" />
              <span>Nibaron</span>
            </div>
            <h1 className="branding-title">
              Welcome Back to<br />
              Agriculture Hub
            </h1>
            <p className="branding-subtitle">
              Access your account and continue trading with verified farmers across Bangladesh's trusted agricultural marketplace
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="login-benefits"
          >
            <div className="benefit-card">
              <Shield size={28} />
              <h3>Verified Network</h3>
            </div>
            <div className="benefit-card">
              <Clock size={28} />
              <h3>Fast Processing</h3>
            </div>
            <div className="benefit-card">
              <CheckCircle size={28} />
              <h3>Quality Guarantee</h3>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-form-container login-container">
        <motion.div
          className="auth-form-card login-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile Logo */}
          <div className="mobile-logo">
            <img src={nibaronIconWhite} alt="Nibaron Logo" className="nibaron-logo" />
            <span>Nibaron</span>
          </div>

          {/* Header */}
          <div className="form-header">
            <h1 className="form-title">Welcome Back</h1>
            <p className="form-subtitle">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-container">
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-container">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" className="checkbox" />
                <span className="checkmark"></span>
                <span className="checkbox-text">Remember me</span>
              </label>
              <Link to="/forgot-password" className="auth-link">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="auth-button"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            {/* Footer */}
            <div className="auth-footer">
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Create account
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
