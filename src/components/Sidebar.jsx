import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Clipboard, Menu as MenuIcon, Settings, LogOut, X, ChevronDown, ChevronRight } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)  // Mobile sidebar toggle
  const [expandedMenu, setExpandedMenu] = useState(null)  // Toggle for nested items

  const handleLogout = () => console.log("logout")

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleNestedItemClick = () => {
    if (isOpen) setIsOpen(false)  // Close sidebar in mobile view
  }

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Orders', icon: Clipboard, path: '/orders' },
    { 
      name: 'Menu', 
      icon: MenuIcon, 
      subItems: [
        { name: 'Add Items', path: '/add-items' },
        { name: 'Menu Items', path: '/menu-items' }
      ]
    },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ]

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />}

      <div className={`flex flex-col h-full w-64 bg-gray-800 text-white fixed top-0 z-50 ${isOpen ? 'left-0' : '-left-64'} lg:left-0 transition-transform duration-300`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700 lg:hidden">
          <h1 className="text-xl font-bold">Restaurant Dashboard</h1>
          <button onClick={toggleSidebar} className="text-white">
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>

        <div className="flex-1">
          <nav>
            <ul className="py-4">
              {navItems.map((item) => (
                <li key={item.name} className="relative">
                  {!item.subItems ? (
                    <Link
                      to={item.path}
                      className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === item.path ? 'bg-gray-700 text-white' : ''}`}
                      onClick={() => isOpen && toggleSidebar()}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  ) : (
                    <div
                      className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                      onClick={() => setExpandedMenu(expandedMenu === item.name ? null : item.name)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                      {expandedMenu === item.name ? <ChevronDown className="ml-auto" /> : <ChevronRight className="ml-auto" />}
                    </div>
                  )}
                  {item.subItems && expandedMenu === item.name && (
                    <ul className="ml-8 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === subItem.path ? 'bg-gray-700 text-white' : ''}`}
                            onClick={handleNestedItemClick}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

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

      {!isOpen && (
        <button onClick={toggleSidebar} className="lg:hidden fixed top-4 left-4 bg-gray-800 p-2 rounded-full text-white z-50">
          <MenuIcon />
        </button>
      )}
    </>
  )
}
