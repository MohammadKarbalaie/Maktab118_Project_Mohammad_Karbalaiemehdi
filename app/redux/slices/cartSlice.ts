import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IIUser } from '@/types/user';
import { Product } from '@/types/product';

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  user: IIUser | null;
  cartItems: CartItem[];
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
  user: null,
  cartItems: [],
};

export const updateProductQuantity = createAsyncThunk(
  'cart/updateProductQuantity',
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await axios.put(`/api/products/${productId}`, { quantity });
    return response.data;
  }
);

export const saveCartToDatabase = createAsyncThunk(
  'cart/saveCartToDatabase',
  async (_, { getState }) => {
    const state = getState() as { cart: CartState };
    const { items, user } = state.cart;
    if (!user) {
      throw new Error('User not logged in');
    }
    const response = await axios.post('/api/cart', { userId: user._id, items });
    return response.data;
  }
);

export const fetchCartFromDatabase = createAsyncThunk(
  'cart/fetchFromDatabase',
  async (userId: string) => {
    const response = await axios.get(`/api/cart?userId=${userId}`);
    return response.data;
  }
);

export const clearCartFromDatabase = createAsyncThunk(
  'cart/clearCartFromDatabase',
  async (_, { getState }) => {
    const state = getState() as { cart: CartState };
    const { user } = state.cart;
    if (!user) {
      throw new Error('User not logged in');
    }
    const response = await axios.delete(`/api/cart?userId=${user._id}`);
    return response.data;
  }
);

export const syncCartWithDatabase = createAsyncThunk(
  'cart/syncCartWithDatabase',
  async (_, { getState }) => {
    const state = getState() as { cart: CartState };
    const { items, user } = state.cart;
    if (!user || items.length === 0) {
      return items; 
    }
    const response = await axios.post('/api/cart/sync', { userId: user._id, items });
    return response.data.items;
  }
);

export const mergeAndSaveCart = createAsyncThunk(
  'cart/mergeAndSaveCart',
  async (guestCartItems: CartItem[], { dispatch, getState }) => {
    const state = getState() as { cart: CartState };

    if (!state.cart.user) {
      throw new Error('User not logged in');
    }
    dispatch(mergeGuestCartWithUserCart(guestCartItems));
    await dispatch(saveCartToDatabase());
    await dispatch(fetchCartFromDatabase(state.cart.user._id));
  }
);

export const initializeCart = createAsyncThunk(
  'cart/initializeCart',
  async (_, { getState }) => {
    const state = getState() as { cart: CartState };
    const { user } = state.cart;
    
    if (user) {
      try {
        const response = await axios.get(`/api/cart/init?userId=${user._id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
      }
    } else {
      const localCart = localStorage.getItem('guestCart');
      return localCart ? JSON.parse(localCart) : [];
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.cartQuantity += 1;
      } else {
        state.items.push({ ...action.payload, cartQuantity: 1 });
      }
      if (!state.user) {
        localStorage.setItem('guestCart', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      if (!state.user) {
        localStorage.setItem('guestCart', JSON.stringify(state.items));
      }
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item._id === action.payload.id);
      if (item) {
        item.cartQuantity = action.payload.quantity;
      }
      if (!state.user) {
        localStorage.setItem('guestCart', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (!state.user) {
        localStorage.removeItem('guestCart');
      }
    },
    clearGuestCart: (state) => {
      state.items = [];
      localStorage.removeItem('guestCart');
    },
    incrementCartItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item) {
        item.cartQuantity++;
      }
      if (!state.user) {
        localStorage.setItem('guestCart', JSON.stringify(state.items));
      }
    },
    setUser: (state, action: PayloadAction<IIUser | null>) => {
      state.user = action.payload;
      if (action.payload) {
        state.status = 'idle'; // Reset status to trigger re-initialization
      }
    },
    mergeGuestCartWithUserCart: (state, action: PayloadAction<CartItem[]>) => {
      action.payload.forEach(guestItem => {
        const existingItem = state.items.find(item => item._id === guestItem._id);
        if (existingItem) {
          existingItem.cartQuantity = Math.max(existingItem.cartQuantity, guestItem.cartQuantity);
        } else {
          state.items.push(guestItem);
        }
      });
    },
    setUserFromLocalStorage: (state, action: PayloadAction<IIUser | null>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const existingItem = state.items.find(item => item._id === updatedProduct._id);
        if (existingItem) {
          existingItem.cartQuantity = updatedProduct.cartQuantity;
        }
      })
      .addCase(saveCartToDatabase.fulfilled, () => {
        // You can add any additional logic here if needed
      })
      .addCase(fetchCartFromDatabase.fulfilled, (state, action) => {
        state.items = action.payload || []; 
        state.cartItems = action.payload || [];
      })
      .addCase(clearCartFromDatabase.fulfilled, (state) => {
        state.items = [];
        state.cartItems = [];
      })
      .addCase(syncCartWithDatabase.fulfilled, (state, action) => {
        if (state.user) {
          state.items = action.payload;
        }
      })
      .addCase(initializeCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initializeCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.cartItems = action.payload;
        state.status = 'succeeded';
      })
      .addCase(initializeCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to initialize cart';
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  clearGuestCart,
  incrementCartItem,
  setUser,
  mergeGuestCartWithUserCart,
  setUserFromLocalStorage,
  logoutUser,
} = cartSlice.actions;

export default cartSlice.reducer;

