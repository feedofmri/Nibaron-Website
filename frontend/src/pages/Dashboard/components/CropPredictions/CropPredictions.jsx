import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Filter, TrendingUp, MapPin } from 'lucide-react';
import PredictionMap from './components/PredictionMap/PredictionMap';
import PredictionTable from './components/PredictionTable/PredictionTable';
import CropFilter from './components/CropFilter/CropFilter';
import './CropPredictions.css';

const CropPredictions = () => {
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [viewMode, setViewMode] = useState('map');
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8000/api/crop-predictions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('nibaron_access_token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch predictions');
        const data = await response.json();
        setPredictions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPredictions();
  }, []);

  const filteredPredictions = selectedCrop === 'all'
    ? predictions
    : predictions.filter(p => p.crop.toLowerCase().includes(selectedCrop.toLowerCase()));

  return (
    <motion.div
      className="crop-predictions"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="predictions-header">
        <div className="header-left">
          <div className="header-icon">
            <Brain size={24} />
          </div>
          <div className="header-content">
            <h2 className="section-title">AI Crop Quality Predictions</h2>
            <p className="section-subtitle">Current Season Forecast</p>
          </div>
        </div>

        <div className="header-actions">
          <CropFilter
            selectedCrop={selectedCrop}
            onCropChange={setSelectedCrop}
          />

          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <MapPin size={16} />
              Map
            </button>
            <button
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <TrendingUp size={16} />
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="predictions-content">
        {loading && <p>Loading predictions...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          viewMode === 'map' ? (
            <PredictionMap predictions={filteredPredictions} />
          ) : (
            <PredictionTable predictions={filteredPredictions} />
          )
        )}
      </div>

      {/* Summary Stats */}
      <div className="predictions-summary">
        <div className="summary-item">
          <span className="summary-label">Total Predictions</span>
          <span className="summary-value">{filteredPredictions.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Avg. Quality Score</span>
          <span className="summary-value">
            {Math.round(filteredPredictions.reduce((acc, p) => acc + p.quality, 0) / filteredPredictions.length)}%
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Quantity</span>
          <span className="summary-value">
            {(filteredPredictions.reduce((acc, p) => acc + p.quantity, 0) / 1000).toFixed(1)}K tons
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Avg. Confidence</span>
          <span className="summary-value">
            {Math.round(filteredPredictions.reduce((acc, p) => acc + p.confidence, 0) / filteredPredictions.length)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CropPredictions;
