import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Leaf, TrendingUp } from 'lucide-react';
import './StatsSection.css';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: Users,
      number: '25,000+',
      label: 'Happy Customers',
      description: 'Satisfied buyers and farmers using our platform',
      color: '#3b82f6'
    },
    {
      id: 2,
      icon: ShoppingBag,
      number: '500K+',
      label: 'Orders Completed',
      description: 'Fresh produce delivered nationwide',
      color: '#10b981'
    },
    {
      id: 3,
      icon: Leaf,
      number: '15,000+',
      label: 'Local Farmers',
      description: 'Trusted farmers in our network',
      color: '#059669'
    },
    {
      id: 4,
      icon: TrendingUp,
      number: '98%',
      label: 'Accuracy Rate',
      description: 'AI crop prediction accuracy',
      color: '#f59e0b'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="stats-section landing-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Trusted by Thousands</h2>
          <p className="section-subtitle">
            Join Bangladesh's largest network of farmers and buyers. See how Nibaron is transforming agriculture.
          </p>
        </motion.div>

        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                className="stat-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="stat-icon" style={{ color: stat.color }}>
                  <IconComponent size={32} />
                </div>
                <div className="stat-number" style={{ color: stat.color }}>
                  {stat.number}
                </div>
                <h3 className="stat-label">{stat.label}</h3>
                <p className="stat-description">{stat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="stats-testimonial"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="testimonial-content">
            <blockquote>
              "Nibaron has revolutionized how I sell my crops. The AI predictions help me plan better, and I get fair prices directly from customers."
            </blockquote>
            <div className="testimonial-author">
              <img src="https://picsum.photos/48/48?random=6" alt="Farmer" className="author-avatar" />
              <div className="author-info">
                <div className="author-name">Abdul Karim</div>
                <div className="author-role">Rice Farmer, Rajshahi</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
