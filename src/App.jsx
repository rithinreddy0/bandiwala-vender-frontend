import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect,createContext } from 'react'
import Dashboard from './components/Dashboard'
import Orders from './components/Orders'
import Settings from './components/Settings/Settings'
import Sidebar from './components/Sidebar'
import './index.css'
import SignIn from './components/Authentication/SignIn'
import SignUp from './components/Authentication/SignUp'
import Otp from './components/Authentication/Otp'
import AddItem from './components/Menu/AddItem'
import MenuItems from './components/Menu/MenuItems'
import ForgotPassword from './components/Authentication/ForgotPassword'
export const context=createContext()

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [token,setToken]=useState(null)

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <context.Provider value={{user, setUser, token, setToken}}>
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        {user && (
          <div className="lg:fixed lg:left-0 lg:top-0 lg:w-64 lg:h-full">
            <Sidebar />
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 overflow-auto ${user ? 'lg:ml-64' : ''}`}>
          <Routes>
            <Route path="/signIn" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
            <Route path="/signUp" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
            <Route path="/otp/:email" element={user ? <Navigate to="/dashboard" /> : <Otp />} />
            <Route path="/forgot-password/:email" element={user ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/signIn" />} />
            <Route path="/orders" element={user ? <Orders /> : <Navigate to="/signIn" />} />
            <Route path="/add-items" element={user ? <AddItem /> : <Navigate to="/signIn" />} />
            <Route path="/menu-items" element={user ? <MenuItems /> : <Navigate to="/signIn" />} />
            <Route path="/settings" element={user ? <Settings /> : <Navigate to="/signIn" />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
    </context.Provider>
    
  )
}
