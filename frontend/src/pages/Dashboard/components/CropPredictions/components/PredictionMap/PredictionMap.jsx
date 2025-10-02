import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Thermometer, Droplets, Wind, Sun } from 'lucide-react';
import './PredictionMap.css';

const PredictionMap = ({ selectedCrop, predictions }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Mock data for different regions in Bangladesh
  const regions = [
    {
      id: 'dhaka',
      name: 'Dhaka Division',
      coordinates: { x: 45, y: 35 },
      prediction: {
        yield: 'High',
        confidence: 92,
        temperature: 28,
        rainfall: 145,
        humidity: 78,
        windSpeed: 12
      },
      color: '#10b981' // Green for high yield
    },
    {
      id: 'chittagong',
      name: 'Chittagong Division',
      coordinates: { x: 75, y: 50 },
      prediction: {
        yield: 'Medium',
        confidence: 85,
        temperature: 30,
        rainfall: 180,
        humidity: 82,
        windSpeed: 15
      },
      color: '#f59e0b' // Amber for medium yield
    },
    {
      id: 'rajshahi',
      name: 'Rajshahi Division',
      coordinates: { x: 25, y: 25 },
      prediction: {
        yield: 'High',
        confidence: 89,
        temperature: 26,
        rainfall: 120,
        humidity: 70,
        windSpeed: 10
      },
      color: '#10b981'
    },
    {
      id: 'khulna',
      name: 'Khulna Division',
      coordinates: { x: 30, y: 65 },
      prediction: {
        yield: 'Low',
        confidence: 78,
        temperature: 32,
        rainfall: 95,
        humidity: 85,
        windSpeed: 18
      },
      color: '#ef4444' // Red for low yield
    },
    {
      id: 'sylhet',
      name: 'Sylhet Division',
      coordinates: { x: 65, y: 15 },
      prediction: {
        yield: 'Medium',
        confidence: 81,
        temperature: 27,
        rainfall: 200,
        humidity: 88,
        windSpeed: 8
      },
      color: '#f59e0b'
    },
    {
      id: 'barisal',
      name: 'Barisal Division',
      coordinates: { x: 40, y: 75 },
      prediction: {
        yield: 'Medium',
        confidence: 83,
        temperature: 29,
        rainfall: 165,
        humidity: 80,
        windSpeed: 14
      },
      color: '#f59e0b'
    },
    {
      id: 'rangpur',
      name: 'Rangpur Division',
      coordinates: { x: 35, y: 10 },
      prediction: {
        yield: 'High',
        confidence: 90,
        temperature: 25,
        rainfall: 110,
        humidity: 72,
        windSpeed: 11
      },
      color: '#10b981'
    },
    {
      id: 'mymensingh',
      name: 'Mymensingh Division',
      coordinates: { x: 50, y: 20 },
      prediction: {
        yield: 'High',
        confidence: 87,
        temperature: 27,
        rainfall: 135,
        humidity: 75,
        windSpeed: 9
      },
      color: '#10b981'
    }
  ];

  const getYieldColor = (yieldLevel) => {
    switch (yieldLevel) {
      case 'High': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="prediction-map">
      <div className="map-header">
        <h3 className="map-title">
          <MapPin size={20} />
          Regional Predictions - {selectedCrop}
        </h3>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color high"></div>
            <span>High Yield</span>
          </div>
          <div className="legend-item">
            <div className="legend-color medium"></div>
            <span>Medium Yield</span>
          </div>
          <div className="legend-item">
            <div className="legend-color low"></div>
            <span>Low Yield</span>
          </div>
        </div>
      </div>

      <div className="map-container">
        <div className="bangladesh-map">
          <svg viewBox="0 0 100 100" className="map-svg">
            {/* Simplified Bangladesh outline */}
            <path
              d="M15,20 Q20,15 30,18 L45,12 Q55,10 65,15 L75,20 Q85,25 90,35 L88,50 Q85,65 80,75 L70,85 Q60,90 45,88 L30,85 Q20,80 15,70 L12,50 Q10,35 15,20 Z"
              className="country-outline"
              fill="#f8fafc"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />

            {/* Region markers */}
            {regions.map((region) => (
              <g key={region.id}>
                <circle
                  cx={region.coordinates.x}
                  cy={region.coordinates.y}
                  r="3"
                  fill={region.color}
                  className={`region-marker ${selectedRegion?.id === region.id ? 'selected' : ''}`}
                  onClick={() => setSelectedRegion(region)}
                  style={{ cursor: 'pointer' }}
                />
                <text
                  x={region.coordinates.x}
                  y={region.coordinates.y - 5}
                  className="region-label"
                  textAnchor="middle"
                  fontSize="2.5"
                  fill="#374151"
                >
                  {region.name.split(' ')[0]}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {selectedRegion && (
          <motion.div
            className="region-details"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="details-header">
              <h4>{selectedRegion.name}</h4>
              <button
                className="close-btn"
                onClick={() => setSelectedRegion(null)}
              >
                ×
              </button>
            </div>

            <div className="prediction-info">
              <div className="yield-prediction">
                <span className="yield-label">Predicted Yield:</span>
                <span
                  className="yield-value"
                  style={{ color: getYieldColor(selectedRegion.prediction.yield) }}
                >
                  {selectedRegion.prediction.yield}
                </span>
              </div>
              <div className="confidence-bar">
                <span className="confidence-label">Confidence: {selectedRegion.prediction.confidence}%</span>
                <div className="confidence-progress">
                  <div
                    className="confidence-fill"
                    style={{ width: `${selectedRegion.prediction.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="weather-conditions">
              <h5>Weather Conditions</h5>
              <div className="conditions-grid">
                <div className="condition-item">
                  <Thermometer size={16} />
                  <span>{selectedRegion.prediction.temperature}°C</span>
                </div>
                <div className="condition-item">
                  <Droplets size={16} />
                  <span>{selectedRegion.prediction.rainfall}mm</span>
                </div>
                <div className="condition-item">
                  <Sun size={16} />
                  <span>{selectedRegion.prediction.humidity}%</span>
                </div>
                <div className="condition-item">
                  <Wind size={16} />
                  <span>{selectedRegion.prediction.windSpeed} km/h</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="map-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-value">{regions.filter(r => r.prediction.yield === 'High').length}</span>
            <span className="stat-label">High Yield Regions</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{regions.filter(r => r.prediction.yield === 'Medium').length}</span>
            <span className="stat-label">Medium Yield Regions</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{regions.filter(r => r.prediction.yield === 'Low').length}</span>
            <span className="stat-label">Low Yield Regions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionMap;
