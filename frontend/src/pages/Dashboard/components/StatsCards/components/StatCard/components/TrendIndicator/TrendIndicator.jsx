import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './TrendIndicator.css';

const TrendIndicator = ({ change, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'positive':
        return <TrendingUp size={14} />;
      case 'negative':
        return <TrendingDown size={14} />;
      default:
        return <Minus size={14} />;
    }
  };

  const getClassName = () => {
    return `trend-indicator trend-indicator--${type}`;
  };

  return (
    <div className={getClassName()}>
      {getIcon()}
      <span className="trend-value">{change}</span>
      <span className="trend-period">vs last month</span>
    </div>
  );
};

export default TrendIndicator;
