import { createSlice } from '@reduxjs/toolkit';
import { mockOrders } from '../../data/mockData';

const initialState = {
  ordersList: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // Add a new order to the beginning of the list
      state.ordersList.unshift(action.payload);
    },
    cancelOrder: (state, action) => {
      // payload is the order id
      const order = state.ordersList.find(o => o.id === action.payload);
      if (order && order.status === 'Pending') {
        order.status = 'Cancelled';
      }
    },
    // Generic action to demonstrate more CRUD
    updateOrder: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.ordersList.findIndex(o => o.id === id);
      if (index !== -1) {
        state.ordersList[index] = { ...state.ordersList[index], ...updates };
      }
    }
  },
});

export const { addOrder, cancelOrder, updateOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
