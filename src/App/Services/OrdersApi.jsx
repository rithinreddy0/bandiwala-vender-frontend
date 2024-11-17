// src/redux/ordersApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const OrdersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/vendor/', // Adjust to your backend URL
  }),
  endpoints: (builder) => ({
    // Mutation to fetch all orders for the vendor
    getOrders: builder.mutation({
      query: ({token}) => ({
        url: 'getOrdersForVendor', // Adjust to your API route
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        mode: "cors",
      }),
    }),

    // Mutation to update the order status
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status, token }) => ({
        url: 'updateOrderStatus', // Adjust to your API route
        method: 'POST',
        body: { orderId, status },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        mode: "cors",
      }),
    }),

  }),
});

// Export hooks for the components to use
export const { 
  useGetOrdersMutation,
  useUpdateOrderStatusMutation 
} = OrdersApi;
