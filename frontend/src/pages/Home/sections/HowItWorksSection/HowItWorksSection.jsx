import React from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, ShoppingCart, Truck } from 'lucide-react';
import './HowItWorksSection.css';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: 'Discover Products',
      description: 'Browse fresh produce directly from local farmers or use AI predictions to pre-order future harvests.',
      color: '#3b82f6'
    },
    {
      id: 2,
      icon: MessageSquare,
      title: 'Connect with Farmers',
      description: 'Chat directly with farmers, ask questions, and build relationships with your local food producers.',
      color: '#10b981'
    },
    {
      id: 3,
      icon: ShoppingCart,
      title: 'Place Your Order',
      description: 'Order fresh produce or pre-order seasonal crops with transparent pricing and quality guarantees.',
      color: '#f59e0b'
    },
    {
      id: 4,
      icon: Truck,
      title: 'Get Fresh Delivery',
      description: 'Receive farm-fresh produce delivered to your door or pickup from convenient local locations.',
      color: '#8b5cf6'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="how-it-works-section landing-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">How Nibaron Works</h2>
          <p className="section-subtitle">
            From farm to your table in four simple steps. Connect directly with farmers and enjoy fresh, local produce.
          </p>
        </motion.div>

        <motion.div
          className="steps-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.id}
                className="step-card"
                variants={itemVariants}
              >
                <div className="step-number" style={{ backgroundColor: step.color }}>
                  {step.id}
                </div>
                <div className="step-icon" style={{ color: step.color }}>
                  <IconComponent size={32} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="step-connector">
                    <div className="connector-line"></div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="how-it-works-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>Ready to get started?</h3>
          <p>Join thousands of satisfied customers who trust Nibaron for fresh, local produce.</p>
          <button className="btn-primary">
            Start Shopping Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
