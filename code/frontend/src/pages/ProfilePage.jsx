import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Glasses, Heart, Clock, Award, Shield, LogOut, Compass, Calendar, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { favorites, tourHistory } = useFavorites();
  const navigate = useNavigate();

  const totalMinutes = tourHistory.reduce((acc, h) => acc + (h.durationMinutes || 8), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="relative rounded-3xl bg-[#0f1422] border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
            <div className="w-full h-full bg-[#0a0d14] rounded-2xl flex items-center justify-center text-cyan-400 font-bold text-3xl">
              {user?.name ? user.name[0].toUpperCase() : 'D'}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {user?.name || 'Deepak'}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  {user?.email || '1024170432@thapar.edu'} • {user?.role || 'CSE Student Explorer'}
                </p>
              </div>

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-slate-700 text-xs font-semibold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  <span>Sign In to Account</span>
                </Link>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700">
                Thapar Institute of Engg. & Tech
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-800 text-cyan-300">
                UCS503P Project Candidate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-[#0f1422] border border-slate-800 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
            <Glasses className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white">{tourHistory.length}</span>
            <p className="text-xs text-slate-400 mt-1">VR Tours Taken</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f1422] border border-slate-800 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white">{totalMinutes}</span>
            <p className="text-xs text-slate-400 mt-1">Minutes Explored</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f1422] border border-slate-800 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white">{favorites.length}</span>
            <p className="text-xs text-slate-400 mt-1">Saved Favorites</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f1422] border border-slate-800 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white">Level 2</span>
            <p className="text-xs text-slate-400 mt-1">Heritage Voyager</p>
          </div>
        </div>
      </div>

      {/* Tour History Section */}
      <div className="bg-[#0f1422] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Previously Explored Destinations</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical log of your immersive virtual reality sessions.
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
          >
            <span>Take new tour</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {tourHistory.length > 0 ? (
          <div className="divide-y divide-slate-800/80">
            {tourHistory.map((item) => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Glasses className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">
                      {item.destinationName}
                    </h4>
                    <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {new Date(item.visitedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                    ~{item.durationMinutes} min session
                  </span>
                  <button
                    onClick={() => navigate(`/tour/${item.destinationId}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors"
                  >
                    Re-enter Tour
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-xs text-slate-500">
            No previous tours recorded. Launch a VR tour to start your history!
          </div>
        )}
      </div>

    </div>
  );
}
