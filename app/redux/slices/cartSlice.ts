import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IIUser } from '@/types/user';
import { Product } from '../../../types/product';

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
  async (userId: string) => {
    const response = await axios.delete(`/api/cart?userId=${userId}`);
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
    return response.data;
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
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item._id === action.payload.id);
      if (item) {
        item.cartQuantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    clearGuestCart: (state) => {
      state.items = [];
    },
    incrementCartItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item) {
        item.cartQuantity++;
      }
    },
    setUser: (state, action: PayloadAction<IIUser | null>) => {
      state.user = action.payload;
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
      .addCase(saveCartToDatabase.fulfilled, (state) => {
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
