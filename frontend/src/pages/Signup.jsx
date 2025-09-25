import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from "../../api/api.js"
import { useSetRecoilState } from 'recoil'
import { authState } from '../state/auth'


export default function Signup() {
 
  const navigate = useNavigate()
  const setAuth = useSetRecoilState(authState);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
   
    const trimmedName = name.trim()
    if (trimmedName.length < 3) {
      setError('Username must be at least 3 characters long')
      return
    }
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
      const response = await signup({ username: name, email: email, password: password })

      if (response.status >= 200 && response.status < 300) {
        setAuth({
          isAuthenticated: true,
          user : response.data.user,
          accessToken : response.data.token,
        })

        navigate('/home', { replace: true })
      }
    } catch (err) {
      const msg = err?.response?.data?.message ||
        (Array.isArray(err?.response?.data?.errors) ? err.response.data.errors[0]?.msg : null) ||
        'Signup failed. Please check your details and try again.'
      setError(msg)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="glass-card p-8 mt-10">
        <h2 className="text-2xl font-bold mb-2">Create your account</h2>
        <p className="text-slate-300 mb-6">Join the community and get hired faster.</p>
        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-300 px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="Jane Doe"
            />
          </div>
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
              placeholder="Create a strong password"
            />
          </div>
          <button type="submit" className="w-full rounded-md bg-brand px-4 py-2 font-semibold hover:bg-brand-dark">
            Create account
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-300">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-light hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
