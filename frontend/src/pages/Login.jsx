import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../api/api.js'
import { authState } from '../state/auth'
import { useSetRecoilState } from 'recoil'

export default function Login() {
  
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/home'

  const setAuth = useSetRecoilState(authState)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      setError('Invalid email address')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    try {
      const response = await login({ email, password })

      if (response.status >= 200 && response.status < 300) {
        setAuth({ isAuthenticated: true, user: response.data.user, accessToken: response.data.token })
        navigate(from, { replace: true })
      }
    } catch (err) {
      const msg = err?.response?.data?.message ||
        (Array.isArray(err?.response?.data?.errors) ? err.response.data.errors[0]?.msg : null) ||
        'Login failed. Please check your credentials and try again.'
      setError(msg)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="glass-card p-8 mt-10">
        <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
        <p className="text-slate-300 mb-6">Login to continue your journey.</p>
        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-300 px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full rounded-md bg-brand px-4 py-2 font-semibold hover:bg-brand-dark">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-300">
          Don't have an account?{' '}
          <Link to="/signup" className="text-brand-light hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
