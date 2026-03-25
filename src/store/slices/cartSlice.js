import { createSlice } from '@reduxjs/toolkit';
import { mockProducts } from '../../data/mockData';

const initialState = {
  items: mockProducts.slice(0, 3), // Populate with 3 initial items for demonstration
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // payload represents the product object
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // payload represents the product id
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
