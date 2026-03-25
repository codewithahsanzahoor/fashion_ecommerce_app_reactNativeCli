import { createSlice } from '@reduxjs/toolkit';
import { mockUser } from '../../data/mockData';

const initialState = {
  profile: mockUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      // action.payload will be an object containing the keys to update
      state.profile = { ...state.profile, ...action.payload };
    },
    resetProfile: (state) => {
      state.profile = mockUser;
    }
  },
});

export const { updateProfile, resetProfile } = userSlice.actions;
export default userSlice.reducer;
