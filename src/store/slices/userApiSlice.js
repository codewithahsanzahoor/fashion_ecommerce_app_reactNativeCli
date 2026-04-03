import { apiSlice } from '../apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addShippingAddress: builder.mutation({
            query: addressData => ({
                url: '/user/address',
                method: 'POST',
                body: addressData,
            }),
            invalidatesTags: ['User'],
        }),
        deleteShippingAddress: builder.mutation({
            query: id => ({
                url: `/user/address/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        addPaymentMethod: builder.mutation({
            query: paymentData => ({
                url: '/user/payment',
                method: 'POST',
                body: paymentData,
            }),
            invalidatesTags: ['User'],
        }),
        deletePaymentMethod: builder.mutation({
            query: id => ({
                url: `/user/payment/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useAddShippingAddressMutation,
    useDeleteShippingAddressMutation,
    useAddPaymentMethodMutation,
    useDeletePaymentMethodMutation,
} = userApiSlice;
