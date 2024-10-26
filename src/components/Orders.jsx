import { useState, useEffect } from 'react'

// type Order = {
//   id: string
//   customerName: string
//   address: string
//   phoneNumber: string
//   items: { name: string; quantity: number; price: number }[]
//   total: number
//   status: 'Pending' | 'Accepted' | 'Preparing' | 'Out for Delivery' | 'Delivered'
// }

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      // Replace with actual API call
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId ) => {
    try {
      // Replace with actual API call
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  if (loading) {
    return <div className="p-6">Loading orders...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <p className="text-gray-600">{order.customerName}</p>
                <p className="text-gray-600">{order.address}</p>
                <p className="text-gray-600">{order.phoneNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                <p className={`text-sm font-medium ${
                  order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {order.status}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Items:</h3>
              <ul className="list-disc list-inside">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end space-x-2">
              {order.status === 'Pending' && (
                <>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'Accepted')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'Rejected')}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}
              {order.status === 'Accepted' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'Preparing')}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Start Preparing
                </button>
              )}
              {order.status === 'Preparing' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'Out for Delivery')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Out for Delivery
                </button>
              )}
              {order.status === 'Out for Delivery' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'Delivered')}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}