import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-column">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M16 2C16 2 12 6 12 10C12 14 16 16 16 16C16 16 20 14 20 10C20 6 16 2 16 2Z"
                    fill="currentColor"
                    className="text-primary-500"
                  />
                  <path
                    d="M16 16C16 16 12 18 12 22C12 26 16 30 16 30C16 30 20 26 20 22C20 18 16 16 16 16Z"
                    fill="currentColor"
                    className="text-accent-500"
                  />
                </svg>
              </div>
              <span className="logo-text">Nibaron Bazaar</span>
            </div>
            <p className="footer-description">
              স্মার্ট কৃষি বাজার - Connecting farmers and buyers through AI-powered
              crop predictions and transparent trading.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>hello@nibaron-bazaar.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+880 1700-000000</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="footer-column">
            <h3 className="footer-title">Products</h3>
            <ul className="footer-links">
              <li><Link to="/marketplace">Marketplace</Link></li>
              <li><Link to="/pre-orders">Pre-Orders</Link></li>
              <li><Link to="/analytics">AI Predictions</Link></li>
              <li><Link to="/community">Community</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-column">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/docs">Documentation</Link></li>
              <li><Link to="/status">System Status</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-column">
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
              <li><Link to="/compliance">Compliance</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-description">
              Get the latest crop predictions and market insights delivered to your inbox.
            </p>
          </div>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2025 Nibaron Bazaar. All rights reserved.</p>
            <p className="made-with-love">
              Made with 💚 for farmers in Bangladesh
            </p>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <a href="#" aria-label="Facebook" className="social-link">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="social-link">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="social-link">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="social-link">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
