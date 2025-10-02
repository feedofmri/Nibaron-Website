import { apiConfig } from '../../config/api.config';
import { tokenService } from '../auth/tokenService';

class CartService {
  constructor() {
    this.baseURL = apiConfig.baseURL;
  }

  // Helper method for API calls
  async makeRequest(url, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${url}`, config);
      const data = await response.json();

      if (response.ok) {
        return { success: true, data, status: response.status };
      } else {
        return {
          success: false,
          message: data.message || 'Request failed',
          errors: data.errors,
          status: response.status
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Network error occurred',
        status: 0
      };
    }
  }

  // Get cart contents
  async getCart() {
    return this.makeRequest('/cart');
  }

  // Add item to cart
  async addItem(itemData) {
    return this.makeRequest('/cart/add', {
      method: 'POST',
      body: JSON.stringify({
        product_id: itemData.productId,
        quantity: itemData.quantity,
        variant_id: itemData.variantId || null,
      }),
    });
  }

  // Update item quantity
  async updateItem(itemData) {
    return this.makeRequest('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({
        product_id: itemData.productId,
        quantity: itemData.quantity,
      }),
    });
  }

  // Remove item from cart
  async removeItem(productId) {
    return this.makeRequest('/cart/remove', {
      method: 'DELETE',
      body: JSON.stringify({
        product_id: productId,
      }),
    });
  }

  // Clear entire cart
  async clearCart() {
    return this.makeRequest('/cart/clear', {
      method: 'DELETE',
    });
  }

  // Apply coupon code
  async applyCoupon(couponCode) {
    return this.makeRequest('/cart/coupon', {
      method: 'POST',
      body: JSON.stringify({
        coupon_code: couponCode,
      }),
    });
  }

  // Remove coupon
  async removeCoupon() {
    return this.makeRequest('/cart/coupon', {
      method: 'DELETE',
    });
  }

  // Calculate shipping costs
  async calculateShipping(shippingData) {
    return this.makeRequest('/cart/shipping', {
      method: 'POST',
      body: JSON.stringify({
        address: shippingData.address,
        district: shippingData.district,
        shipping_method: shippingData.shippingMethod,
      }),
    });
  }

  // Get cart summary (totals, fees, etc.)
  async getCartSummary() {
    return this.makeRequest('/cart/summary');
  }
}

// Create singleton instance
export const cartService = new CartService();
