import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Heart, Package, MapPin, Star, Calendar,
  CheckCircle, Truck, Shield, Award, Clock, TrendingUp
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { productService } from '../../services/featureServices';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import api from '../../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await productService.getProduct(id);
      const productData = response.data || response;
      setProduct(productData);

      // Set first image as selected
      if (productData.images && productData.images.length > 0) {
        setSelectedImage(0);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
      navigate('/marketplace');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      // Use the addItem function from CartContext with the product object and quantity
      await addItem(product, quantity);
      toast.success('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase');
      navigate('/login');
      return;
    }

    await handleAddToCart();
    navigate('/cart');
  };

  const handlePreOrder = () => {
    if (!isAuthenticated) {
      toast.error('Please login to pre-order');
      navigate('/login');
      return;
    }
    navigate(`/pre-orders/create?product=${id}`);
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      navigate('/login');
      return;
    }

    try {
      if (isInWishlist) {
        await api.delete(`/products/${id}/remove-from-wishlist`);
        setIsInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        await api.post(`/products/${id}/add-to-wishlist`);
        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  if (loading) {
    return (
      <div className="product-detail">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Ensure images is always an array
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2U8L3RleHQ+PC9zdmc+'];

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span onClick={() => navigate('/marketplace')} className="breadcrumb-link">Marketplace</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <div className="product-content">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img src={images[selectedImage]} alt={product.name} />
              <button
                className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                onClick={handleToggleWishlist}
              >
                <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>
            {images.length > 1 && (
              <div className="thumbnail-gallery">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              {product.organic_certified && (
                <span className="organic-badge">
                  <Award size={16} />
                  Organic Certified
                </span>
              )}
            </div>

            <div className="product-meta">
              <div className="rating">
                <Star size={16} fill="currentColor" />
                <span>{product.rating || '4.5'}</span>
                <span className="review-count">({product.reviews_count || 0} reviews)</span>
              </div>
              <div className="availability">
                {product.quantity_available > 0 ? (
                  <>
                    <CheckCircle size={16} className="text-success" />
                    <span className="text-success">In Stock</span>
                  </>
                ) : (
                  <>
                    <Clock size={16} className="text-warning" />
                    <span className="text-warning">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            <div className="price-section">
              <div className="price">৳{product.price_per_unit}</div>
              <div className="unit">per {product.unit_type || 'kg'}</div>
            </div>

            {/* Farmer Info */}
            {product.farmer && (
              <div className="farmer-info">
                <div className="farmer-avatar">
                  <img
                    src={product.farmer.avatar || '/default-avatar.png'}
                    alt={product.farmer.name}
                  />
                  {product.farmer.verified && (
                    <CheckCircle className="verified-badge" size={16} />
                  )}
                </div>
                <div className="farmer-details">
                  <div className="farmer-name">{product.farmer.name}</div>
                  <div className="farmer-location">
                    <MapPin size={14} />
                    {product.farmer.location || 'Bangladesh'}
                  </div>
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="product-details-grid">
              {product.quality_grade && (
                <div className="detail-item">
                  <TrendingUp size={18} />
                  <div>
                    <div className="detail-label">Quality Grade</div>
                    <div className="detail-value">{product.quality_grade}</div>
                  </div>
                </div>
              )}

              {product.harvest_date && (
                <div className="detail-item">
                  <Calendar size={18} />
                  <div>
                    <div className="detail-label">Harvest Date</div>
                    <div className="detail-value">
                      {new Date(product.harvest_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}

              <div className="detail-item">
                <Package size={18} />
                <div>
                  <div className="detail-label">Available Quantity</div>
                  <div className="detail-value">
                    {product.quantity_available} {product.unit_type || 'kg'}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description || 'No description available.'}</p>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <label>Quantity ({product.unit_type || 'kg'})</label>
              <div className="quantity-input">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={product.quantity_available}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.quantity_available, quantity + 1))}
                  disabled={quantity >= product.quantity_available}
                >
                  +
                </button>
              </div>
              <div className="quantity-total">
                Total: ৳{(product.price_per_unit * quantity).toFixed(2)}
              </div>
            </div>

            {/* Delivery Options */}
            <div className="delivery-options">
              <h4>Delivery Options</h4>
              <div className="delivery-option-item">
                <input
                  type="radio"
                  id="pickup"
                  name="delivery"
                  value="pickup"
                  checked={deliveryOption === 'pickup'}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                />
                <label htmlFor="pickup">
                  <MapPin size={18} />
                  <div>
                    <div className="option-name">Pickup from Farm/Warehouse</div>
                    <div className="option-desc">Free - Available immediately</div>
                  </div>
                </label>
              </div>
              <div className="delivery-option-item">
                <input
                  type="radio"
                  id="delivery"
                  name="delivery"
                  value="delivery"
                  checked={deliveryOption === 'delivery'}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                />
                <label htmlFor="delivery">
                  <Truck size={18} />
                  <div>
                    <div className="option-name">Home Delivery</div>
                    <div className="option-desc">৳50 - Delivery in 2-3 days</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              {product.quantity_available > 0 ? (
                <>
                  <button className="btn-buy-now" onClick={handleBuyNow}>
                    <ShoppingCart size={20} />
                    Buy Now
                  </button>
                  <button className="btn-add-cart" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </>
              ) : (
                <button className="btn-pre-order" onClick={handlePreOrder}>
                  <Calendar size={20} />
                  Pre-Order
                </button>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="trust-item">
                <Shield size={18} />
                <span>Secure Payment</span>
              </div>
              <div className="trust-item">
                <Truck size={18} />
                <span>Fast Delivery</span>
              </div>
              <div className="trust-item">
                <CheckCircle size={18} />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
