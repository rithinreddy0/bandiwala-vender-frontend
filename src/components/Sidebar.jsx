import { Link, useLocation } from 'react-router-dom'
import { Home, Clipboard, Menu as MenuIcon, Settings, LogOut } from 'lucide-react'
// import { getAuth, signOut } from 'firebase/auth'

export default function Sidebar() {
  const location = useLocation()
//   const auth = getAuth()

//   const handleLogout = async () => {
//     try {
//       await signOut(auth)
//       // Redirect to login page or handle logout in your app's context
//     } catch (error) {
//       console.error('Error signing out:', error)
//     }
//   }
const handleLogout = ()=>{
    console.log("logout")
  }
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Orders', icon: Clipboard, path: '/orders' },
    { name: 'Menu', icon: MenuIcon, path: '/menu' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ]

  return (
    <div className="flex flex-col h-full w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-bold">Restaurant Dashboard</h1>
      </div>
      <nav className="flex-1">
        <ul className="py-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
                  location.pathname === item.path ? 'bg-gray-700 text-white' : ''
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}