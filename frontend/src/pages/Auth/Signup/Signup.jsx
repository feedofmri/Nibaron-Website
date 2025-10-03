import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Building2, Phone, MapPin, ArrowRight, Truck, Store, Globe, Shield, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../../components/common/Button/Button';
import toast from 'react-hot-toast';
import nibaronIconWhite from '../../../assets/images/nibaron_icon_white.png';
import './Signup.css';

const signupSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  buyerType: yup
    .string()
    .oneOf(['wholesaler', 'retailer', 'exporter'], 'Please select a valid buyer type')
    .required('Buyer type is required'),
  businessName: yup
    .string()
    .min(2, 'Business name must be at least 2 characters')
    .required('Business name is required'),
  phone: yup
    .string()
    .matches(/^(\+88)?01[3-9]\d{8}$/, 'Please enter a valid Bangladeshi phone number')
    .required('Phone number is required'),
  address: yup
    .string()
    .min(10, 'Address must be at least 10 characters')
    .required('Address is required'),
  district: yup
    .string()
    .required('District is required'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

const buyerTypes = [
  {
    value: 'wholesaler',
    label: 'Wholesaler',
    description: 'Buy in bulk for resale',
    icon: Truck,
    benefits: ['Bulk pricing', 'Direct farmer access', 'Volume discounts']
  },
  {
    value: 'retailer',
    label: 'Retailer',
    description: 'Sell directly to consumers',
    icon: Store,
    benefits: ['Fresh inventory', 'Competitive prices', 'Quality assurance']
  },
  {
    value: 'exporter',
    label: 'Exporter',
    description: 'Export agricultural products',
    icon: Globe,
    benefits: ['Export documentation', 'Quality certificates', 'Logistics support']
  }
];

const bangladeshiDistricts = [
  'Barisal', 'Barguna', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur',
  'Bandarban', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Comilla', 'Cox\'s Bazar',
  'Feni', 'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati',
  'Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur',
  'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail',
  'Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Khulna', 'Kushtia',
  'Magura', 'Meherpur', 'Narail', 'Satkhira',
  'Jamalpur', 'Mymensingh', 'Netrakona', 'Sherpur',
  'Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Nawabganj', 'Pabna',
  'Rajshahi', 'Sirajganj',
  'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari',
  'Panchagarh', 'Rangpur', 'Thakurgaon',
  'Habiganj', 'Maulvibazar', 'Sunamganj', 'Sylhet'
];

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const selectedBuyerType = watch('buyerType');

  const onSubmit = async (data) => {
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        user_type: 'buyer',
        buyer_type: data.buyerType,
        business_name: data.businessName,
        phone: data.phone,
        address: data.address,
        district: data.district
      });

      if (result.success) {
        toast.success('Account created successfully! Please check your email for verification.');
        navigate('/login');
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      {/* Left Side - Branding & Benefits */}
      <div className="auth-branding signup-branding">
        <div className="branding-content">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="logo-section"
          >
            <Link to="/" className="logo">
              <img src={nibaronIconWhite} alt="Nibaron Logo" className="logo-image" />
              <span>Nibaron</span>
            </Link>
            <h1 className="branding-title">
              Start Your Journey<br />
              in Agriculture
            </h1>
            <p className="branding-subtitle">
              Join Bangladesh's most trusted agricultural marketplace and connect with verified farmers across the country
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="signup-benefits"
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

      {/* Right Side - Signup Form */}
      <div className="auth-form-container signup-container">
        <motion.div
          className="auth-form-card signup-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile Logo */}
          <div className="mobile-logo">
            <Link to="/" className="mobile-logo-link">
              <img src={nibaronIconWhite} alt="Nibaron Logo" className="logo-image" />
              <span>Nibaron</span>
            </Link>
          </div>

          {/* Header */}
          <div className="form-header">
            <h1 className="form-title">Create Account</h1>
            <p className="form-subtitle">
              Join our agricultural marketplace to connect with farmers
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            {/* Personal Information */}
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <div className="input-container">
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <span className="error-message">{errors.name.message}</span>}
                </div>

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

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <div className="input-container">
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                  {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="district" className="form-label">District</label>
                  <select
                    {...register('district')}
                    id="district"
                    className={`form-select ${errors.district ? 'error' : ''}`}
                  >
                    <option value="">Select district</option>
                    {bangladeshiDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.district && <span className="error-message">{errors.district.message}</span>}
                </div>
              </div>
            </div>

            {/* Buyer Type Selection */}
            <div className="form-section">
              <h3 className="section-title">Choose Your Business Type</h3>
              <div className="buyer-type-grid">
                {buyerTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <label key={type.value} className="buyer-type-card">
                      <input
                        {...register('buyerType')}
                        type="radio"
                        value={type.value}
                        className="buyer-type-input"
                      />
                      <div className={`buyer-type-content ${selectedBuyerType === type.value ? 'selected' : ''}`}>
                        <IconComponent size={28} />
                        <h4>{type.label}</h4>
                        <p>{type.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.buyerType && <span className="error-message">{errors.buyerType.message}</span>}
            </div>

            {/* Business Information */}
            <div className="form-section">
              <h3 className="section-title">Business Information</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="businessName" className="form-label">Business Name</label>
                  <div className="input-container">
                    <input
                      {...register('businessName')}
                      type="text"
                      id="businessName"
                      className={`form-input ${errors.businessName ? 'error' : ''}`}
                      placeholder="Enter business name"
                    />
                  </div>
                  {errors.businessName && <span className="error-message">{errors.businessName.message}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address" className="form-label">Business Address</label>
                  <div className="input-container">
                    <textarea
                      {...register('address')}
                      id="address"
                      className={`form-textarea ${errors.address ? 'error' : ''}`}
                      placeholder="Enter complete business address"
                      rows="3"
                    />
                  </div>
                  {errors.address && <span className="error-message">{errors.address.message}</span>}
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="form-section">
              <h3 className="section-title">Security</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-container">
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Create password"
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

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className="input-container">
                    <input
                      {...register('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="form-group">
              <label className="checkbox-container">
                <input
                  {...register('termsAccepted')}
                  type="checkbox"
                  className="checkbox"
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  I agree to the <Link to="/terms" className="auth-link">Terms of Service</Link> and <Link to="/privacy" className="auth-link">Privacy Policy</Link>
                </span>
              </label>
              {errors.termsAccepted && <span className="error-message">{errors.termsAccepted.message}</span>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="auth-button"
              loading={isLoading}
              loadingText="Creating account..."
              rightIcon={<ArrowRight size={20} />}
            >
              Create Account
            </Button>
          </form>

          <div className="auth-footer">
            <span>Already have an account? </span>
            <Link to="/login" className="auth-link">Sign in here</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
