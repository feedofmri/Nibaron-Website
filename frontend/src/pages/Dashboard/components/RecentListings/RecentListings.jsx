import React from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar, MapPin, Eye } from 'lucide-react';
import './RecentListings.css';

const RecentListings = () => {
  // Mock data for recent listings
  const listings = [
    {
      id: 1,
      name: 'Premium Boro Rice',
      farmer: 'Abdul Rahman',
      location: 'Sirajganj, Rajshahi',
      price: '৳45/kg',
      image: 'https://picsum.photos/80/80?random=21',
      status: 'Available',
      quality: 'Grade A'
    },
    {
      id: 2,
      name: 'Organic Potatoes',
      farmer: 'Fatema Khatun',
      location: 'Munshiganj, Dhaka',
      price: '৳35/kg',
      image: 'https://picsum.photos/80/80?random=22',
      status: 'Limited',
      quality: 'Premium'
    },
    {
      id: 3,
      name: 'Fresh Tomatoes',
      farmer: 'Mizanur Rahman',
      location: 'Jessore, Khulna',
      price: '৻40/kg',
      image: 'https://picsum.photos/80/80?random=23',
      status: 'Available',
      quality: 'Grade A'
    },
    {
      id: 4,
      name: 'Premium Wheat',
      farmer: 'Nasir Ahmed',
      location: 'Dinajpur, Rangpur',
      price: '৳42/kg',
      image: 'https://picsum.photos/80/80?random=24',
      status: 'Pre-order',
      quality: 'Export Quality'
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="recent-listings">
      <div className="section-header">
        <h2 className="section-title">Recent Listings</h2>
        <button className="view-all-btn">
          View All
          <Eye size={16} />
        </button>
      </div>

      <div className="listings-container">
        {listings.map((listing, index) => (
          <motion.div
            key={listing.id}
            className={`listing-item ${listing.status}`}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <div className="listing-image">
              <img src={listing.image} alt={listing.name} />
              <div className={`status-badge ${listing.status}`}>
                {listing.status === 'available' ? 'Available' : 'Low Stock'}
              </div>
            </div>

            <div className="listing-content">
              <div className="listing-main">
                <h3 className="listing-name">{listing.name}</h3>
                <p className="listing-farmer">by {listing.farmer}</p>
                <div className="listing-details">
                  <span className="location">
                    <MapPin size={14} />
                    {listing.location}
                  </span>
                  <span className="quantity">
                    <Package size={14} />
                    {listing.quantity}
                  </span>
                </div>
              </div>

              <div className="listing-footer">
                <div className="price-info">
                  <span className="price">{listing.price}</span>
                </div>
                <div className="time-info">
                  <Calendar size={14} />
                  <span>{listing.posted}</span>
                </div>
              </div>
            </div>

            <div className="listing-actions">
              <button className="btn-primary-small">
                Contact
              </button>
              <button className="btn-outline-small">
                Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="listings-footer">
        <button className="load-more-btn">
          Load More Listings
        </button>
      </div>
    </div>
  );
};

export default RecentListings;
