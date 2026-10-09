import React from 'react';
import { X, Sparkles, Volume2, Info, ArrowRight } from 'lucide-react';

export default function HotspotModal({ hotspot, onClose, onPlayNarration }) {
  if (!hotspot) return null;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in pointer-events-auto">
      <div 
        className="relative w-full max-w-lg bg-[#0f1422] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl shadow-cyan-950/50 text-slate-100 transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-cyan-400">
                Interactive Hotspot • {hotspot.category}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {hotspot.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-300 leading-relaxed">
            {hotspot.description}
          </div>

          {hotspot.details && (
            <div className="text-xs text-slate-400 leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Architectural & Cultural Insights</span>
              </div>
              <p className="pl-5 border-l-2 border-cyan-500/30 text-slate-300">
                {hotspot.details}
              </p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
          {onPlayNarration && (
            <button
              onClick={() => onPlayNarration(hotspot.description + " " + (hotspot.details || ''))}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen to Hotspot Audio</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Hotspot
          </button>
        </div>
      </div>
    </div>
  );
}
