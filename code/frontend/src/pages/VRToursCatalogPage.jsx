import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Glasses, Sparkles, Compass, MapPin, Footprints, ExternalLink, ArrowRight } from 'lucide-react';
import { DESTINATIONS, getDestinationHotspots } from '../data/destinationsData';

export default function VRToursCatalogPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-purple-950/40 border border-cyan-500/30 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-extrabold text-cyan-400 mb-2">
          <Glasses className="w-4 h-4" />
          <span>Interactive 360° Spherical VR Tours</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Virtual Reality Tour Catalogue
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Select any verified attraction below to enter full 360° immersion. Every tour includes genuine equirectangular spherical photography, interactive 3D spatial hotspots, voice narration, and Street View walkway navigation.
        </p>

        {/* Feature Highlights Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Genuine 360° Photospheres</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold flex items-center gap-1.5">
            <Footprints className="w-3.5 h-3.5" />
            <span>Walkable Waypoints (W & S Keys)</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold">
            Web Audio & Speech Guides
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DESTINATIONS.map((dest) => {
          const totalHotspots = getDestinationHotspots(dest).length;
          const totalViewpoints = dest.viewpoints?.length || 1;

          return (
            <div
              key={dest.id}
              className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-[#070d19]/90 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={dest.coverImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d19] via-transparent to-black/40" />

                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full bg-cyan-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/40">
                  {dest.category}
                </span>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-xs">
                  <button
                    onClick={() => navigate(`/tour/${dest.id}`)}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-black text-xs shadow-xl shadow-cyan-500/40 flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Glasses className="w-4 h-4" />
                    <span>Launch 360° VR Tour</span>
                  </button>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{dest.location}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {dest.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {dest.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Hotspots: <strong className="text-slate-200">{totalHotspots} points</strong></span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Footprints className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{totalViewpoints} {totalViewpoints === 1 ? 'Vantage' : 'Waypoints'}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/destination/${dest.id}`)}
                      className="flex-1 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700/60 transition-colors text-center"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => navigate(`/tour/${dest.id}`)}
                      className="flex-1 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                    >
                      <span>Start Tour</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
