import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Sun, Wind, Zap, TrendingUp } from 'lucide-react';
import './FloatingElements.css';

const FloatingElements = () => {
  const elements = [
    {
      id: 1,
      icon: <Leaf size={24} />,
      position: { top: '10%', left: '5%' },
      delay: 0,
      color: '#10b981'
    },
    {
      id: 2,
      icon: <Droplets size={20} />,
      position: { top: '20%', right: '10%' },
      delay: 0.5,
      color: '#3b82f6'
    },
    {
      id: 3,
      icon: <Sun size={22} />,
      position: { top: '60%', left: '8%' },
      delay: 1,
      color: '#f59e0b'
    },
    {
      id: 4,
      icon: <Wind size={18} />,
      position: { top: '70%', right: '15%' },
      delay: 1.5,
      color: '#6b7280'
    },
    {
      id: 5,
      icon: <Zap size={16} />,
      position: { top: '40%', right: '5%' },
      delay: 2,
      color: '#8b5cf6'
    },
    {
      id: 6,
      icon: <TrendingUp size={20} />,
      position: { bottom: '15%', left: '10%' },
      delay: 2.5,
      color: '#ef4444'
    }
  ];

  const floatingAnimation = {
    y: [-10, 10, -10],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="floating-elements">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="floating-element"
          style={{
            ...element.position,
            color: element.color
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: element.delay,
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <motion.div
            className="element-icon"
            animate={floatingAnimation}
            style={{
              '--element-delay': `${element.delay}s`,
              backgroundColor: `${element.color}15`,
              borderColor: `${element.color}30`
            }}
          >
            {element.icon}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
