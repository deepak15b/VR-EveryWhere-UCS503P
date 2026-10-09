import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Glasses, Sparkles, Compass, MapPin } from 'lucide-react';
import { DESTINATIONS } from '../data/destinationsData';

export default function VRToursCatalogPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-cyan-400 mb-1">
          <Glasses className="w-3.5 h-3.5" />
          <span>Interactive 360° Tours</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Select a Virtual Reality Experience
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Choose a destination below to enter full 360° spherical mode immediately. Compatible with standard desktop browsers, mobile touch & gyro, and WebXR headsets.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DESTINATIONS.map((dest) => (
          <div
            key={dest.id}
            className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0f1422] hover:border-cyan-500/50 transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={dest.coverImage}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1422] via-transparent to-black/40" />

              <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                {dest.category}
              </span>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                <button
                  onClick={() => navigate(`/tour/${dest.id}`)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/30 flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Glasses className="w-4 h-4" />
                  <span>Launch 360° Tour</span>
                </button>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{dest.location}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {dest.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {dest.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Hotspots: <strong className="text-slate-200">{dest.hotspots.length} points</strong>
                </span>
                <button
                  onClick={() => navigate(`/tour/${dest.id}`)}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>Start Tour</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
