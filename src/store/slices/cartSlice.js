import { createSlice } from '@reduxjs/toolkit';
import { mockProducts } from '../../data/mockData';

const initialState = {
  items: [], // Empty initially
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, size, color, price } = action.payload;
      // Unique key for cart items based on id, size and color
      const cartItemId = `${id}-${size}-${color}`;
      
      const existingItem = state.items.find(item => item.cartItemId === cartItemId);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          cartItemId,
          quantity: 1,
          // Ensure price is a number for calculations
          price: typeof price === 'string' ? parseFloat(price.replace('$', '')) : price
        });
      }
    },
    removeFromCart: (state, action) => {
      // payload is cartItemId
      state.items = state.items.filter(item => item.cartItemId !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.cartItemId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.cartItemId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity, 
  clearCart 
} = cartSlice.actions;
export default cartSlice.reducer;
