import React from 'react';
import { motion } from 'framer-motion';
import StatCard from './components/StatCard/StatCard';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      className="stats-cards"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.id}
          stat={stat}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default StatsCards;
