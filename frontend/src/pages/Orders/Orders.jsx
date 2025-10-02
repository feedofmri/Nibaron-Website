import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, XCircle, Eye, Download, Filter, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../services/featureServices';
import { useAuth } from '../../context/AuthContext';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch orders if user is authenticated and auth is not loading
    if (!authLoading) {
      if (isAuthenticated) {
        fetchOrders();
      } else {
        // Redirect to login if not authenticated
        navigate('/login');
      }
    }
  }, [statusFilter, isAuthenticated, authLoading, navigate]);

  const fetchOrders = async () => {
    // Don't fetch if not authenticated
    if (!isAuthenticated) {
      return;
    }

    try {
      setLoading(true);
      const params = {};
      if (statusFilter) params.status = statusFilter;

      const response = await orderService.getOrders(params);
      setOrders(response.data.data || []);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please log in to view orders');
        navigate('/login');
      } else {
        toast.error('Failed to load orders');
      }
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (orderId) => {
    try {
      const response = await orderService.getOrder(orderId);
      setSelectedOrder(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please log in to view order details');
        navigate('/login');
      } else {
        toast.error('Failed to load order details');
      }
    }
  };

  // Show loading if auth is still loading
  if (authLoading) {
    return (
      <div className="orders">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="status-icon pending" size={16} />;
      case 'confirmed': return <CheckCircle className="status-icon confirmed" size={16} />;
      case 'processing': return <Package className="status-icon processing" size={16} />;
      case 'shipped': return <Truck className="status-icon shipped" size={16} />;
      case 'delivered': return <CheckCircle className="status-icon delivered" size={16} />;
      case 'cancelled': return <XCircle className="status-icon cancelled" size={16} />;
      default: return <Clock className="status-icon" size={16} />;
    }
  };

  const getStatusClass = (status) => {
    return `status-badge ${status}`;
  };

  return (
    <div className="orders">
      <div className="orders-header">
        <div className="header-content">
          <h1>My Orders</h1>
          <p>Track and manage your orders</p>
        </div>
        <button onClick={fetchOrders} className="btn-secondary">
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="orders-filters">
        <div className="filter-group">
          <Filter size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {loading ? (
          <div className="loading-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="order-card-skeleton" />
            ))}
          </div>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={() => handleViewDetails(order.id)}
              getStatusIcon={getStatusIcon}
              getStatusClass={getStatusClass}
            />
          ))
        ) : (
          <div className="no-orders">
            <Package size={48} />
            <h3>No orders found</h3>
            <p>You haven't placed any orders yet</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setShowDetailsModal(false)}
          getStatusIcon={getStatusIcon}
          getStatusClass={getStatusClass}
        />
      )}
    </div>
  );
};

const OrderCard = ({ order, onViewDetails, getStatusIcon, getStatusClass }) => {
  return (
    <div className="order-card">
      <div className="order-header">
        <div className="order-info">
          <h3>Order #{order.id || order.order_number}</h3>
          <div className={getStatusClass(order.status)}>
            {getStatusIcon(order.status)}
            <span>{order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}</span>
          </div>
        </div>
        <div className="order-actions">
          <button onClick={onViewDetails} className="btn-icon" title="View Details">
            <Eye size={16} />
          </button>
          <button className="btn-icon" title="Download Invoice">
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="order-summary">
        <div className="order-items">
          <h4>Items ({order.items?.length || order.order_items?.length || 1})</h4>
          <div className="items-preview">
            {(order.items || order.order_items || [{product: {name: 'Product'}, quantity: 1}]).slice(0, 2).map((item, index) => (
              <span key={index} className="item-name">
                {item.product?.name || 'Product'} x{item.quantity}
              </span>
            ))}
            {(order.items?.length || order.order_items?.length || 0) > 2 && (
              <span className="more-items">+{(order.items?.length || order.order_items?.length) - 2} more</span>
            )}
          </div>
        </div>

        <div className="order-details">
          <div className="detail-row">
            <span className="label">Total Amount:</span>
            <span className="value total">৳{order.total_amount || order.total || '0.00'}</span>
          </div>
          <div className="detail-row">
            <span className="label">Order Date:</span>
            <span className="value">{new Date(order.created_at || Date.now()).toLocaleDateString()}</span>
          </div>
          {order.expected_delivery && (
            <div className="detail-row">
              <span className="label">Expected Delivery:</span>
              <span className="value">{new Date(order.expected_delivery).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="order-tracking">
        <OrderTrackingProgress status={order.status} />
      </div>
    </div>
  );
};

const OrderTrackingProgress = ({ status }) => {
  const stages = [
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const getStageStatus = (stageKey) => {
    const currentIndex = stages.findIndex(stage => stage.key === status);
    const stageIndex = stages.findIndex(stage => stage.key === stageKey);

    if (status === 'cancelled') return 'cancelled';
    if (stageIndex <= currentIndex) return 'completed';
    if (stageIndex === currentIndex + 1) return 'active';
    return 'pending';
  };

  if (status === 'cancelled') {
    return (
      <div className="tracking-progress cancelled">
        <XCircle size={16} />
        <span>Order Cancelled</span>
      </div>
    );
  }

  return (
    <div className="tracking-progress">
      {stages.map((stage, index) => (
        <div key={stage.key} className={`tracking-stage ${getStageStatus(stage.key)}`}>
          <div className="stage-dot"></div>
          <span className="stage-label">{stage.label}</span>
          {index < stages.length - 1 && <div className="stage-line"></div>}
        </div>
      ))}
    </div>
  );
};

const OrderDetailsModal = ({ order, onClose, getStatusIcon, getStatusClass }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Details</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="order-details-content">
          {/* Order Summary */}
          <div className="details-section">
            <div className="section-header">
              <h3>Order Summary</h3>
              <div className={getStatusClass(order.status)}>
                {getStatusIcon(order.status)}
                <span>{order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}</span>
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Order Number:</span>
                <span className="value">#{order.id || order.order_number}</span>
              </div>
              <div className="detail-item">
                <span className="label">Order Date:</span>
                <span className="value">{new Date(order.created_at || Date.now()).toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Total Amount:</span>
                <span className="value total">৳{order.total_amount || order.total || '0.00'}</span>
              </div>
              {order.expected_delivery && (
                <div className="detail-item">
                  <span className="label">Expected Delivery:</span>
                  <span className="value">{new Date(order.expected_delivery).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="details-section">
            <h3>Order Items</h3>
            <div className="order-items-list">
              {(order.items || order.order_items || [{product: {name: 'Sample Product'}, quantity: 1, price: 50}]).map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <h4>{item.product?.name || 'Product'}</h4>
                    <p>Quantity: {item.quantity} kg</p>
                    <p>Price: ৳{item.price || '0.00'}/kg</p>
                  </div>
                  <div className="item-total">
                    ৳{((item.quantity || 1) * (item.price || 0)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          {order.delivery_address && (
            <div className="details-section">
              <h3>Delivery Information</h3>
              <div className="address-info">
                <p>{order.delivery_address}</p>
                {order.delivery_phone && <p>Phone: {order.delivery_phone}</p>}
              </div>
            </div>
          )}

          {/* Payment Information */}
          <div className="details-section">
            <h3>Payment Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Payment Method:</span>
                <span className="value">{order.payment_method || 'Cash on Delivery'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Payment Status:</span>
                <span className={`value ${order.payment_status || 'pending'}`}>
                  {(order.payment_status || 'pending').charAt(0).toUpperCase() + (order.payment_status || 'pending').slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="details-section">
            <h3>Order Tracking</h3>
            <OrderTrackingProgress status={order.status} />
          </div>

          {/* Additional Notes */}
          {order.notes && (
            <div className="details-section">
              <h3>Notes</h3>
              <p>{order.notes}</p>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn-secondary">
            <Download size={16} />
            Download Invoice
          </button>
          <button onClick={onClose} className="btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
