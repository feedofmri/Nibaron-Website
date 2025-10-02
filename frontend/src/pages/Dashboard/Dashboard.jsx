import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Package, ShoppingCart, DollarSign } from 'lucide-react';
import StatsCards from './components/StatsCards/StatsCards';
import CropPredictions from './components/CropPredictions/CropPredictions';
import RecentListings from './components/RecentListings/RecentListings';
import ActivePreOrders from './components/ActivePreOrders/ActivePreOrders';
import CommunityFeed from './components/CommunityFeed/CommunityFeed';
import './Dashboard.css';

const Dashboard = () => {
  // Mock data for dashboard stats
  const statsData = [
    {
      id: 'total-orders',
      title: 'Total Orders',
      value: '127',
      change: '+12%',
      changeType: 'positive',
      icon: <ShoppingCart size={24} />,
      color: 'blue'
    },
    {
      id: 'active-preorders',
      title: 'Active Pre-Orders',
      value: '8',
      change: '+3',
      changeType: 'positive',
      icon: <Package size={24} />,
      color: 'green'
    },
    {
      id: 'available-products',
      title: 'Available Products',
      value: '2,456',
      change: '+45',
      changeType: 'positive',
      icon: <TrendingUp size={24} />,
      color: 'purple'
    },
    {
      id: 'saved-amount',
      title: 'Saved Amount',
      value: '৳45,230',
      change: '+8%',
      changeType: 'positive',
      icon: <DollarSign size={24} />,
      color: 'orange'
    }
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="dashboard"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Page Header */}
      <motion.div className="dashboard-header" variants={sectionVariants}>
        <div className="header-content">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Welcome back! Here's what's happening with your agricultural marketplace.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-outline">
            View Reports
          </button>
          <button className="btn-primary">
            New Order
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.section variants={sectionVariants}>
        <StatsCards stats={statsData} />
      </motion.section>

      {/* AI Crop Predictions Panel */}
      <motion.section variants={sectionVariants}>
        <CropPredictions />
      </motion.section>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Recent Listings */}
        <motion.section
          className="dashboard-section"
          variants={sectionVariants}
        >
          <RecentListings />
        </motion.section>

        {/* Active Pre-Orders */}
        <motion.section
          className="dashboard-section"
          variants={sectionVariants}
        >
          <ActivePreOrders />
        </motion.section>

        {/* Community Feed */}
        <motion.section
          className="dashboard-section community-section"
          variants={sectionVariants}
        >
          <CommunityFeed />
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Dashboard;
