import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, Sparkles, Lock, LogIn } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { DESTINATIONS } from '../data/destinationsData';
import DestinationCard from '../components/DestinationCard';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { isAuthenticated } = useAuth();

  const favoriteDestinations = DESTINATIONS.filter((dest) =>
    favorites.includes(dest.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-rose-400 mb-1">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Saved Places</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Your Favorite Destinations
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Quickly re-visit and enter VR tours for your bookmarked world heritage sites.
        </p>
      </div>

      {/* Auth Guard or Grid or Empty state */}
      {!isAuthenticated ? (
        <div className="text-center py-16 bg-[#070d19]/90 rounded-3xl border border-dashed border-slate-700/60 p-8 max-w-lg mx-auto shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-white mb-2">Sign In to Access Favorites</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            You are currently exploring as an unauthenticated guest. Sign in or register an account to bookmark world destinations, synchronize your saved sites, and access them anytime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/login"
              state={{ from: { pathname: '/favorites' } }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/30 hover:scale-105"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Register</span>
            </Link>
            <Link
              to="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all border border-slate-700"
            >
              <Compass className="w-4 h-4" />
              <span>Discover Destinations</span>
            </Link>
          </div>
        </div>
      ) : favoriteDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#070d19]/90 rounded-3xl border border-dashed border-cyan-500/30 p-8 max-w-md mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/30 shadow-lg shadow-rose-500/10">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-white mb-2">No Favorites Saved Yet</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            While exploring destinations or during your 360° VR tours, tap the heart icon or save upon exiting to bookmark your favorite sites.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/30 hover:scale-105"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Global Destinations</span>
          </Link>
        </div>
      )}

    </div>
  );
}
