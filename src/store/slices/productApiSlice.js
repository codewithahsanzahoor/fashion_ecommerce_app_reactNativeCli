import { apiSlice } from '../apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: params => ({
                url: '/products',
                params,
            }),
            providesTags: ['Product'],
        }),
        getProductById: builder.query({
            query: id => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
    }),
  overrideExisting: true,
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApiSlice;
