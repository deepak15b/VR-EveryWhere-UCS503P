import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Glasses,
  Compass,
  Sparkles,
  MapPin,
  ArrowRight,
  Shield,
  Globe,
  Award,
  Headphones,
  Heart,
  Footprints,
  CheckCircle2,
  ExternalLink,
  Camera,
  Layers
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinationsData';
import DestinationCard from '../components/DestinationCard';

export default function HomePage() {
  const navigate = useNavigate();
  const featuredDestinations = DESTINATIONS.slice(0, 4);

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* Hero Section with Cosmic Aurora Glow */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32 border-b border-cyan-500/20">
        
        {/* Animated Glow Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-indigo-600/20 to-purple-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-sky-500/15 rounded-full blur-[90px] pointer-events-none -z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Academic / Platform Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-bold mb-6 shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Virtual Reality Travel Experience • WebXR & 360° VR</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            Travel the World in{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Authentic 360° VR
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Eliminate travel constraints and cost limitations. Experience genuine 360° spherical photospheres of world wonders with walkable Street View waypoints, interactive 3D spatial hotspots, and natural voice narration.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/tour/taj-mahal')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all"
            >
              <Glasses className="w-5 h-5" />
              <span>Launch Taj Mahal 360° VR</span>
            </button>

            <Link
              to="/explore"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#070d19] hover:bg-slate-800/90 border border-slate-700/80 text-white font-bold text-sm transition-all shadow-md"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Browse All {DESTINATIONS.length} VR Sites</span>
            </Link>
          </div>

          {/* Proposal Heuristics Bar */}
          <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#070d19]/60 border border-slate-800">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-white">Genuine 360°</p>
                <p className="text-xs text-slate-400">Equirectangular spheres</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#070d19]/60 border border-slate-800">
              <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-white">Walk Forward</p>
                <p className="text-xs text-slate-400">Street View step transition</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#070d19]/60 border border-slate-800">
              <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-white">Voice & Audio</p>
                <p className="text-xs text-slate-400">Speech guide & ambient</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#070d19]/60 border border-slate-800">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Glasses className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-white">Mobile VR Gyro</p>
                <p className="text-xs text-slate-400">Headset motion tracking</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Workflow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-[#070d19]/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-extrabold text-cyan-400">
              Interactive Platform Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              End-to-End Travel Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Designed according to the primary heuristic: selecting a destination → viewing its information → starting a VR tour → exploring the environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Discover & Search',
                desc: 'Browse world wonders with category filters, ratings, and historical overviews.',
                icon: Compass
              },
              {
                step: '02',
                title: 'Enter 360° VR Mode',
                desc: 'Launch real equirectangular spherical photosphere with zero distortion or flat warping.',
                icon: Glasses
              },
              {
                step: '03',
                title: 'Walk & Interact',
                desc: 'Press W to step forward along waypoints and click 3D glowing beacons for facts.',
                icon: Footprints
              },
              {
                step: '04',
                title: 'Listen & Favorite',
                desc: 'Listen to spoken voice guide, capture postcards, and save to user profile.',
                icon: Heart
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-cyan-500/40">{item.step}</span>
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured 360° Destinations Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-extrabold text-cyan-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Verified 360° Photospheres</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Featured Global Sites
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Curated world attractions with genuine equirectangular spherical textures and walkable waypoints.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* Section: Immersive WebXR Experience */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 bg-gradient-to-r from-cyan-950/40 via-[#070d19] to-indigo-950/40 border border-cyan-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Cross-Device Compatibility • WebXR</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Experience Virtual Tourism from Any Device
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Compatible with desktop web browsers, mobile touchscreens, and smartphone VR headsets (Google Cardboard). Step directly into 11 global landmarks with zero setup required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/tour/taj-mahal')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-black text-xs shadow-lg transition-all"
            >
              Start 360° Taj Mahal Tour
            </button>
            <Link
              to="/explore"
              className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
            >
              Explore All Destinations
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
