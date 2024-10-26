import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Orders from './components/Orders'
import Menu from './components/Menu'
import Settings from './components/Settings'
import Sidebar from './components/Sidebar'
import  './index.css'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function App() {
  const [user, setUser] = useState("null")
  const [loading, setLoading] = useState(false)
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {user && <Sidebar/>}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/orders"
              element={user ? <Orders /> : <Navigate to="/login" />}
            />
            <Route
              path="/menu"
              element={user ? <Menu /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={user ? <Settings /> : <Navigate to="/login" />}
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}