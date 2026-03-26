import { createSlice } from '@reduxjs/toolkit';
import { mockUser } from '../../data/mockData';

const initialState = {
  isLoggedIn: false,
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.profile = { ...mockUser, ...action.payload };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.profile = null;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    resetProfile: (state) => {
      state.profile = mockUser;
    }
  },
});

export const { login, logout, updateProfile, resetProfile } = userSlice.actions;
export default userSlice.reducer;
