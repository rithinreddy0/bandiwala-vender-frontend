import React, { useEffect, useState, useContext } from 'react';
import { useGetOrdersMutation, useUpdateOrderStatusMutation } from '../App/Services/OrdersApi';
import { context } from '../App';

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

  const handleStatusChange = (orderId, status) => {
    if (!token) return;
    updateOrderStatus({ orderId, status, token })
      .then((response) => {
        if (response.error) {
          setStatusError(response.error.message);
        } else {
          // Refetch orders after status change
          getOrders({ token }).then((response) => {
            if (response.data) {
              setVendorOrders(response.data.orders);
            }
          });
        }
      })
      .catch(() => {
        setStatusError('Failed to update order status.');
      });
  };

  const handleAcceptOrder = (orderId) => {
    handleStatusChange(orderId, 'Accepted');  // Change to 'Accepted' when the order is accepted
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
              <p>Delivery Address: {order.deliveryAddress || 'No address provided'}</p>
              <p>Mobile No: {order.mobileNo || 'No mobile number provided'}</p>
              <p>Order Created: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Items:</p>
              <ul className="list-disc list-inside">
                {order.menuItems?.map((item, index) => (
                  <li key={index}>
                    {item.menuItem?.name || 'Unknown Item'} - Qty: {item.quantity} - ₹
                    {item.menuItem?.price || 'N/A'}
                  </li>
                )) || <li>No items available</li>}
              </ul>
              <div className="mt-2 flex space-x-2">
                {order.status === 'Order Placed' && (
                  <>
                    <button
                      onClick={() => handleAcceptOrder(order._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                      Accept
                    </button>
                  
                  </>
                )}

                {/* After accepting, show Preparing and On the Way buttons */}
                {order.status === 'Accepted' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(order._id, 'Preparing')}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
                    >
                      Preparing
                    </button>
                  </>
                )}

                {/* When status is Preparing, show On the Way button */}
                {order.status === 'Preparing' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(order._id, 'On the Way')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                    >
                      On the Way
                    </button>
                  </>
                )}

                {/* When status is On the Way, show Delivered button */}
                {order.status === 'On the Way' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(order._id, 'Delivered')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                    >
                      Delivered
                    </button>
                  </>
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
