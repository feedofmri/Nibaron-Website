import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Globe, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import nibaronIcon from '../../../../assets/images/nibaron_icon.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <Link to="/" className="footer-brand-logo">
              <img src={nibaronIcon} alt="Nibaron Bazaar" className="footer-logo-image" />
              <div className="footer-brand-text">
                <span className="footer-brand-title">Nibaron</span>
                <span className="footer-brand-subtitle">Bazaar</span>
              </div>
            </Link>
            <p className="brand-description">
              স্মার্ট কৃষি বাজার - Connecting farmers directly with consumers through AI-powered crop predictions and sustainable agriculture.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-section"><h4 className="footer-section-title">Marketplace</h4>
          <ul className="footer-links">
            <li><Link to="/marketplace">Browse Products</Link></li>
            <li><Link to="/pre-orders">Pre-Order Crops</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/community">Farmer Community</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Account</h4>
          <ul className="footer-links">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/help">Help & Support</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Contact Info</h4>
          <ul className="footer-links">
            <li><a href="https://maps.google.com/?q=Dhaka,Bangladesh" target="_blank" rel="noopener noreferrer"><MapPin size={16} /> Dhaka, Bangladesh</a></li>
            <li><a href="tel:+8801234567890"><Phone size={16} /> +880 1234-567890</a></li>
            <li><a href="mailto:info@nibaronbazaar.com"><Mail size={16} /> info@nibaronbazaar.com</a></li>
            <li><a href="https://www.nibaronbazaar.com" target="_blank" rel="noopener noreferrer"><Globe size={16} /> www.nibaronbazaar.com</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            <p>
              © 2025 Nibaron Bazaar. Made with <Heart size={14} className="heart-icon" /> for sustainable agriculture in Bangladesh.
            </p>
          </div>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
