import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Glasses, Heart, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function DestinationCard({ destination }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const isFav = isFavorite(destination.id);

  return (
    <div className="group relative bg-[#070d19]/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col hover:-translate-y-1">
      
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={destination.coverImage}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d19] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-cyan-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/40 flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>360° Photosphere</span>
          </span>
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700/50">
            {destination.continent}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(destination.id);
          }}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
            isFav
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50 scale-110'
              : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/80'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-[#030712]/75 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700/50">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>{destination.duration}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{destination.location}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{destination.rating}</span>
            </div>
          </div>

          <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-400 transition-colors mt-1 mb-2">
            <Link to={`/destination/${destination.id}`}>
              {destination.name}
            </Link>
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {destination.description}
          </p>
        </div>

        {/* Actions matching Proposal Core Workflow */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2.5">
          <Link
            to={`/destination/${destination.id}`}
            className="flex-1 text-center py-2.5 px-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-colors border border-slate-700/60"
          >
            Details & Facts
          </Link>

          <button
            onClick={() => navigate(`/tour/${destination.id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-extrabold shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
          >
            <Glasses className="w-3.5 h-3.5" />
            <span>Launch VR</span>
          </button>
        </div>
      </div>
    </div>
  );
}
