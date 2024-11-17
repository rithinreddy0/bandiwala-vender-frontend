// src/components/VendorOrders.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersMutation, useUpdateOrderStatusMutation } from '../App/Services/OrdersApi';
import io from 'socket.io-client';

const socket = io('https://bandiwala-backend.onrender.com'); // Replace with your backend URL

const VendorOrders = () => {
  const [getOrders, { data: orders, error, isLoading }] = useGetOrdersMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [statusError, setStatusError] = useState(null);
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  useEffect(() => {
    // Fetch orders when the component mounts
    if (token) {
      getOrders({token});
    }

    // Listen for real-time updates on order status change
    socket.on('orderStatusUpdated', (updatedOrder) => {
      // Update local state with the updated order
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    // Cleanup the socket listener when the component is unmounted
    return () => {
      socket.off('orderStatusUpdated');
    };
  }, [getOrders, token]);

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus({ orderId, status, token })
      .then((response) => {
        if (response.error) {
          setStatusError(response.error.message);
        } else {
          // Emit real-time update through socket after successful status update
          socket.emit('orderStatusUpdated', { orderId, status });
        }
      })
      .catch((err) => {
        setStatusError('Failed to update order status');
      });
  };

  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Vendor Orders</h1>
      {statusError && <p className="text-red-500">{statusError}</p>}
      <div className="mt-4 space-y-4">
        {orders?.map((order) => (
          <div key={order._id} className="border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
            <p>User: {order.userId?.name}</p>
            <p>Total Amount: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>
            <div className="mt-2 flex space-x-2">
              {order.status !== 'Delivered' && (
                <button
                  onClick={() => handleStatusChange(order._id, 'Preparing')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
                >
                  Preparing
                </button>
              )}
              {order.status !== 'Delivered' && (
                <button
                  onClick={() => handleStatusChange(order._id, 'Delivered')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                >
                  Delivered
                </button>
              )}
              <button
                onClick={() => handleStatusChange(order._id, 'Cancelled')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorOrders;
