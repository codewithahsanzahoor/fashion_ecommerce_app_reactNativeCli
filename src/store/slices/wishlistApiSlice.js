import { apiSlice } from '../apiSlice';

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => '/wishlist',
      providesTags: ['Wishlist'],
    }),
    toggleWishlist: builder.mutation({
      query: (productId) => ({
        url: '/wishlist/toggle',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetWishlistQuery, useToggleWishlistMutation } = wishlistApiSlice;
