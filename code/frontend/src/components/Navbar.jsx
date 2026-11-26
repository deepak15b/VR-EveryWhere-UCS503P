import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Heart, User, MapPin, LogIn, LogOut, Menu, X, Glasses, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation items:
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'VR Tours', path: '/tours' },
    { name: 'Favorites', path: '/favorites', badge: isAuthenticated && favorites.length > 0 ? favorites.length : undefined },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070d19]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform duration-300">
              <Glasses className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black bg-gradient-to-r from-white via-cyan-100 to-slate-300 bg-clip-text text-transparent">
                  VR Everywhere
                </span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-1.5 py-0.2 rounded-md hidden sm:inline">
                  360° VR
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5 hidden sm:block">
                Virtual Travel Experience • WebXR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                {item.name}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 text-[10px] font-black rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User Status / Action Button */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick 360 VR Tour Launcher */}
            <button
              onClick={() => navigate('/tour/taj-mahal')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all"
              title="Launch Featured 360° Tour (Taj Mahal)"
            >
              <Glasses className="w-3.5 h-3.5 text-cyan-400" />
              <span>Launch 360° VR</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/40 text-xs text-slate-200 hover:text-white transition-all shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-[10px] font-black text-cyan-300">
                    {user?.name ? user.name[0].toUpperCase() : 'H'}
                  </div>
                  <span className="max-w-[100px] truncate font-semibold">{user?.name || 'Explorer'}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  title="Log out"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070d19] border-b border-slate-800 px-4 py-4 space-y-2 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-cyan-300"
            >
              <span>{item.name}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 bg-cyan-500 text-slate-950 text-xs font-bold rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/tour/taj-mahal');
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs text-center"
            >
              Launch 360° VR Tour
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
