import React, { useEffect, useState, useContext } from 'react';
import { useGetOrdersMutation, useUpdateOrderStatusMutation } from '../App/Services/OrdersApi';
import { context } from '../App';
import io from 'socket.io-client';

const socket = io('https://bandiwala-backend.onrender.com'); // Replace with your backend URL

const VendorOrders = () => {
  const [getOrders, { data: orders, error, isLoading }] = useGetOrdersMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [statusError, setStatusError] = useState(null);
  const [vendorOrders, setVendorOrders] = useState([]);
  const { user } = useContext(context);
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  useEffect(() => {
    // Fetch orders on component mount
    if (token) {
      getOrders({ token }).then((response) => {
        if (response.data) {
          setVendorOrders(response.data.orders);
        }
      });
    }
  }, [getOrders, token]);

  useEffect(() => {
    // Join vendor room once user is loaded
    if (user?._id) {
      socket.emit('joinVendorRoom', user._id);
    }

    // Real-time order listener
    socket.on('newOrder', (newOrder) => {
      setVendorOrders((prevOrders) => [newOrder.order, ...prevOrders]);
    });

    socket.on('orderStatusUpdated', (updatedOrder) => {
      setVendorOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    // Cleanup socket listeners
    return () => {
      socket.off('newOrder');
      socket.off('orderStatusUpdated');
    };
  }, [user]);

  const handleStatusChange = (orderId, status) => {
    if (!token) return;
    updateOrderStatus({ orderId, status, token })
      .then((response) => {
        if (response.error) {
          setStatusError(response.error.message);
        } else {
          // Emit real-time update through socket
          socket.emit('orderStatusUpdated', { orderId, status });
        }
      })
      .catch(() => {
        setStatusError('Failed to update order status.');
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
      {vendorOrders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {vendorOrders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-lg bg-white">
              <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
              <p>User: {order.userId?.name || 'Unknown'}</p>
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
      )}
    </div>
  );
};

export default VendorOrders;
