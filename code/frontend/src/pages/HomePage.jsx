import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Glasses, Compass, Sparkles, MapPin, ArrowRight, Shield, Globe, Award, Headphones, Heart } from 'lucide-react';
import { DESTINATIONS } from '../data/destinationsData';
import DestinationCard from '../components/DestinationCard';

export default function HomePage() {
  const navigate = useNavigate();
  const featuredDestinations = DESTINATIONS.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/60">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80"
            alt="Virtual Travel Background"
            className="w-full h-full object-cover filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d14] via-[#0a0d14]/90 to-[#0a0d14]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Virtual Reality Travel Experience • UCS503P Project</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Travel the Wonders of the World in{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Immersive 360° VR
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Overcome geographical boundaries and travel constraints. Explore high-fidelity 360° virtual destinations, interact with architectural hotspots, and listen to authentic historical audio guides.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/tour/taj-mahal')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
            >
              <Glasses className="w-5 h-5" />
              <span>Launch Taj Mahal VR Tour</span>
            </button>

            <Link
              to="/explore"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-sm transition-all"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explore All Destinations</span>
            </Link>
          </div>

          {/* Highlights bar */}
          <div className="mt-14 pt-8 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">5 Global Sites</p>
                <p className="text-xs text-slate-400">Asia, Europe, Americas, Africa</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">3D Hotspots</p>
                <p className="text-xs text-slate-400">Spatial information markers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Voice Guides</p>
                <p className="text-xs text-slate-400">Synchronized narration</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <Glasses className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">WebXR & Desktop</p>
                <p className="text-xs text-slate-400">Works in any browser & VR</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">Curated Heritage Wonders</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Featured VR Destinations</h2>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300 mt-2 md:mt-0 transition-colors"
          >
            <span>View all 5 destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* Core Workflow Demonstration Section (From Section 4.2 of Proposal) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0e1320] border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">Demonstrable Architecture</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 mb-4">
              How the VR Everywhere Experience Works
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Designed according to the 7-step core workflow specified in the UCS503P project proposal:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">1</span>
                <div>
                  <strong className="text-slate-100 block mb-0.5">Explore & Select</strong>
                  <span className="text-slate-400">Browse catalogue of historical landmarks with filters.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">2</span>
                <div>
                  <strong className="text-slate-100 block mb-0.5">Destination Overview</strong>
                  <span className="text-slate-400">Review facts, key attractions, climate, and history.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">3</span>
                <div>
                  <strong className="text-slate-100 block mb-0.5">Enter 360° Spherical VR</strong>
                  <span className="text-slate-400">Immersive panoramic view with drag, touch, or headset.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">4</span>
                <div>
                  <strong className="text-slate-100 block mb-0.5">Spatial Hotspots & Narration</strong>
                  <span className="text-slate-400">Tap pulsing 3D beacons to view cultural insights & audio.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
