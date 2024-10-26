import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgDeliveryTime: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [isOpen, setIsOpen] = useState(true)

//   useEffect(() => {
//     // Fetch dashboard data from API
//     fetchDashboardData()
//   }, [])

//   const fetchDashboardData = async () => {
//     try {
//       // Replace with actual API call
//       const response = await fetch('/api/dashboard')
//       const data = await response.json()
//       setStats(data.stats)
//       setRecentOrders(data.recentOrders)
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error)
//     }
//   }

    const toggleOperationalStatus = async () => {
//     try {
//       // Replace with actual API call
//       await fetch('/api/toggle-status', { method: 'POST', body: JSON.stringify({ isOpen: !isOpen }) })
//       setIsOpen(!isOpen)
//     } catch (error) {
//       console.error('Error toggling operational status:', error)
//     }
    }

  const chartData = {
    labels: ['Completed', 'In Progress', 'Cancelled'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverBackgroundColor: ['#45a049', '#e6ae06', '#da190b'],
      },
    ],
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Avg. Delivery Time</h2>
          <p className="text-3xl font-bold">{stats.avgDeliveryTime} min</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <ul className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <li key={order.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{order.customerName}</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    ${order.total.toFixed(2)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>
          <div className="w-full h-64">
            <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Operational Status</h2>
        <button
          onClick={toggleOperationalStatus}
          className={`px-4 py-2 rounded-md ${
            isOpen ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          } text-white font-medium`}
        >
          {isOpen ? 'Open' : 'Closed'}
        </button>
      </div>
    </div>
  )
}