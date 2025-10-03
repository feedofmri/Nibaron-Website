import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Package, Star, MapPin, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { productService, preOrderService } from '../../services/featureServices';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import api from '../../services/api'; // Keep for wishlist operations
import './Marketplace.css';
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products for pagination
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('newest');
  const [showPreOrderModal, setShowPreOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [itemsPerPage] = useState(9); // Changed from 6 to 9

  const { isLoading: authLoading } = useAuth();

  // Fetch all products only when filters change (not on page change)
  useEffect(() => {
    // Remove authentication requirement for browsing
    fetchAllProducts();
  }, [selectedCategory, sortBy]);

  // Apply pagination when page changes or products change
  useEffect(() => {
    applyPagination();
  }, [currentPage, allProducts]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (sortBy) params.sort = sortBy;
      // Don't send pagination params - fetch all products

      const response = await productService.getProducts(params);

      // Handle different possible response structures
      let productsData = [];
      if (response.data?.data) {
        productsData = response.data.data;
      } else if (response.data) {
        productsData = response.data;
      } else if (Array.isArray(response)) {
        productsData = response;
      }

      // Store all products and reset to page 1
      setAllProducts(Array.isArray(productsData) ? productsData : []);
      setCurrentPage(1);

    } catch (error) {
      // Remove auth-specific error handling for browsing
      console.error('❌ API Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      toast.error('Failed to load products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyPagination = () => {
    if (!Array.isArray(allProducts) || allProducts.length === 0) {
      setProducts([]);
      setTotalProducts(0);
      setTotalPages(1);
      return;
    }

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    setProducts(paginatedProducts);
    setTotalProducts(allProducts.length);
    setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
  };

  const filteredProducts = (Array.isArray(products) ? products : []).filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());

    // Handle different possible price field names and undefined prices
    const productPrice = product.price || product.unit_price || product.price_per_kg || 0;
    const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];

    return matchesSearch && matchesPrice;
  });

  const handleCreatePreOrder = (product) => {
    setSelectedProduct(product);
    setShowPreOrderModal(true);
  };

  // Show loading if auth is still loading
  if (authLoading) {
    return (
      <div className="marketplace">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  // Remove authentication requirement for browsing marketplace
  // Visitors can now browse products but need to sign in for cart/wishlist actions

  return (
    <div className="marketplace">
      <div className="marketplace-header">
        <h1>Marketplace</h1>
        <p>Discover fresh produce directly from farmers</p>
      </div>

      {/* Filters and Search */}
      <div className="marketplace-filters">
        <div className="search-section">
          <div className="search-input">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-section">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="herbs">Herbs</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <button className="filter-btn">
            <Filter size={18} />
            More Filters
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {loading ? (
          <div className="loading-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="product-card-skeleton" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPreOrder={() => handleCreatePreOrder(product)}
            />
          ))
        ) : (
          <div className="no-products">
            <Package size={48} />
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          totalProducts={totalProducts}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          loading={loading}
        />
      )}

      {/* Pre-Order Modal */}
      {showPreOrderModal && (
        <PreOrderModal
          product={selectedProduct}
          onClose={() => setShowPreOrderModal(false)}
          onSuccess={() => {
            setShowPreOrderModal(false);
            toast.success('Pre-order created successfully!');
          }}
        />
      )}
    </div>
  );
};

const ProductCard = ({ product, onPreOrder }) => {
  const [imageError, setImageError] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Handler for navigating to product details
  const handleCardClick = (e) => {
    // Prevent navigation if clicking on a button inside the card
    if (
      e.target.closest('.product-actions') ||
      e.target.closest('.wishlist-btn')
    ) {
      return;
    }
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add products to your cart');
      navigate('/login');
      return;
    }

    // Use the addItem function from CartContext with the product object
    try {
      await addItem(product, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add products to your wishlist');
      navigate('/login');
      return;
    }

    try {
      // Call the add to wishlist API endpoint
      await api.post(`/products/${product.id}/add-to-wishlist`);
      toast.success(`${product.name} added to wishlist!`);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      if (error.response?.status === 409) {
        toast.error('Product is already in your wishlist');
      } else {
        toast.error('Failed to add product to wishlist. Please try again.');
      }
    }
  };

  const handlePreOrder = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to create pre-orders');
      navigate('/login');
      return;
    }
    onPreOrder();
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="product-image">
        {!imageError ? (
          <img
            src={product.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2U8L3RleHQ+PC9zdmc+'}
            alt={product.name}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="image-placeholder">
            <Package size={40} />
          </div>
        )}
        {product.is_organic && (
          <span className="organic-badge">Organic</span>
        )}

        {/* Wishlist Button */}
        <button
          className="wishlist-btn"
          onClick={(e) => { e.stopPropagation(); handleAddToWishlist(); }}
          title={isAuthenticated ? "Add to wishlist" : "Sign in to add to wishlist"}
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="product-info">
        <h3 onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.id}`); }} style={{ cursor: 'pointer' }}>{product.name || 'Product Name'}</h3>
        <div className="product-meta">
          <div className="rating">
            <Star size={16} fill="currentColor" />
            <span>{product.rating || '4.5'}</span>
          </div>
          <div className="location">
            <MapPin size={16} />
            <span>{product.farmer?.district || 'Dhaka'}</span>
          </div>
        </div>

        <p className="product-description">
          {product.description || 'Fresh, high-quality produce from local farmers.'}
        </p>

        <div className="product-details">
          <span className="price">৳{product.price || '50'}/kg</span>
          <span className="availability">
            {product.stock > 0 ? `${product.stock} kg available` : 'Contact for availability'}
          </span>
        </div>

        <div className="product-actions">
          <button
            className="btn-secondary"
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            title={isAuthenticated ? "Add to cart" : "Sign in to add to cart"}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
          <button
            className="btn-primary"
            onClick={(e) => { e.stopPropagation(); handlePreOrder(); }}
            title={isAuthenticated ? "Create pre-order" : "Sign in to create pre-order"}
          >
            <Package size={18} />
            Pre-Order
          </button>
        </div>

        {!isAuthenticated && (
          <div className="login-prompt">
            <p className="prompt-text">
              <span>Sign in to add to cart, wishlist, or create pre-orders</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const PreOrderModal = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    quantity: 1,
    expected_price: product?.price || 0,
    delivery_date: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await preOrderService.createPreOrder({
        product_id: product.id,
        ...formData
      });
      onSuccess();
    } catch (error) {
      toast.error('Failed to create pre-order');
      console.error('Pre-order error:', error);
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
          <div className="product-summary">
            <h3>{product?.name}</h3>
            <p>Current Price: ৳{product?.price}/kg</p>
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

export default Marketplace;
