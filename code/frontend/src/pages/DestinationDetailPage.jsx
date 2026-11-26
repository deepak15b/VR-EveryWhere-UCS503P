import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Glasses,
  Heart,
  ArrowLeft,
  Calendar,
  CloudSun,
  Clock,
  Sparkles,
  CheckCircle2,
  Volume2,
  ExternalLink,
  Footprints,
  Navigation,
  Play,
  Pause
} from 'lucide-react';
import { DESTINATIONS, getDestinationHotspots } from '../data/destinationsData';
import { useFavorites } from '../context/FavoritesContext';
import { TourSpeechGuide } from '../services/soundEffects';

export default function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [destination, setDestination] = useState(
    () => DESTINATIONS.find((d) => d.id === id) || null
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const found = DESTINATIONS.find((d) => d.id === id);
    if (found) {
      setDestination(found);
    }
  }, [id]);

  useEffect(() => {
    return () => {
      TourSpeechGuide.stop();
    };
  }, []);

  if (!destination) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Destination Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">
          The requested travel destination does not exist or has been moved.
        </p>
        <Link
          to="/explore"
          className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-semibold"
        >
          Back to Explore
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(destination.id);
  const allHotspots = getDestinationHotspots(destination);

  const handleToggleSpeech = () => {
    if (isPlayingAudio) {
      TourSpeechGuide.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      TourSpeechGuide.speak(
        destination.audioNarration,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back link */}
      <button
        onClick={() => navigate('/explore')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Destinations</span>
      </button>

      {/* Hero Header Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#070d19] shadow-2xl">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={destination.coverImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070d19] via-[#070d19]/60 to-transparent" />
          
          {/* Top badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>360° Photosphere Verified</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700/50 text-xs font-medium">
              {destination.category} • {destination.continent}
            </span>
          </div>

          {/* Favorite button */}
          <button
            onClick={() => toggleFavorite(destination.id)}
            className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
              isFav
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-105'
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
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="flex items-center gap-1.5 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{destination.location}</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{destination.rating}</span>
                  <span className="text-xs text-slate-400 font-normal">
                    ({destination.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {destination.name}
              </h1>
            </div>

            {/* Core CTAs: Start VR Tour & External Google Maps Street View */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {destination.googleStreetViewUrl && (
                <a
                  href={destination.googleStreetViewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-all shadow-md"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>Google Maps 360°</span>
                </a>
              )}

              <button
                onClick={() => navigate(`/tour/${destination.id}`)}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
              >
                <Glasses className="w-5 h-5" />
                <span>Enter 360° VR Tour</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Overview & Audio Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Description, Historical Facts, Waypoints, Attractions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#070d19]/90 border border-slate-800 shadow-xl space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>About this Destination</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Walkable Waypoint Network */}
          {destination.viewpoints && destination.viewpoints.length > 0 && (
            <div className="p-6 sm:p-7 rounded-3xl bg-[#070d19]/90 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Footprints className="w-4 h-4 text-cyan-400" />
                  <span>Walkable 360° Vantage Points ({destination.viewpoints.length})</span>
                </h2>
                <span className="text-xs text-slate-400">Street View Walkway Network</span>
              </div>

              <div className="space-y-3">
                {destination.viewpoints.map((vp, index) => (
                  <div
                    key={vp.id}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs font-black text-cyan-400 shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{vp.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{vp.subtitle}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/tour/${destination.id}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs border border-cyan-500/30 transition-all shrink-0"
                    >
                      Teleport
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Historical Facts List */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#070d19]/90 border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white">Historical & Architectural Facts</h2>
            <div className="grid grid-cols-1 gap-3">
              {destination.historicalFacts?.map((fact, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-xs sm:text-sm text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hotspots & Key Features */}
          {allHotspots.length > 0 && (
            <div className="p-6 sm:p-7 rounded-3xl bg-[#070d19]/90 border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white">Interactive 3D Hotspots in Tour</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allHotspots.map((hs) => (
                  <div
                    key={hs.id}
                    className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      {hs.category}
                    </span>
                    <h4 className="text-xs font-bold text-white">{hs.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{hs.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Audio Narration, Climate, Travel Meta */}
        <div className="space-y-6">
          
          {/* Audio Guide Preview Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-cyan-950/40 to-[#070d19] border border-cyan-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Volume2 className="w-4 h-4" />
                <span>Audio Tour Guide</span>
              </div>
              <button
                onClick={handleToggleSpeech}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isPlayingAudio
                    ? 'bg-rose-500 text-white shadow-lg'
                    : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md'
                }`}
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Stop' : 'Listen'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-cyan-500/50 pl-3">
              "{destination.audioNarration}"
            </p>

            <div className="text-[11px] text-slate-400">
              Synchronized audio narration automatically plays as you explore hotspots in the 360° VR viewer.
            </div>
          </div>

          {/* Travel Practical Details */}
          <div className="p-6 rounded-3xl bg-[#070d19]/90 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Travel Intelligence
            </h3>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Best Time to Visit:</span>
                  <span className="text-slate-400">{destination.bestTimeToVisit}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CloudSun className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Climate:</span>
                  <span className="text-slate-400">{destination.climate}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Recommended VR Duration:</span>
                  <span className="text-slate-400">{destination.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Launch Tour Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-cyan-600 via-sky-600 to-indigo-700 text-white shadow-xl space-y-3 text-center">
            <Glasses className="w-8 h-8 mx-auto" />
            <h3 className="text-lg font-black">Experience in Full 360° VR</h3>
            <p className="text-xs text-cyan-100">
              Interact with spatial hotspots, navigate waypoints, and listen to the voice guide.
            </p>
            <button
              onClick={() => navigate(`/tour/${destination.id}`)}
              className="w-full py-3 rounded-2xl bg-white text-slate-950 font-black text-xs shadow-lg hover:bg-slate-100 transition-all hover:scale-[1.02]"
            >
              Start Virtual Tour Now
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
