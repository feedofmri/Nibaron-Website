import React from 'react';
import { Heart, Globe, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <h3 className="brand-title">
              🌱 Nibaron Bazaar
            </h3>
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

        <div className="footer-section">
          <h4 className="section-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/marketplace">Marketplace</a></li>
            <li><a href="/predictions">Crop Predictions</a></li>
            <li><a href="/pre-orders">Pre-Orders</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/farmers">For Farmers</a></li>
            <li><a href="/buyers">For Buyers</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="section-title">Support</h4>
          <ul className="footer-links">
            <li><a href="/help">Help Center</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/feedback">Feedback</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="section-title">Contact Info</h4>
          <div className="contact-info">
            <div className="contact-item">
              <MapPin size={16} />
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>+880 1234-567890</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>info@nibaronbazaar.com</span>
            </div>
            <div className="contact-item">
              <Globe size={16} />
              <span>www.nibaronbazaar.com</span>
            </div>
          </div>
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
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
