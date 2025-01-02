import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IIUser } from '@/types/user'

export interface Product {
  _id: string
  name: string
  price: number
  quantity: number
  images: string[]
  category: string
  subcategory: string
  brand: string
  description: string
  thumbnail: string
}

export interface CartItem extends Product {
  cartQuantity: number
}

export interface CartState {
  items: CartItem[]
  products: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  user: IIUser | null
  cartItems: CartItem[];
}

const initialState: CartState = {
  items: [],
  products: [],
  status: 'idle',
  error: null,
  user: null,
  cartItems: [],
}

export const fetchProducts = createAsyncThunk('cart/fetchProducts', async () => {
  const response = await axios.get('/api/products')
  return response.data
})

export const updateProductQuantity = createAsyncThunk(
  'cart/updateProductQuantity',
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await axios.put(`/api/products/${productId}`, { quantity })
    return response.data
  }
)

export const saveCartToDatabase = createAsyncThunk(
  'cart/saveCartToDatabase',
  async (_, { getState }) => {
    const state = getState() as { cart: CartState }
    const { items, user } = state.cart
    if (!user) {
      throw new Error('User not logged in')
    }
    const response = await axios.post('/api/cart', { userId: user._id, items })
    return response.data
  }
)

export const fetchCartFromDatabase = createAsyncThunk(
  'cart/fetchFromDatabase',
  async (userId: string) => {
    const response = await axios.get(`/api/cart?userId=${userId}`)
    return response.data
  }
)

export const clearCartFromDatabase = createAsyncThunk(
  'cart/clearCartFromDatabase',
  async (userId: string) => {
    const response = await axios.delete(`/api/cart?userId=${userId}`)
    return response.data
  }
)

export const syncCartWithDatabase = createAsyncThunk(
  'cart/syncWithDatabase',
  async (_, { getState }) => {
    const state = getState() as { cart: CartState }
    const { items, user } = state.cart
    if (!user) {
      throw new Error('User not logged in')
    }
    const response = await axios.post('/api/cart', { userId: user._id, items })
    return response.data
  }
)


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id)
      if (existingItem) {
        existingItem.cartQuantity += 1
      } else {
        state.items.push({ ...action.payload, cartQuantity: 1 })
      }
      const product = state.products.find(p => p._id === action.payload._id)
      if (product && product.quantity > 0) {
        product.quantity--
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const removedItem = state.items.find(item => item._id === action.payload)
      if (removedItem) {
        const product = state.products.find(p => p._id === action.payload)
        if (product) {
          product.quantity += removedItem.cartQuantity
        }
      }
      state.items = state.items.filter(item => item._id !== action.payload)
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item._id === action.payload.id)
      if (item) {
        const product = state.products.find(p => p._id === action.payload.id)
        if (product) {
          const quantityDiff = action.payload.quantity - item.cartQuantity
          product.quantity -= quantityDiff
        }
        item.cartQuantity = action.payload.quantity
      }
    },
    clearCart: (state) => {
      state.items.forEach(item => {
        const product = state.products.find(p => p._id === item._id)
        if (product) {
          product.quantity += item.cartQuantity
        }
      })
      state.items = []
    },
    incrementCartItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item._id === action.payload)
      const product = state.products.find(p => p._id === action.payload)
      if (item && product && product.quantity > 0) {
        item.cartQuantity++
        product.quantity--
      }
    },
    setUser: (state, action: PayloadAction<IIUser | null>) => {
      state.user = action.payload
      if (action.payload) {
        // Fetch cart from database when user logs in
        fetchCartFromDatabase(action.payload._id)
      }
    },
    mergeGuestCartWithUserCart: (state, action: PayloadAction<CartItem[]>) => {
      action.payload.forEach(item => {
        const existingItem = state.items.find(i => i._id === item._id)
        if (existingItem) {
          existingItem.cartQuantity += item.cartQuantity
        } else {
          state.items.push(item)
        }
      })
    },
    setUserFromLocalStorage: (state, action: PayloadAction<IIUser | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        const updatedProduct = action.payload
        const productIndex = state.products.findIndex(p => p._id === updatedProduct._id)
        if (productIndex !== -1) {
          state.products[productIndex] = updatedProduct
        }
      })
      .addCase(saveCartToDatabase.fulfilled, (state) => {
        // Optionally handle successful save
      })
      .addCase(fetchCartFromDatabase.fulfilled, (state, action) => {
        state.items = action.payload
        state.cartItems = action.payload;
      })
      .addCase(clearCartFromDatabase.fulfilled, (state) => {
        state.items = []
        state.cartItems = [];
      })
      .addCase(syncCartWithDatabase.fulfilled, (state, action) => {
        // Optionally handle successful sync
      })
  },
})

export const { 
  addToCart, 
  removeFromCart, 
  updateCartItemQuantity, 
  clearCart, 
  incrementCartItem,
  setUser,
  mergeGuestCartWithUserCart,
  setUserFromLocalStorage
} = cartSlice.actions

export default cartSlice.reducer

