import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartService } from '../services/api/cartService';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart reducer for state management
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        subtotal: action.payload.subtotal || 0,
        deliveryFee: action.payload.deliveryFee || 0,
        processingFee: action.payload.processingFee || 0,
        discount: action.payload.discount || 0,
        itemCount: action.payload.items?.length || 0,
      };

    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };

        return {
          ...state,
          items: updatedItems,
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      } else {
        // Add new item
        const newItems = [...state.items, action.payload];
        return {
          ...state,
          items: newItems,
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      }

    case 'UPDATE_ITEM':
      const updatedItems = state.items.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(
        item => item.productId !== action.payload.productId
      );

      return {
        ...state,
        items: filteredItems,
        itemCount: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        subtotal: 0,
        deliveryFee: 0,
        processingFee: 0,
        discount: 0,
        itemCount: 0,
        appliedCoupon: null,
      };

    case 'APPLY_COUPON':
      return {
        ...state,
        appliedCoupon: action.payload.coupon,
        discount: action.payload.discount,
        total: action.payload.total,
      };

    case 'REMOVE_COUPON':
      return {
        ...state,
        appliedCoupon: null,
        discount: 0,
        total: state.subtotal + state.deliveryFee + state.processingFee,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  total: 0,
  subtotal: 0,
  deliveryFee: 0,
  processingFee: 0,
  discount: 0,
  itemCount: 0,
  appliedCoupon: null,
  isLoading: false,
  error: null,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated, user } = useAuth();

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      // Clear cart when user logs out
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated, user]);

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartService.getCart();

      if (response.success) {
        dispatch({ type: 'SET_CART', payload: response.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (error) {
      console.error('Load cart error:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addItem = async (product, quantity = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await cartService.addItem({
        productId: product.id,
        quantity,
      });

      if (response.success) {
        dispatch({
          type: 'ADD_ITEM',
          payload: {
            productId: product.id,
            product,
            quantity,
            price: product.price,
            subtotal: product.price * quantity,
          }
        });

        toast.success(`${product.name} added to cart!`);
        return { success: true };
      } else {
        toast.error(response.message || 'Failed to add item to cart');
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add item to cart');
      return { success: false, error: error.message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await cartService.updateItem({ productId, quantity });

      if (response.success) {
        dispatch({
          type: 'UPDATE_ITEM',
          payload: { productId, quantity }
        });
        return { success: true };
      } else {
        toast.error(response.message || 'Failed to update quantity');
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Failed to update quantity');
      return { success: false, error: error.message };
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await cartService.removeItem(productId);

      if (response.success) {
        dispatch({
          type: 'REMOVE_ITEM',
          payload: { productId }
        });
        toast.success('Item removed from cart');
        return { success: true };
      } else {
        toast.error(response.message || 'Failed to remove item');
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Remove item error:', error);
      toast.error('Failed to remove item');
      return { success: false, error: error.message };
    }
  };

  const clearCart = async () => {
    try {
      const response = await cartService.clearCart();

      if (response.success) {
        dispatch({ type: 'CLEAR_CART' });
        toast.success('Cart cleared');
        return { success: true };
      } else {
        toast.error(response.message || 'Failed to clear cart');
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      toast.error('Failed to clear cart');
      return { success: false, error: error.message };
    }
  };

  const applyCoupon = async (couponCode) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await cartService.applyCoupon(couponCode);

      if (response.success) {
        dispatch({
          type: 'APPLY_COUPON',
          payload: {
            coupon: response.data.coupon,
            discount: response.data.discount,
            total: response.data.total,
          }
        });
        toast.success(`Coupon applied! You saved ৳${response.data.discount}`);
        return { success: true };
      } else {
        toast.error(response.message || 'Invalid coupon code');
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Apply coupon error:', error);
      toast.error('Failed to apply coupon');
      return { success: false, error: error.message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
    toast.success('Coupon removed');
  };

  // Get item count for a specific product
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return state.items.some(item => item.productId === productId);
  };

  const value = {
    ...state,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    getItemQuantity,
    isInCart,
    loadCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
