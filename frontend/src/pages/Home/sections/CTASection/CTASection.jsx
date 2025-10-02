import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Shield, Zap } from 'lucide-react';
import './CTASection.css';

const CTASection = () => {
  const benefits = [
    {
      icon: Users,
      text: 'Join 25,000+ satisfied customers'
    },
    {
      icon: Shield,
      text: 'Quality guaranteed or money back'
    },
    {
      icon: Zap,
      text: 'AI-powered crop predictions'
    }
  ];

  return (
    <section className="cta-section landing-section">
      <div className="section-container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="cta-main">
            <h2 className="cta-title">
              Ready to Transform Your Food Shopping?
            </h2>
            <p className="cta-subtitle">
              Join thousands of customers who trust Nibaron for fresh, local produce.
              Start your journey to better food today.
            </p>

            <div className="cta-benefits">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    className="benefit-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <IconComponent size={16} />
                    <span>{benefit.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="cta-buttons"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <button className="btn-primary cta-btn-primary">
                Get Started Now
                <ArrowRight size={18} />
              </button>
              <button className="btn-secondary cta-btn-secondary">
                Learn More
              </button>
            </motion.div>
          </div>

          <motion.div
            className="cta-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="visual-card">
              <div className="card-header">
                <div className="status-indicators">
                  <span className="status-dot green"></span>
                  <span className="status-dot yellow"></span>
                  <span className="status-dot red"></span>
                </div>
                <h3>Your Dashboard</h3>
              </div>
              <div className="card-content">
                <div className="stat-row">
                  <span>Fresh Orders</span>
                  <span className="stat-value">12</span>
                </div>
                <div className="stat-row">
                  <span>Farmers Connected</span>
                  <span className="stat-value">8</span>
                </div>
                <div className="stat-row">
                  <span>Savings This Month</span>
                  <span className="stat-value highlight">৳2,480</span>
                </div>
                <div className="prediction-preview">
                  <div className="prediction-header">
                    <span>Next Harvest Prediction</span>
                    <span className="confidence">94% accuracy</span>
                  </div>
                  <div className="prediction-bar">
                    <div className="prediction-fill" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
