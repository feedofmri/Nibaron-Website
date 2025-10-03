import React, { useState, useEffect } from 'react';
import { Package, Calendar, DollarSign, Filter, Plus, Edit2, X, Eye, Clock, CheckCircle, XCircle, Users, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { preOrderService } from '../../services/featureServices';
import { useAuth } from '../../context/AuthContext';
import './PreOrders.css';

// Sample public pre-orders data to show for non-authenticated users
const SAMPLE_PUBLIC_PREORDERS = [
  {
    id: 'sample-1',
    crop_type: 'Boro Rice',
    product: { name: 'Boro Rice', category: 'Grains' },
    farmer: { name: 'Ahmed Rahman', location: 'Cumilla', verified: true },
    quantity: 500,
    expected_price: 42,
    predicted_harvest_date: '2025-11-15',
    ai_quality_prediction: 92,
    expected_quantity: 500,
    status: 'available',
    notes: 'Premium quality Boro rice with AI-verified growing conditions',
    weather_conditions: 'Optimal',
    soil_quality: 'Excellent',
    created_at: '2025-10-01T10:00:00Z',
    isPublicSample: true
  },
  {
    id: 'sample-2',
    crop_type: 'Organic Tomatoes',
    product: { name: 'Organic Tomatoes', category: 'Vegetables' },
    farmer: { name: 'Fatima Begum', location: 'Rangpur', verified: true },
    quantity: 200,
    expected_price: 35,
    predicted_harvest_date: '2025-10-25',
    ai_quality_prediction: 88,
    expected_quantity: 200,
    status: 'available',
    notes: 'Organic certified tomatoes grown with sustainable practices',
    weather_conditions: 'Good',
    soil_quality: 'Good',
    created_at: '2025-09-28T14:30:00Z',
    isPublicSample: true
  },
  {
    id: 'sample-3',
    crop_type: 'Premium Potatoes',
    product: { name: 'Premium Potatoes', category: 'Vegetables' },
    farmer: { name: 'Karim Sheikh', location: 'Bogra', verified: true },
    quantity: 1000,
    expected_price: 22,
    predicted_harvest_date: '2025-11-05',
    ai_quality_prediction: 95,
    expected_quantity: 1000,
    status: 'reserved',
    notes: 'High-grade potatoes suitable for export',
    weather_conditions: 'Optimal',
    soil_quality: 'Excellent',
    created_at: '2025-09-25T11:20:00Z',
    isPublicSample: true
  },
  {
    id: 'sample-4',
    crop_type: 'Alphonso Mangoes',
    product: { name: 'Alphonso Mangoes', category: 'Fruits' },
    farmer: { name: 'Ibrahim Khan', location: 'Rajshahi', verified: true },
    quantity: 150,
    expected_price: 120,
    predicted_harvest_date: '2025-12-10',
    ai_quality_prediction: 90,
    expected_quantity: 150,
    status: 'available',
    notes: 'Premium Alphonso mangoes - limited availability',
    weather_conditions: 'Good',
    soil_quality: 'Excellent',
    created_at: '2025-09-30T16:45:00Z',
    isPublicSample: true
  }
];

const PreOrders = () => {
  const [preOrders, setPreOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPreOrder, setSelectedPreOrder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isUsingPublicData, setIsUsingPublicData] = useState(false);

  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for auth to load, then fetch appropriate data
    if (!authLoading) {
      fetchPreOrders();
    }
  }, [statusFilter, isAuthenticated, authLoading]);

  const fetchPreOrders = async () => {
    setLoading(true);

    try {
      if (isAuthenticated) {
        // Only make API calls if user is authenticated
        try {
          const params = {};
          if (statusFilter) params.status = statusFilter;
          const response = await preOrderService.getPreOrders(params);
          setPreOrders(response.data.data || []);
          setIsUsingPublicData(false);
        } catch (error) {
          console.log('Failed to fetch authenticated pre-orders, showing sample data:', error);
          // If authenticated call fails, fall back to sample data
          setPreOrders(getFilteredSampleData());
          setIsUsingPublicData(true);
        }
      } else {
        // For public users, NEVER call the API - just show sample data immediately
        setPreOrders(getFilteredSampleData());
        setIsUsingPublicData(true);
      }
    } catch (error) {
      console.error('Error in fetchPreOrders:', error);
      // Always fall back to sample data on any error
      setPreOrders(getFilteredSampleData());
      setIsUsingPublicData(true);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredSampleData = () => {
    let filtered = [...SAMPLE_PUBLIC_PREORDERS];
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    return filtered;
  };

  const handleEdit = (preOrder) => {
    if (!isAuthenticated) {
      toast.error('Please log in to edit pre-orders');
      navigate('/login');
      return;
    }
    if (preOrder.isPublicSample) {
      toast.info('This is a sample pre-order. Log in to manage your own pre-orders.');
      navigate('/login');
      return;
    }
    if (preOrder.status !== 'pending') {
      toast.error('Can only edit pending pre-orders');
      return;
    }
    setSelectedPreOrder(preOrder);
    setShowEditModal(true);
  };

  const handleCancel = async (id, preOrder) => {
    if (!isAuthenticated) {
      toast.error('Please log in to cancel pre-orders');
      navigate('/login');
      return;
    }
    if (preOrder?.isPublicSample) {
      toast.info('This is a sample pre-order. Log in to manage your own pre-orders.');
      navigate('/login');
      return;
    }
    if (!window.confirm('Are you sure you want to cancel this pre-order?')) return;

    try {
      await preOrderService.cancelPreOrder(id);
      toast.success('Pre-order cancelled successfully');
      fetchPreOrders();
    } catch (error) {
      toast.error('Failed to cancel pre-order');
    }
  };

  const handleViewDetails = (preOrder) => {
    setSelectedPreOrder(preOrder);
    setShowDetailsModal(true);
  };

  const handleCreatePreOrder = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to create your own pre-orders');
      navigate('/login');
      return;
    }
    setShowCreateModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="status-icon pending" size={16} />;
      case 'confirmed': return <CheckCircle className="status-icon confirmed" size={16} />;
      case 'cancelled': return <XCircle className="status-icon cancelled" size={16} />;
      case 'completed': return <CheckCircle className="status-icon completed" size={16} />;
      default: return <Clock className="status-icon" size={16} />;
    }
  };

  const getStatusClass = (status) => {
    return `status-badge ${status}`;
  };

  // Show loading if auth is still loading
  if (authLoading) {
    return (
      <div className="pre-orders">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pre-orders">
      {/* Public Notice Banner */}
      {isUsingPublicData && (
        <div className="public-notice-banner">
          <div className="notice-content">
            <Users size={20} />
            <div className="notice-text">
              <span className="notice-title">
                {isAuthenticated ? 'Demo Mode' : 'Browse Sample Pre-Orders'}
              </span>
              <span className="notice-description">
                {isAuthenticated
                  ? 'Showing sample data. Your actual pre-orders will appear here once available.'
                  : 'These are sample pre-orders to showcase the platform. Sign up to create and manage your own pre-orders.'
                }
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="pre-orders-header">
        <div className="header-content">
          <h1>Pre-Orders</h1>
          <p>
            {isAuthenticated
              ? (isUsingPublicData ? 'Sample pre-orders from local farmers' : 'Manage your pre-order requests')
              : 'Browse upcoming harvests and pre-order directly from farmers'
            }
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="pre-orders-filters">
        <div className="filter-group">
          <Filter size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Pre-Orders List */}
      <div className="pre-orders-list">
        {loading ? (
          <div className="loading-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="pre-order-card-skeleton" />
            ))}
          </div>
        ) : preOrders.length > 0 ? (
          preOrders.map((preOrder) => (
            <PreOrderCard
              key={preOrder.id}
              preOrder={preOrder}
              onEdit={() => handleEdit(preOrder)}
              onCancel={() => handleCancel(preOrder.id, preOrder)}
              onViewDetails={() => handleViewDetails(preOrder)}
              getStatusIcon={getStatusIcon}
              getStatusClass={getStatusClass}
              isAuthenticated={isAuthenticated}
              isPublicSample={preOrder.isPublicSample}
            />
          ))
        ) : (
          <div className="no-pre-orders">
            <Package size={48} />
            <h3>No pre-orders found</h3>
            {isAuthenticated ? (
              <>
                <p>Create your first pre-order to get started with direct farmer connections</p>
                <button
                  className="btn-primary"
                  onClick={handleCreatePreOrder}
                >
                  Create Pre-Order
                </button>
              </>
            ) : (
              <>
                <p>Join our platform to connect directly with farmers and pre-order fresh produce</p>
                <div className="cta-buttons">
                  <button
                    className="btn-primary"
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up Free
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Modals - only show if authenticated and not public samples */}
      {showCreateModal && isAuthenticated && (
        <CreatePreOrderModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchPreOrders();
            toast.success('Pre-order created successfully!');
          }}
        />
      )}

      {showEditModal && selectedPreOrder && isAuthenticated && !selectedPreOrder.isPublicSample && (
        <EditPreOrderModal
          preOrder={selectedPreOrder}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            fetchPreOrders();
            toast.success('Pre-order updated successfully!');
          }}
        />
      )}

      {showDetailsModal && selectedPreOrder && (
        <PreOrderDetailsModal
          preOrder={selectedPreOrder}
          onClose={() => setShowDetailsModal(false)}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
};

const PreOrderCard = ({ preOrder, onEdit, onCancel, onViewDetails, getStatusIcon, getStatusClass, isAuthenticated, isPublicSample }) => {
  return (
    <div className={`pre-order-card ${isPublicSample ? 'sample-card' : ''}`}>
      {isPublicSample && (
        <div className="sample-badge">
          <span>Sample</span>
        </div>
      )}

      <div className="pre-order-header">
        <div className="pre-order-info">
          <h3>{preOrder.product?.name || 'Product'}</h3>
          <div className={getStatusClass(preOrder.status)}>
            {getStatusIcon(preOrder.status)}
            <span>{preOrder.status?.charAt(0).toUpperCase() + preOrder.status?.slice(1)}</span>
          </div>
        </div>
        <div className="pre-order-actions">
          <button onClick={onViewDetails} className="btn-icon" title="View Details">
            <Eye size={16} />
          </button>
          {preOrder.status === 'pending' && isAuthenticated && !isPublicSample && (
            <button onClick={onEdit} className="btn-icon" title="Edit">
              <Edit2 size={16} />
            </button>
          )}
          {(preOrder.status === 'pending' || preOrder.status === 'confirmed') && isAuthenticated && !isPublicSample && (
            <button onClick={onCancel} className="btn-icon danger" title="Cancel">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="farmer-info">
        <div className="farmer-detail">
          <Users size={14} />
          <span>{preOrder.farmer?.name || 'Local Farmer'}</span>
        </div>
        <div className="location-detail">
          <MapPin size={14} />
          <span>{preOrder.farmer?.location || 'Bangladesh'}</span>
        </div>
      </div>

      <div className="pre-order-details">
        <div className="detail-item">
          <Package size={16} />
          <span>{preOrder.quantity} kg</span>
        </div>
        <div className="detail-item">
          <DollarSign size={16} />
          <span>৳{preOrder.expected_price}/kg</span>
        </div>
        <div className="detail-item">
          <Calendar size={16} />
          <span>{new Date(preOrder.delivery_date).toLocaleDateString()}</span>
        </div>
      </div>

      {preOrder.notes && (
        <div className="pre-order-notes">
          <p>{preOrder.notes}</p>
        </div>
      )}

      <div className="pre-order-meta">
        <span className="created-date">
          Created: {new Date(preOrder.created_at).toLocaleDateString()}
        </span>
        <span className="total-amount">
          Total: ৳{(preOrder.quantity * preOrder.expected_price).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

// Create Pre-Order Modal Component
const CreatePreOrderModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: 1,
    expected_price: '',
    delivery_date: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await preOrderService.createPreOrder(formData);
      onSuccess();
    } catch (error) {
      toast.error('Failed to create pre-order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Pre-Order</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="pre-order-form">
          <div className="form-group">
            <label>Product ID</label>
            <input
              type="number"
              value={formData.product_id}
              onChange={(e) => setFormData(prev => ({...prev, product_id: e.target.value}))}
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity (kg)</label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData(prev => ({...prev, quantity: e.target.value}))}
              required
            />
          </div>

          <div className="form-group">
            <label>Expected Price per kg (৳)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.expected_price}
              onChange={(e) => setFormData(prev => ({...prev, expected_price: e.target.value}))}
              required
            />
          </div>

          <div className="form-group">
            <label>Required Delivery Date</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.delivery_date}
              onChange={(e) => setFormData(prev => ({...prev, delivery_date: e.target.value}))}
              required
            />
          </div>

          <div className="form-group">
            <label>Additional Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
              placeholder="Any specific requirements..."
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Creating...' : 'Create Pre-Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Pre-Order Modal Component
const EditPreOrderModal = ({ preOrder, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    quantity: preOrder.quantity,
    expected_price: preOrder.expected_price,
    delivery_date: preOrder.delivery_date,
    notes: preOrder.notes || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await preOrderService.updatePreOrder(preOrder.id, formData);
      onSuccess();
    } catch (error) {
      toast.error('Failed to update pre-order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Pre-Order</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="pre-order-form">
          <div className="product-summary">
            <h3>{preOrder.product?.name}</h3>
            <p>Current Status: {preOrder.status}</p>
          </div>

          <div className="form-group">
            <label>Quantity (kg)</label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData(prev => ({...prev, quantity: e.target.value}))}
              required
            />
          </div>

          <div className="form-group">
            <label>Expected Price per kg (৳)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.expected_price}
              onChange={(e) => setFormData(prev => ({...prev, expected_price: e.target.value}))}
              required
            />
          </div>

          <div className="form-group">
            <label>Required Delivery Date</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.delivery_date}
              onChange={(e) => setFormData(prev => ({...prev, delivery_date: e.target.value}))}
              required
            />
          </div>

          <div className="form-group">
            <label>Additional Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
              placeholder="Any specific requirements..."
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Updating...' : 'Update Pre-Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Pre-Order Details Modal Component
const PreOrderDetailsModal = ({ preOrder, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Pre-Order Details</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="pre-order-details-content">
          <div className="details-section">
            <h3>Product Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Product:</span>
                <span className="value">{preOrder.product?.name || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Farmer:</span>
                <span className="value">{preOrder.farmer?.name || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>Order Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Quantity:</span>
                <span className="value">{preOrder.quantity} kg</span>
              </div>
              <div className="detail-item">
                <span className="label">Expected Price:</span>
                <span className="value">৳{preOrder.expected_price}/kg</span>
              </div>
              <div className="detail-item">
                <span className="label">Total Expected:</span>
                <span className="value">৳{(preOrder.quantity * preOrder.expected_price).toFixed(2)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Delivery Date:</span>
                <span className="value">{new Date(preOrder.delivery_date).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Status:</span>
                <span className={`value status ${preOrder.status}`}>
                  {preOrder.status?.charAt(0).toUpperCase() + preOrder.status?.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {preOrder.notes && (
            <div className="details-section">
              <h3>Notes</h3>
              <p>{preOrder.notes}</p>
            </div>
          )}

          <div className="details-section">
            <h3>Timestamps</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Created:</span>
                <span className="value">{new Date(preOrder.created_at).toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Last Updated:</span>
                <span className="value">{new Date(preOrder.updated_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreOrders;
