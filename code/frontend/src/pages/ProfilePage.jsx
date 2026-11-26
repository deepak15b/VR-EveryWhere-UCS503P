import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Glasses,
  Heart,
  Clock,
  Award,
  Shield,
  LogOut,
  Compass,
  Calendar,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { DESTINATIONS } from '../data/destinationsData';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { favorites, tourHistory } = useFavorites();
  const navigate = useNavigate();

  const totalMinutes = tourHistory.reduce((acc, h) => acc + (h.durationMinutes || 8), 0);
  const visitedIds = [...new Set(tourHistory.map((h) => h.destinationId))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="relative rounded-3xl bg-[#070d19]/90 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
            <div className="w-full h-full bg-[#030712] rounded-2xl flex items-center justify-center text-cyan-400 font-black text-3xl">
              {user?.name ? user.name[0].toUpperCase() : 'E'}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    {user?.name || 'VR Explorer'}
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                    Active Explorer
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {user?.email || 'explorer@vreverywhere.internal'} • Global Explorer Passport
                </p>
              </div>

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-slate-700 text-xs font-bold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-slate-400">
              <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800">
                World Heritage Explorer
              </span>
              <span className="px-3 py-1 rounded-xl bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 font-semibold">
                WebXR 3D Ready
              </span>
              <span className="px-3 py-1 rounded-xl bg-indigo-950/60 border border-indigo-800/80 text-indigo-300 font-semibold">
                Stereoscopic VR Goggles
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-[#070d19]/90 border border-slate-800 flex flex-col justify-between shadow-xl">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 border border-cyan-500/20">
            <Glasses className="w-5 h-5" />
          </div>
          <div>
            <span className="text-3xl font-black text-white">{tourHistory.length}</span>
            <p className="text-xs text-slate-400 mt-1">360° Tours Logged</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#070d19]/90 border border-slate-800 flex flex-col justify-between shadow-xl">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3 border border-sky-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-3xl font-black text-white">{totalMinutes}</span>
            <p className="text-xs text-slate-400 mt-1">Minutes in VR</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#070d19]/90 border border-slate-800 flex flex-col justify-between shadow-xl">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3 border border-rose-500/20">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-3xl font-black text-white">{favorites.length}</span>
            <p className="text-xs text-slate-400 mt-1">Saved Favorites</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#070d19]/90 border border-slate-800 flex flex-col justify-between shadow-xl">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 border border-emerald-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-3xl font-black text-white">100%</span>
            <p className="text-xs text-slate-400 mt-1">Exploration Level</p>
          </div>
        </div>
      </div>

      {/* Virtual Travel Passport Stamps */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#070d19]/90 border border-slate-800 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-extrabold text-cyan-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Virtual Travel Passport</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Explorer Visa Stamps & Achievements
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {visitedIds.length} of {DESTINATIONS.length} Stamps Earned
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DESTINATIONS.map((dest) => {
            const hasVisited = visitedIds.includes(dest.id);
            return (
              <div
                key={dest.id}
                onClick={() => navigate(`/tour/${dest.id}`)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[120px] ${
                  hasVisited
                    ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-300 hover:scale-105 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black mb-1 border ${
                    hasVisited
                      ? 'border-cyan-400 text-cyan-300 bg-cyan-500/20'
                      : 'border-slate-700 text-slate-600 bg-slate-800'
                  }`}
                >
                  {hasVisited ? '✓' : '○'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{dest.name}</h4>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{dest.continent}</span>
                </div>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider mt-1 px-1.5 py-0.2 rounded ${
                    hasVisited ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {hasVisited ? 'PASSPORT STAMP' : 'UNVISITED'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tour History Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#070d19]/90 border border-slate-800 shadow-2xl space-y-4">
        <h2 className="text-xl font-black text-white">Recent 360° VR Tour Sessions</h2>
        {tourHistory.length > 0 ? (
          <div className="space-y-2.5">
            {tourHistory.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Glasses className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{session.destinationName}</h4>
                    <p className="text-xs text-slate-400">
                      Explored on {new Date(session.visitedAt).toLocaleDateString()} • {session.durationMinutes} min session
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/tour/${session.destinationId}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs border border-cyan-500/30 transition-all shrink-0"
                >
                  Re-enter VR
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No tours logged yet. Launch a tour to start your travel history!</p>
        )}
      </div>

    </div>
  );
}
