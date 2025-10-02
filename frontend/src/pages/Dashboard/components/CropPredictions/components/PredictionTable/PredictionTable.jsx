import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';
import './PredictionTable.css';

const PredictionTable = ({ predictions }) => {
  const getQualityColor = (quality) => {
    if (quality >= 90) return 'text-green-600 bg-green-50';
    if (quality >= 80) return 'text-yellow-600 bg-yellow-50';
    if (quality >= 70) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getFactorIcon = (factor) => {
    switch (factor) {
      case 'optimal':
      case 'favorable':
        return '✅';
      case 'good':
        return '🟢';
      case 'moderate':
        return '🟡';
      case 'challenging':
        return '🟠';
      default:
        return '🔴';
    }
  };

  return (
    <div className="prediction-table">
      <div className="table-container">
        <table className="predictions-data-table">
          <thead>
            <tr>
              <th>Crop</th>
              <th>Region</th>
              <th>Quality Score</th>
              <th>Quantity</th>
              <th>Harvest Date</th>
              <th>Confidence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction, index) => (
              <motion.tr
                key={prediction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="prediction-row"
              >
                <td>
                  <div className="crop-cell">
                    <div className="crop-name">{prediction.crop}</div>
                    <div className="crop-variety">{prediction.variety}</div>
                  </div>
                </td>
                <td>
                  <div className="region-cell">
                    <MapPin size={14} className="region-icon" />
                    <div>
                      <div className="region-name">{prediction.region}</div>
                      <div className="district-name">{prediction.district}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="quality-cell">
                    <div className={`quality-score ${getQualityColor(prediction.quality)}`}>
                      {prediction.quality}%
                    </div>
                    <div className="quality-factors">
                      <span title={`Weather: ${prediction.factors.weather}`}>
                        {getFactorIcon(prediction.factors.weather)}
                      </span>
                      <span title={`Soil: ${prediction.factors.soil}`}>
                        {getFactorIcon(prediction.factors.soil)}
                      </span>
                      <span title={`Pest Risk: ${prediction.factors.pest}`}>
                        {getFactorIcon(prediction.factors.pest)}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="quantity-cell">
                    <span className="quantity-value">{prediction.quantity.toLocaleString()}</span>
                    <span className="quantity-unit">kg</span>
                  </div>
                </td>
                <td>
                  <div className="date-cell">
                    <Calendar size={14} className="date-icon" />
                    {new Date(prediction.harvestDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </td>
                <td>
                  <div className="confidence-cell">
                    <div className="confidence-bar">
                      <div
                        className="confidence-fill"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                    <span className="confidence-value">{prediction.confidence}%</span>
                  </div>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="action-btn primary">
                      Pre-Order Now
                    </button>
                    <button className="action-btn secondary">
                      <TrendingUp size={14} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PredictionTable;
