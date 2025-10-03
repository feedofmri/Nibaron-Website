import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Trash2, Plus, Minus, Package, Truck,
  MapPin, CreditCard, Phone, ArrowRight, AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart');
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await api.put(`/cart/items/${itemId}`, { quantity: newQuantity });
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
      toast.success('Quantity updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/cart/items/${itemId}`);
      setCartItems(cartItems.filter(item => item.id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDeliveryFee = () => {
    return deliveryOption === 'delivery' ? 50 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee();
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (deliveryOption === 'delivery' && !deliveryAddress) {
      toast.error('Please enter delivery address');
      return;
    }

    if (!phoneNumber) {
      toast.error('Please enter phone number');
      return;
    }

    try {
      const orderData = {
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        })),
        delivery_option: deliveryOption,
        delivery_address: deliveryAddress,
        phone_number: phoneNumber,
        payment_method: paymentMethod,
        total_amount: calculateTotal()
      };

      const response = await api.post('/orders', orderData);
      toast.success('Order placed successfully!');
      navigate(`/orders/${response.data.data.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>
            <ShoppingCart size={28} />
            Shopping Cart
          </h1>
          <span className="item-count">{cartItems.length} items</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={64} />
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <button onClick={() => navigate('/marketplace')} className="btn-primary">
              Browse Marketplace
            </button>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items-section">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.product?.images?.[0] || '/placeholder-product.jpg'} alt={item.product?.name} />
                    </div>

                    <div className="item-details">
                      <h3>{item.product?.name}</h3>
                      <p className="item-farmer">
                        <MapPin size={14} />
                        {item.product?.farmer?.name}
                      </p>
                      <p className="item-price">৳{item.price} per {item.product?.unit_type || 'kg'}</p>
                    </div>

                    <div className="item-quantity">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="item-total">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </div>

                    <button
                      className="item-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Section */}
            <div className="checkout-section">
              <div className="checkout-card">
                <h2>Order Summary</h2>

                {/* Delivery Options */}
                <div className="checkout-group">
                  <label className="checkout-label">
                    <Package size={18} />
                    Delivery Option
                  </label>

                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="delivery"
                        value="pickup"
                        checked={deliveryOption === 'pickup'}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                      />
                      <div>
                        <div className="option-title">Pickup from Farm/Warehouse</div>
                        <div className="option-subtitle">Free</div>
                      </div>
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="delivery"
                        value="delivery"
                        checked={deliveryOption === 'delivery'}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                      />
                      <div>
                        <div className="option-title">Home Delivery</div>
                        <div className="option-subtitle">৳50 - 2-3 days</div>
                      </div>
                    </label>
                  </div>

                  {deliveryOption === 'delivery' && (
                    <div className="input-group">
                      <label>
                        <MapPin size={16} />
                        Delivery Address
                      </label>
                      <textarea
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Enter your complete delivery address"
                        rows="3"
                      />
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="checkout-group">
                  <label className="checkout-label">
                    <Phone size={18} />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="input-field"
                  />
                </div>

                {/* Payment Method */}
                <div className="checkout-group">
                  <label className="checkout-label">
                    <CreditCard size={18} />
                    Payment Method
                  </label>

                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div>
                        <div className="option-title">Cash on Delivery</div>
                      </div>
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="payment"
                        value="bkash"
                        checked={paymentMethod === 'bkash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div>
                        <div className="option-title">bKash</div>
                      </div>
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="payment"
                        value="nagad"
                        checked={paymentMethod === 'nagad'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div>
                        <div className="option-title">Nagad</div>
                      </div>
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div>
                        <div className="option-title">Bank Transfer</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Subtotal</span>
                    <span>৳{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="price-row">
                    <span>Delivery Fee</span>
                    <span>৳{calculateDeliveryFee().toFixed(2)}</span>
                  </div>
                  <div className="price-row total">
                    <span>Total</span>
                    <span>৳{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button className="btn-checkout" onClick={handleCheckout}>
                  Place Order
                  <ArrowRight size={20} />
                </button>

                <div className="checkout-notice">
                  <AlertCircle size={16} />
                  <span>By placing this order, you agree to our terms and conditions</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

