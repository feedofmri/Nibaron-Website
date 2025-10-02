import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Package, Users, Shield, TrendingUp, Zap } from 'lucide-react';
import FeatureCard from './components/FeatureCard/FeatureCard';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: <Brain size={32} />,
      title: 'AI Predictions',
      description: 'Advanced machine learning algorithms analyze weather patterns, soil conditions, and historical data to predict crop quality and yield with 95% accuracy.',
      benefits: ['Weather Impact Analysis', 'Yield Forecasting', 'Quality Prediction', 'Risk Assessment'],
      color: 'primary'
    },
    {
      id: 2,
      icon: <Package size={32} />,
      title: 'Smart Pre-Orders',
      description: 'Secure your supply months in advance with our pre-order system. Get guaranteed quality at locked-in prices with flexible payment options.',
      benefits: ['Guaranteed Supply', 'Locked-in Pricing', 'Flexible Payments', 'Quality Assurance'],
      color: 'accent'
    },
    {
      id: 3,
      icon: <Users size={32} />,
      title: 'Direct Connection',
      description: 'Connect directly with verified farmers and suppliers. Build lasting relationships, ensure traceability, and support sustainable agriculture.',
      benefits: ['Verified Farmers', 'Direct Communication', 'Supply Traceability', 'Fair Trade Pricing'],
      color: 'success'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section className="features-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Revolutionizing Agriculture with Technology
          </h2>
          <p className="section-subtitle">
            Empowering farmers and buyers with AI-driven insights,
            transparent trading, and sustainable supply chain solutions.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </motion.div>

        {/* Additional Benefits */}
        <motion.div
          className="additional-benefits"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="benefits-grid">
            <div className="benefit-item">
              <Shield className="benefit-icon" />
              <span>Secure Transactions</span>
            </div>
            <div className="benefit-item">
              <TrendingUp className="benefit-icon" />
              <span>Market Analytics</span>
            </div>
            <div className="benefit-item">
              <Zap className="benefit-icon" />
              <span>Instant Notifications</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
