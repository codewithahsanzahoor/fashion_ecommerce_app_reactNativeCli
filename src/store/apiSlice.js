import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use 10.0.2.2 for Android Emulator, localhost for iOS
const BASE_URL = 'http://10.0.2.2:5000/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product', 'Order', 'User', 'Cart', 'Wishlist'],
  endpoints: (builder) => ({}),
});
