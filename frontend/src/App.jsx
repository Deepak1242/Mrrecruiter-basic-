import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Jobs from './pages/Jobs.jsx'
import Profile from './pages/Profile.jsx'
import { useRecoilState } from 'recoil'
import { authState } from './state/auth'
import { validateToken } from '../api/api.js'

function App() {
  const [auth, setAuth] = useRecoilState(authState)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
       
        if (auth.isAuthenticated && auth.accessToken) {
          const res = await validateToken()
          if (mounted && res?.status === 200 && res.data?.user) {
            setAuth((prev) => ({
              ...prev,
              isAuthenticated: true,
              user: res.data.user,
            }))
          } else {
            
            if (mounted) {
              setAuth({
                isAuthenticated: false,
                user: null,
                accessToken: null,
              })
            }
          }
        } else {
        
          if (mounted) setInitializing(false)
        }
      } catch (e) {
       
        if (mounted) {
          setAuth({
            isAuthenticated: false,
            user: null,
            accessToken: null,
          })
        }
      } finally {
        if (mounted) setInitializing(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, []) 

  if (initializing) {
    return (
      <div className="min-h-screen text-slate-100">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-8">
          <div className="text-slate-300">Loading...</div>
        </main>
      </div>
    )
  }
  return (
    <div className="min-h-screen text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
