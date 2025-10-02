import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Package, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import './ActivePreOrders.css';

const ActivePreOrders = () => {
  // Mock data for active pre-orders
  const preOrders = [
    {
      id: 1,
      productName: 'Winter Vegetables Bundle',
      farmer: 'Md. Rafiq',
      expectedDate: '2025-11-15',
      quantity: '20 kg',
      totalAmount: '৳1,200',
      status: 'confirmed',
      progress: 75,
      description: 'Cabbage, Cauliflower, Carrots',
      daysLeft: 44
    },
    {
      id: 2,
      productName: 'Organic Rice (Aman)',
      farmer: 'Sultana Begum',
      expectedDate: '2025-12-01',
      quantity: '50 kg',
      totalAmount: '৳3,000',
      status: 'growing',
      progress: 60,
      description: 'Premium quality Aman rice',
      daysLeft: 60
    },
    {
      id: 3,
      productName: 'Seasonal Fruits Mix',
      farmer: 'Ibrahim Hossain',
      expectedDate: '2025-10-20',
      quantity: '15 kg',
      totalAmount: '৳900',
      status: 'ready',
      progress: 95,
      description: 'Guava, Orange, Pomegranate',
      daysLeft: 18
    },
    {
      id: 4,
      productName: 'Fresh Milk Supply',
      farmer: 'Rashida Farm',
      expectedDate: '2025-10-05',
      quantity: '10 L/day',
      totalAmount: '৳2,100',
      status: 'processing',
      progress: 85,
      description: '7 days supply - Daily delivery',
      daysLeft: 3
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="status-icon confirmed" />;
      case 'growing':
        return <Package size={16} className="status-icon growing" />;
      case 'ready':
        return <AlertCircle size={16} className="status-icon ready" />;
      case 'processing':
        return <Clock size={16} className="status-icon processing" />;
      default:
        return <Clock size={16} className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'growing':
        return 'Growing';
      case 'ready':
        return 'Ready';
      case 'processing':
        return 'Processing';
      default:
        return 'Unknown';
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="active-preorders">
      <div className="section-header">
        <h2 className="section-title">Active Pre-Orders</h2>
        <button className="view-all-btn">
          View All
        </button>
      </div>

      <div className="preorders-container">
        {preOrders.map((order, index) => (
          <motion.div
            key={order.id}
            className={`preorder-item ${order.status}`}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <div className="preorder-header">
              <div className="product-info">
                <h3 className="product-name">{order.productName}</h3>
                <p className="farmer-name">by {order.farmer}</p>
              </div>
              <div className="status-badge">
                {getStatusIcon(order.status)}
                <span>{getStatusText(order.status)}</span>
              </div>
            </div>

            <div className="preorder-details">
              <p className="product-description">{order.description}</p>

              <div className="order-specs">
                <div className="spec-item">
                  <Package size={14} />
                  <span>{order.quantity}</span>
                </div>
                <div className="spec-item">
                  <Calendar size={14} />
                  <span>{new Date(order.expectedDate).toLocaleDateString('en-GB')}</span>
                </div>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-label">Progress</span>
                <span className="progress-percentage">{order.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${order.progress}%` }}
                ></div>
              </div>
              <div className="time-remaining">
                <Clock size={12} />
                <span>{order.daysLeft} days remaining</span>
              </div>
            </div>

            <div className="preorder-footer">
              <div className="amount-info">
                <span className="total-amount">{order.totalAmount}</span>
              </div>
              <div className="action-buttons">
                <button className="btn-outline-small">
                  Track
                </button>
                <button className="btn-primary-small">
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivePreOrders;
