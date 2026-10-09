import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Star, Glasses, Heart, ArrowLeft, Calendar, CloudSun, Clock, Sparkles, CheckCircle2, Volume2 } from 'lucide-react';
import { DESTINATIONS } from '../data/destinationsData';
import { useFavorites } from '../context/FavoritesContext';

export default function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const found = DESTINATIONS.find((d) => d.id === id);
    if (found) {
      setDestination(found);
    }
  }, [id]);

  if (!destination) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Destination Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">The requested travel destination does not exist or has been moved.</p>
        <Link to="/explore" className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-semibold">
          Back to Explore
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(destination.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Destinations</span>
      </button>

      {/* Hero Header Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0f1422] shadow-2xl">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={destination.coverImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1422] via-[#0f1422]/50 to-transparent" />
          
          {/* Top badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
              {destination.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700/50 text-xs font-medium">
              {destination.continent}
            </span>
          </div>

          {/* Favorite button */}
          <button
            onClick={() => toggleFavorite(destination.id)}
            className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
              isFav
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
                : 'bg-black/60 text-slate-300 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Floating Details Overlay */}
        <div className="p-6 sm:p-8 -mt-20 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{destination.location}</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{destination.rating}</span>
                  <span className="text-xs text-slate-400 font-normal">({destination.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {destination.name}
              </h1>
            </div>

            {/* Core CTAs */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleFavorite(destination.id)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-bold transition-all border ${
                  isFav
                    ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-rose-500' : ''}`} />
                <span>{isFav ? 'Saved to Favorites' : 'Add to Favorites'}</span>
              </button>

              <button
                onClick={() => navigate(`/tour/${destination.id}`)}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all"
              >
                <Glasses className="w-5 h-5" />
                <span>Start VR Tour</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Description, Historical Facts, Attractions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-3">About the Destination</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {destination.description}
            </p>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-3">
              <Volume2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-1">
                  Audio Guide Narration Preview
                </span>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{destination.audioNarration}"
                </p>
              </div>
            </div>
          </div>

          {/* Historical Facts */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">Historical Facts & Background</h3>
            <div className="grid grid-cols-1 gap-3.5">
              {destination.historicalFacts.map((fact, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Attractions */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">Important Attractions & Landmarks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.attractions.map((attraction, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span className="font-medium">{attraction}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: VR Hotspots Preview & Practical Info */}
        <div className="space-y-6">
          
          {/* Interactive VR Hotspots Available */}
          <div className="bg-[#0f1422] border border-cyan-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Interactive VR Hotspots ({destination.hotspots.length})</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              These 3D spatial beacons are clickable inside the 360° virtual tour to reveal cultural secrets:
            </p>

            <div className="space-y-2.5">
              {destination.hotspots.map((hs) => (
                <div key={hs.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-200">{hs.title}</span>
                    <span className="text-[10px] text-cyan-400 font-medium px-1.5 py-0.5 rounded bg-cyan-950/60">
                      {hs.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {hs.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Info Card */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-white">Travel Information</h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Best Time to Visit</strong>
                  <span className="text-slate-400">{destination.bestTimeToVisit}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CloudSun className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Regional Climate</strong>
                  <span className="text-slate-400">{destination.climate}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Virtual Tour Duration</strong>
                  <span className="text-slate-400">{destination.duration}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/tour/${destination.id}`)}
              className="w-full mt-2 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors shadow-lg shadow-cyan-600/20"
            >
              Enter Virtual Reality Mode
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
