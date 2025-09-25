import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {useRecoilValue, useResetRecoilState} from "recoil";
import { authState, isLoggedIn } from '../state/auth';
import { logout } from '../../api/api.js'

export default function Navbar() {
  const isLoggedInState = useRecoilValue(isLoggedIn);
  const resetAuth = useResetRecoilState(authState)
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors'
  const getLinkClass = ({ isActive }) =>
    `${linkBase} ${isActive ? 'text-white bg-white/10' : 'text-slate-200 hover:text-white hover:bg-white/10'}`

  const mobileLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-slate-200 hover:text-white hover:bg-white/10'}`

  const onLogout = async () => {
    try { await logout() } catch (e) { console.error(e) }
    resetAuth()
    try { localStorage.removeItem('authState') } catch (e) { console.error(e) }
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-white/5 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <img className='text-white' src='/Vector 4.png' width={40} height={40} alt="MrRecruiter Logo" />
            <span className="text-2xl font-bold gradient-text tracking-wide">MrRecruiter</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {isLoggedInState && (
              <>
                <NavLink to="/home" className={getLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={getLinkClass}>
                  Jobs
                </NavLink>
                <NavLink to="/profile" className={getLinkClass}>
                  Profile
                </NavLink>
              </>
            )}
          </div>

         
          <div className="hidden md:flex items-center gap-2">
            {isLoggedInState ? (
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium rounded-md bg-brand hover:bg-brand-dark transition-colors"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-md text-slate-200 hover:text-white hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-md bg-brand hover:bg-brand-dark"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

         
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/5 backdrop-blur border-t border-white/10">
              {isLoggedInState ? (
                <>
                  <NavLink to="/home" className={mobileLinkClass} onClick={closeMobileMenu}>
                    Home
                  </NavLink>
                  <NavLink to="/jobs" className={mobileLinkClass} onClick={closeMobileMenu}>
                    Jobs
                  </NavLink>
                  <NavLink to="/profile" className={mobileLinkClass} onClick={closeMobileMenu}>
                    Profile
                  </NavLink>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-brand hover:bg-brand-dark transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-white/10"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-brand hover:bg-brand-dark"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
