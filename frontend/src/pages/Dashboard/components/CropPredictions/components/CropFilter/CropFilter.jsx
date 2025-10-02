import React from 'react';
import './CropFilter.css';

const CropFilter = ({ selectedCrop, onCropChange }) => {
  const cropOptions = [
    { value: 'all', label: 'All Crops' },
    { value: 'rice', label: '🌾 Rice' },
    { value: 'wheat', label: '🌾 Wheat' },
    { value: 'potato', label: '🥔 Potato' },
    { value: 'onion', label: '🧅 Onion' },
    { value: 'tomato', label: '🍅 Tomato' },
  ];

  return (
    <select
      value={selectedCrop}
      onChange={(e) => onCropChange(e.target.value)}
      className="crop-filter-select"
    >
      {cropOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CropFilter;
