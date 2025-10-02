import React, { useState, useEffect } from 'react';
import { User, Bell, CreditCard, HelpCircle, Eye, EyeOff, Camera, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { profileService, settingsService, supportService } from '../../services/featureServices';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'billing':
        return <BillingSettings />;
      case 'help':
        return <HelpSupport />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and settings</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Profile Settings Component
const ProfileSettings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await profileService.getProfile();
      setProfile(response.data);
      setFormData(response.data.user);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updateData = { ...formData };
      if (avatarFile) updateData.avatar = avatarFile;

      await profileService.updateProfile(updateData);
      toast.success('Profile updated successfully');
      setEditing(false);
      fetchProfile();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return <div className="loading-spinner">Loading profile...</div>;
  }

  return (
    <div className="profile-settings">
      <div className="section-header">
        <h2>Profile Information</h2>
        <button
          className={`btn-${editing ? 'secondary' : 'primary'}`}
          onClick={() => editing ? setEditing(false) : setEditing(true)}
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-display">
            <img
              src={avatarPreview || profile?.user?.avatar || '/api/placeholder/120/120'}
              alt="Profile"
              className="profile-avatar"
            />
            {editing && (
              <div className="avatar-overlay">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  id="avatar-upload"
                  hidden
                />
                <label htmlFor="avatar-upload" className="avatar-button">
                  <Camera size={20} />
                </label>
              </div>
            )}
          </div>
          <div className="profile-status">
            <h3>{profile?.user?.name || 'User Name'}</h3>
            <span className="user-type">{profile?.user?.user_type || 'Member'}</span>
            <span className="verification-badge">✓ Verified</span>
          </div>
        </div>

        {/* Profile Form */}
        <div className="profile-form">
          <div className="form-section">
            <h4>Basic Information</h4>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!editing}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!editing}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>Contact Information</h4>
            <div className="form-grid">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!editing}
                />
              </div>
              <div className="form-group">
                <label>District</label>
                <input
                  type="text"
                  value={formData.district || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                  disabled={!editing}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                value={formData.address || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                disabled={!editing}
                rows={3}
              />
            </div>
          </div>

          {profile?.user?.user_type === 'buyer' && (
            <div className="form-section">
              <h4>Business Information</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label>Business Name</label>
                  <input
                    type="text"
                    value={formData.business_name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, business_name: e.target.value }))}
                    disabled={!editing}
                  />
                </div>
                <div className="form-group">
                  <label>Buyer Type</label>
                  <select
                    value={formData.buyer_type || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, buyer_type: e.target.value }))}
                    disabled={!editing}
                  >
                    <option value="">Select Type</option>
                    <option value="wholesaler">Wholesaler</option>
                    <option value="retailer">Retailer</option>
                    <option value="exporter">Exporter</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {editing && (
            <div className="form-actions">
              <button onClick={handleSave} disabled={loading} className="btn-primary">
                <Save size={16} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        {/* Security Section */}
        <div className="security-section">
          <h4>Security</h4>
          <div className="security-actions">
            <button
              className="btn-secondary"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
};

// Notification Settings Component
const NotificationSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsService.getSettings();
      setSettings(response.data.notifications || {});
    } catch (error) {
      toast.error('Failed to load notification settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key, value) => {
    try {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      await settingsService.updateNotifications(newSettings);
      toast.success('Setting updated');
    } catch (error) {
      toast.error('Failed to update setting');
      // Revert on error
      setSettings(prev => ({ ...prev, [key]: !value }));
    }
  };

  const notificationOptions = [
    { key: 'email_notifications', label: 'Email Notifications', description: 'Receive notifications via email' },
    { key: 'push_notifications', label: 'Push Notifications', description: 'Receive push notifications in browser' },
    { key: 'order_updates', label: 'Order Updates', description: 'Get notified about order status changes' },
    { key: 'price_alerts', label: 'Price Alerts', description: 'Notifications about price changes' },
    { key: 'weather_alerts', label: 'Weather Alerts', description: 'Weather updates and warnings' },
    { key: 'marketing_emails', label: 'Marketing Emails', description: 'Promotional emails and offers' },
  ];

  if (loading) {
    return <div className="loading-spinner">Loading settings...</div>;
  }

  return (
    <div className="notification-settings">
      <div className="section-header">
        <h2>Notification Preferences</h2>
        <p>Choose how you want to be notified</p>
      </div>

      <div className="notification-options">
        {notificationOptions.map((option) => (
          <div key={option.key} className="notification-item">
            <div className="notification-info">
              <h4>{option.label}</h4>
              <p>{option.description}</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings[option.key] || false}
                onChange={(e) => updateSetting(option.key, e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// Billing Settings Component
const BillingSettings = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);

  const mockPaymentMethods = [
    { id: 1, type: 'bkash', number: '**** **** **** 1234', isDefault: true },
    { id: 2, type: 'nagad', number: '**** **** **** 5678', isDefault: false },
  ];

  const mockBillingHistory = [
    { id: 1, date: '2024-10-01', amount: 1500, description: 'Order #12345', status: 'paid' },
    { id: 2, date: '2024-09-25', amount: 2300, description: 'Order #12344', status: 'paid' },
    { id: 3, date: '2024-09-20', amount: 800, description: 'Order #12343', status: 'pending' },
  ];

  return (
    <div className="billing-settings">
      <div className="section-header">
        <h2>Billing & Payments</h2>
        <p>Manage your payment methods and billing history</p>
      </div>

      {/* Payment Methods */}
      <div className="billing-section">
        <h3>Payment Methods</h3>
        <div className="payment-methods">
          {mockPaymentMethods.map((method) => (
            <div key={method.id} className="payment-method">
              <div className="method-info">
                <span className="method-type">{method.type.toUpperCase()}</span>
                <span className="method-number">{method.number}</span>
                {method.isDefault && <span className="default-badge">Default</span>}
              </div>
              <button className="btn-secondary">Edit</button>
            </div>
          ))}
          <button className="btn-primary add-payment">+ Add Payment Method</button>
        </div>
      </div>

      {/* Billing History */}
      <div className="billing-section">
        <h3>Billing History</h3>
        <div className="billing-history">
          <div className="history-header">
            <span>Date</span>
            <span>Description</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          {mockBillingHistory.map((item) => (
            <div key={item.id} className="history-item">
              <span>{new Date(item.date).toLocaleDateString()}</span>
              <span>{item.description}</span>
              <span>৳{item.amount}</span>
              <span className={`status ${item.status}`}>{item.status}</span>
              <button className="btn-link">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Help & Support Component
const HelpSupport = () => {
  const [faqs, setFaqs] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupportData();
  }, []);

  const fetchSupportData = async () => {
    try {
      setLoading(true);
      const [faqsRes, ticketsRes, contactRes] = await Promise.all([
        supportService.getFAQs(),
        supportService.getTickets(),
        supportService.getContactInfo()
      ]);

      setFaqs(faqsRes.data || []);
      setTickets(ticketsRes.data.data || []);
      setContactInfo(contactRes.data || {});
    } catch (error) {
      toast.error('Failed to load support information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading support information...</div>;
  }

  return (
    <div className="help-support">
      <div className="section-header">
        <h2>Help & Support</h2>
        <button
          className="btn-primary"
          onClick={() => setShowTicketModal(true)}
        >
          Create Support Ticket
        </button>
      </div>

      {/* Contact Information */}
      <div className="support-section">
        <h3>Contact Information</h3>
        <div className="contact-grid">
          <div className="contact-item">
            <h4>Phone Support</h4>
            <p>{contactInfo.phone}</p>
            <p>Emergency: {contactInfo.emergency_contact}</p>
          </div>
          <div className="contact-item">
            <h4>Email Support</h4>
            <p>{contactInfo.email}</p>
          </div>
          <div className="contact-item">
            <h4>Office Address</h4>
            <p>{contactInfo.address}</p>
          </div>
          <div className="contact-item">
            <h4>Business Hours</h4>
            <p>Sat-Thu: {contactInfo.business_hours?.saturday_thursday}</p>
            <p>Friday: {contactInfo.business_hours?.friday}</p>
          </div>
        </div>
      </div>

      {/* Support Tickets */}
      <div className="support-section">
        <h3>Your Support Tickets</h3>
        <div className="tickets-list">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div key={ticket.id} className="ticket-item">
                <div className="ticket-info">
                  <h4>#{ticket.ticket_number}</h4>
                  <p>{ticket.subject}</p>
                  <span className="ticket-category">{ticket.category}</span>
                </div>
                <div className="ticket-status">
                  <span className={`status ${ticket.status}`}>{ticket.status}</span>
                  <span className="ticket-date">{new Date(ticket.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No support tickets found</p>
          )}
        </div>
      </div>

      {/* FAQs */}
      <div className="support-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faqs-list">
          {faqs.map((faq) => (
            <details key={faq.id} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showTicketModal && (
        <CreateTicketModal
          onClose={() => setShowTicketModal(false)}
          onSuccess={() => {
            setShowTicketModal(false);
            fetchSupportData();
            toast.success('Support ticket created successfully!');
          }}
        />
      )}
    </div>
  );
};

// Change Password Modal
const ChangePasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.new_password_confirmation) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await profileService.changePassword(formData);
      toast.success('Password changed successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Change Password</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="password-form">
          <div className="form-group">
            <label>Current Password</label>
            <div className="password-input">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={formData.current_password}
                onChange={(e) => setFormData(prev => ({ ...prev, current_password: e.target.value }))}
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                className="password-toggle"
              >
                {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>New Password</label>
            <div className="password-input">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={formData.new_password}
                onChange={(e) => setFormData(prev => ({ ...prev, new_password: e.target.value }))}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                className="password-toggle"
              >
                {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <div className="password-input">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={formData.new_password_confirmation}
                onChange={(e) => setFormData(prev => ({ ...prev, new_password_confirmation: e.target.value }))}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="password-toggle"
              >
                {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Create Support Ticket Modal
const CreateTicketModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    message: '',
    attachments: []
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await supportService.createTicket(formData);
      onSuccess();
    } catch (error) {
      toast.error('Failed to create support ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Support Ticket</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
              >
                <option value="general">General</option>
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing</option>
                <option value="complaint">Complaint</option>
                <option value="feature_request">Feature Request</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Brief description of your issue"
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Detailed description of your issue..."
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label>Attachments (Optional)</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFormData(prev => ({ ...prev, attachments: Array.from(e.target.files) }))}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Creating...' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
