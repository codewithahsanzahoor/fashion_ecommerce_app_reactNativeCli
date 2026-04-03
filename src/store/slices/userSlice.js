import { createSlice } from '@reduxjs/toolkit';
import { mockUser } from '../../data/mockData';

const initialState = {
  isLoggedIn: false,
  profile: null,
  token: null,
  addresses: [],
  paymentMethods: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.profile = action.payload;
      state.addresses = action.payload.shippingAddresses || [];
      state.paymentMethods = action.payload.paymentMethods || [];
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.profile = null;
      state.token = null;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    resetProfile: (state) => {
      state.profile = mockUser;
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    setPaymentMethods: (state, action) => {
      state.paymentMethods = action.payload;
    }
  },
});

export const { login, logout, updateProfile, resetProfile, setAddresses, setPaymentMethods } = userSlice.actions;
export default userSlice.reducer;
