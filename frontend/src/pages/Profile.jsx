import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { authState } from '../state/auth'
import { updateProfile } from '../../api/api.js'

export default function Profile() {
  const auth = useRecoilValue(authState)
  const setAuth = useSetRecoilState(authState)
  const [name, setName] = useState('')
  const [headline, setHeadline] = useState('')
  const [email, setEmail] = useState('')
  const [joinedDate, setJoinedDate] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  
  useEffect(() => {
    if (auth.user) {
      setName(auth.user.username || '')
      setEmail(auth.user.email || '')
      setHeadline(auth.user.headline || '')
    
      setJoinedDate(new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      }))
    }
  }, [auth.user])

  const onSave = async (e) => {
    e.preventDefault()
    setError('')
    setSaveMessage('')
    setIsLoading(true)


    if (!name || name.trim().length < 3) {
      setError('Username must be at least 3 characters long')
      setIsLoading(false)
      return
    }

    try {
      const response = await updateProfile({ 
        username: name.trim(), 
        headline: headline.trim() 
      })

      if (response.status >= 200 && response.status < 300) {
       
        setAuth(prev => ({
          ...prev,
          user: response.data.user
        }))
        
       
        setSaveMessage('Profile updated successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      }
    } catch (err) {
      const msg = err?.response?.data?.message ||
        (Array.isArray(err?.response?.data?.errors) ? err.response.data.errors[0]?.msg : null) ||
        'Failed to update profile. Please try again.'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <section className="md:col-span-2 space-y-4">
        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-white text-xl font-bold">
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{name || 'User Name'}</h2>
              <p className="text-slate-300">{headline || 'Add a professional headline'}</p>
              <p className="text-slate-400 text-sm">{email}</p>
              {joinedDate && (
                <p className="text-slate-500 text-xs mt-1">Member since {joinedDate}</p>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={onSave} className="glass-card p-6 space-y-4">
          <h3 className="font-semibold">Edit profile</h3>
          
          {saveMessage && (
            <div className="rounded-md bg-green-500/10 border border-green-500/30 text-green-300 px-3 py-2 text-sm">
              {saveMessage}
            </div>
          )}
          
          {error && (
            <div className="rounded-md bg-red-500/10 border border-red-500/30 text-red-300 px-3 py-2 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm mb-1">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              value={email}
              readOnly
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-slate-400 cursor-not-allowed"
              title="Email cannot be changed"
            />
            <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
          </div>
          
          <div>
            <label className="block text-sm mb-1">Professional headline</label>
            <input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g., Frontend Engineer @ Acme Corp"
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="rounded-md bg-brand px-4 py-2 font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      </section>

      <aside className="space-y-4">
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Profile Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Profile Views</span>
              <span className="text-brand font-semibold">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Applications</span>
              <span className="text-brand font-semibold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Saved Jobs</span>
              <span className="text-brand font-semibold">0</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-2">Account Info</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-slate-400">User ID:</span>
              <span className="text-slate-200 ml-2">#{auth.user?._id || 'N/A'}</span>
            </div>
            <div>
              <span className="text-slate-400">Email:</span>
              <span className="text-slate-200 ml-2">{email}</span>
            </div>
            <div>
              <span className="text-slate-400">Status:</span>
              <span className="text-green-400 ml-2">Active</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-2">Tips</h3>
          <p className="text-sm text-slate-300">
            Complete your profile to attract more opportunities. Add a professional headline and keep your information up to date.
          </p>
        </div>
      </aside>
    </div>
  )
}
