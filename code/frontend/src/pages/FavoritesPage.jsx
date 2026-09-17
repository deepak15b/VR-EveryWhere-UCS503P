import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, Sparkles } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { DESTINATIONS } from '../data/destinationsData';
import DestinationCard from '../components/DestinationCard';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

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

      {/* Grid or Empty state */}
      {favoriteDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#0f1422] rounded-3xl border border-dashed border-slate-800 p-8 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Favorites Saved Yet</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            While exploring destinations or during your 360° VR tours, tap the heart icon or save upon exiting to bookmark your favorite sites.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-cyan-600/20"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Destinations</span>
          </Link>
        </div>
      )}

    </div>
  );
}
