import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './FloatingElements.css';

const FloatingElements = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate floating elements on mount
    const generateElements = () => {
      const elementTypes = [
        { type: 'wheat', symbol: '🌾', size: 'large' },
        { type: 'rice', symbol: '🌾', size: 'medium' },
        { type: 'leaf', symbol: '🍃', size: 'small' },
        { type: 'circle', symbol: '●', size: 'tiny' },
        { type: 'grain', symbol: '•', size: 'tiny' },
      ];

      const newElements = [];

      for (let i = 0; i < 12; i++) {
        const elementType = elementTypes[Math.floor(Math.random() * elementTypes.length)];
        newElements.push({
          id: i,
          ...elementType,
          x: Math.random() * 100,
          y: Math.random() * 100,
          animationDelay: Math.random() * 20,
          animationDuration: 15 + Math.random() * 10,
          opacity: 0.03 + Math.random() * 0.05,
        });
      }

      setElements(newElements);
    };

    generateElements();
  }, []);

  const getSizeClass = (size) => {
    switch (size) {
      case 'large': return 'text-6xl';
      case 'medium': return 'text-4xl';
      case 'small': return 'text-2xl';
      case 'tiny': return 'text-xl';
      default: return 'text-2xl';
    }
  };

  return (
    <div className="floating-elements-container">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`floating-element ${getSizeClass(element.size)}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            opacity: element.opacity,
          }}
          animate={{
            x: [0, 30, -20, 40, 0],
            y: [0, -40, -80, -60, 0],
            rotate: [0, 5, -3, 7, 0],
          }}
          transition={{
            duration: element.animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.animationDelay,
          }}
        >
          {element.symbol}
        </motion.div>
      ))}

      {/* Gradient mesh background */}
      <div className="gradient-mesh" />

      {/* Grid pattern overlay */}
      <div className="grid-pattern" />
    </div>
  );
};

export default FloatingElements;
