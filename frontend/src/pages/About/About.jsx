import React from 'react';
import {
  Users, Leaf, TrendingUp, Award, Globe,
  Satellite, Database, Brain, Target, Heart,
  CheckCircle, ExternalLink, Zap, Shield
} from 'lucide-react';
import './About.css';

const About = () => {
  const nasaDatasets = [
    {
      name: 'POWER (Prediction Of Worldwide Energy Resources)',
      image: '/nasa-power.jpg',
      description: 'NASA POWER provides solar and meteorological data for renewable energy, building energy efficiency, and agricultural needs. We use this for weather predictions, solar radiation data, and climate analysis to help farmers make informed decisions.',
      link: 'https://power.larc.nasa.gov/',
      features: ['Temperature Data', 'Precipitation', 'Solar Radiation', 'Wind Speed']
    },
    {
      name: 'SMAP (Soil Moisture Active Passive)',
      image: '/nasa-smap.jpg',
      description: 'SMAP measures soil moisture and freeze/thaw state globally. We integrate this data to provide farmers with crucial soil moisture information for irrigation planning and crop health monitoring.',
      link: 'https://smap.jpl.nasa.gov/',
      features: ['Soil Moisture Levels', 'Freeze/Thaw Detection', 'Root Zone Moisture', 'Agricultural Monitoring']
    },
    {
      name: 'MODIS (Moderate Resolution Imaging Spectroradiometer)',
      image: '/nasa-modis.jpg',
      description: 'MODIS provides satellite imagery for monitoring vegetation health, land cover changes, and environmental conditions. We use NDVI data for crop health assessment and yield predictions.',
      link: 'https://modis.gsfc.nasa.gov/',
      features: ['Vegetation Index', 'Land Cover', 'Crop Health', 'Environmental Monitoring']
    },
    {
      name: 'GPM (Global Precipitation Measurement)',
      image: '/nasa-gpm.jpg',
      description: 'GPM provides next-generation global observations of rain and snow. We utilize this for accurate rainfall predictions and drought monitoring to help farmers plan their agricultural activities.',
      link: 'https://gpm.nasa.gov/',
      features: ['Rainfall Measurement', 'Drought Detection', 'Flood Prediction', 'Water Cycle Analysis']
    }
  ];

  const teamMembers = [
    {
      name: 'System Administrator',
      role: 'Platform Manager',
      email: 'admin@nibaron.com'
    }
  ];

  const statistics = [
    { icon: Users, value: '8+', label: 'Active Buyers' },
    { icon: Leaf, value: 'AI-Powered', label: 'Predictions' },
    { icon: Globe, value: 'NASA', label: 'Data Integration' },
    { icon: Award, value: '92%+', label: 'Quality Accuracy' }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Machine learning algorithms analyze NASA satellite data to predict crop yields with 92%+ accuracy.'
    },
    {
      icon: Satellite,
      title: 'Satellite Monitoring',
      description: 'Real-time satellite imagery from NASA MODIS for vegetation health and environmental monitoring.'
    },
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Direct buyer-farmer connections with transparent pricing and future harvest pre-orders.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Verified farmers and buyers with quality certification and secure transaction systems.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <Leaf className="hero-icon" />
            About Nibaron
          </h1>
          <p className="hero-subtitle">
            Revolutionizing Agriculture with NASA Satellite Data & AI Technology
          </p>
          <p className="hero-description">
            Nibaron is Bangladesh's first AI-powered agricultural marketplace that leverages NASA satellite
            data and machine learning to connect farmers with buyers while providing intelligent crop
            predictions and market insights.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="statistics-section">
        <div className="statistics-grid">
          {statistics.map((stat, index) => (
            <div key={index} className="stat-card">
              <stat.icon className="stat-icon" />
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="mission-grid">
          <div className="mission-card">
            <Target className="mission-icon" />
            <h2>Our Mission</h2>
            <p>
              To empower Bangladeshi farmers with cutting-edge technology and NASA satellite data,
              enabling them to make data-driven decisions, maximize yields, and connect directly
              with buyers for fair market prices.
            </p>
          </div>
          <div className="mission-card">
            <Heart className="mission-icon" />
            <h2>Our Vision</h2>
            <p>
              To become Bangladesh's leading agricultural technology platform, bridging the gap
              between traditional farming and modern science, creating a sustainable and profitable
              ecosystem for all stakeholders.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">What Makes Us Different</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                <feature.icon className="feature-icon" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NASA Datasets Section */}
      <section className="nasa-section">
        <div className="nasa-header">
          <Satellite className="nasa-icon" />
          <h2 className="section-title">Powered by NASA Satellite Data</h2>
          <p className="section-subtitle">
            We integrate multiple NASA Earth observation datasets to provide accurate,
            real-time agricultural intelligence for Bangladeshi farmers.
          </p>
        </div>

        <div className="nasa-datasets">
          {nasaDatasets.map((dataset, index) => (
            <div key={index} className="dataset-card">
              <div className="dataset-image">
                <img
                  src={dataset.image}
                  alt={dataset.name}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23f0f9e8" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%2368911b"%3ENASA Dataset%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="dataset-badge">
                  <Database size={16} />
                  NASA
                </div>
              </div>

              <div className="dataset-content">
                <h3 className="dataset-name">{dataset.name}</h3>
                <p className="dataset-description">{dataset.description}</p>

                <div className="dataset-features">
                  {dataset.features.map((feature, idx) => (
                    <div key={idx} className="dataset-feature">
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={dataset.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dataset-link"
                >
                  <span>Explore Dataset</span>
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="nasa-integration-info">
          <Zap className="integration-icon" />
          <div className="integration-content">
            <h3>Real-Time Integration</h3>
            <p>
              Our platform automatically fetches and processes NASA satellite data every 6 hours,
              ensuring farmers receive the most up-to-date information for their agricultural decisions.
              The AI models analyze this data alongside local weather patterns to provide highly accurate
              crop predictions and recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How Nibaron Works</h2>
        <div className="process-grid">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Data Collection</h3>
            <p>NASA satellites continuously monitor soil moisture, weather patterns, and vegetation health across Bangladesh.</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>Our machine learning models process the satellite data to predict crop yields, quality, and optimal harvest times.</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Farmer Insights</h3>
            <p>Farmers receive actionable recommendations on irrigation, fertilization, and harvest timing through the app.</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Market Connection</h3>
            <p>Buyers can pre-order future harvests with AI quality predictions, ensuring fair prices and reducing waste.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="impact-content">
          <h2 className="section-title">Our Impact</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-number">30%</div>
              <p>Average yield increase with AI recommendations</p>
            </div>
            <div className="impact-card">
              <div className="impact-number">25%</div>
              <p>Reduction in crop waste through pre-orders</p>
            </div>
            <div className="impact-card">
              <div className="impact-number">40%</div>
              <p>Better pricing for farmers through direct connections</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="tech-section">
        <h2 className="section-title">Built with Modern Technology</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <div className="tech-icon">🛰️</div>
            <h4>NASA APIs</h4>
            <p>POWER, SMAP, MODIS, GPM</p>
          </div>
          <div className="tech-item">
            <div className="tech-icon">🤖</div>
            <h4>Machine Learning</h4>
            <p>TensorFlow, Scikit-learn</p>
          </div>
          <div className="tech-item">
            <div className="tech-icon">⚛️</div>
            <h4>Frontend</h4>
            <p>React, Tailwind CSS</p>
          </div>
          <div className="tech-item">
            <div className="tech-icon">🔧</div>
            <h4>Backend</h4>
            <p>Laravel, PHP 8.1+</p>
          </div>
          <div className="tech-item">
            <div className="tech-icon">💾</div>
            <h4>Database</h4>
            <p>MySQL, Redis Cache</p>
          </div>
          <div className="tech-item">
            <div className="tech-icon">🔐</div>
            <h4>Security</h4>
            <p>Laravel Sanctum, HTTPS</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="section-title">Our Team</h2>
        <p className="section-subtitle">
          Dedicated professionals working to revolutionize agriculture in Bangladesh
        </p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">
                <Users size={40} />
              </div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <a href={`mailto:${member.email}`} className="team-email">
                {member.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Join the Agricultural Revolution</h2>
          <p>
            Whether you're a farmer looking to optimize your yields or a buyer seeking
            quality produce, Nibaron is here to help you succeed.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => window.location.href = '/signup'}>
              Get Started Today
            </button>
            <button className="btn-secondary" onClick={() => window.location.href = '/marketplace'}>
              Explore Marketplace
            </button>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="footer-note">
        <p>
          <strong>Note:</strong> All NASA datasets are publicly available and free to use.
          We acknowledge NASA's contribution to making Earth observation data accessible
          for agricultural development worldwide.
        </p>
      </section>
    </div>
  );
};

export default About;

