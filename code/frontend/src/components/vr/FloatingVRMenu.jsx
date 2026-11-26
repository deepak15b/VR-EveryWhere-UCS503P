import React, { useState } from 'react';
import {
  Map,
  Info,
  Volume2,
  VolumeX,
  Settings,
  LogOut,
  Compass,
  Sparkles,
  Footprints,
  ChevronRight,
  ExternalLink,
  Play,
  Pause,
  Camera,
  Sun,
  Moon,
  Zap,
  Maximize2,
  Glasses
} from 'lucide-react';
import { TourSpeechGuide, soundEngine } from '../../services/soundEffects';

export default function FloatingVRMenu({
  destination,
  currentViewpoint,
  onNavigateToViewpoint,
  heading = 0,
  fov = 75,
  setFov,
  rotationSpeed = 1.0,
  setRotationSpeed,
  ambientFilter = 'natural',
  setAmbientFilter,
  autoRotate = false,
  setAutoRotate,
  stereoMode = false,
  setStereoMode,
  onSelectHotspot,
  onCapturePostcard,
  onExitTour,
}) {
  const [activeTab, setActiveTab] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ambientType, setAmbientType] = useState('breeze');
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [ambientVolume, setAmbientVolume] = useState(0.4);

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const activeHotspots = currentViewpoint?.hotspots || destination.hotspots || [];

  // Speech Guide Control
  const handleToggleSpeech = () => {
    if (isSpeaking) {
      TourSpeechGuide.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      TourSpeechGuide.speak(
        destination.audioNarration,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  // Ambient Audio Control
  const handleToggleAmbient = () => {
    if (ambientPlaying) {
      soundEngine.stopAmbient();
      setAmbientPlaying(false);
    } else {
      soundEngine.startAmbient(ambientType);
      soundEngine.setAmbientVolume(ambientVolume);
      setAmbientPlaying(true);
    }
  };

  const handleAmbientTypeChange = (type) => {
    setAmbientType(type);
    if (ambientPlaying) {
      soundEngine.startAmbient(type);
    }
  };

  const handleVolumeChange = (vol) => {
    setAmbientVolume(vol);
    soundEngine.setAmbientVolume(vol);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Hide 2D floating menu completely in VR Headset Mode for pure stereoscopic immersion
  if (stereoMode) return null;

  return (
    <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none w-auto max-w-[95vw] px-2 sm:px-4">
      
      {/* Expanded Modal Panel (Map | Information | Audio | Settings) */}
      {activeTab && (
        <div className="mb-3 w-full max-w-lg sm:max-w-xl bg-[#050b14]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto text-slate-200 animate-fade-in max-h-[55vh] overflow-y-auto">
          
          {/* TAB 1: MAP & RADAR ORIENTATION */}
          {activeTab === 'map' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Map className="w-4 h-4" />
                  <span>Interactive Radar & Orientation Map</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Compass Heading: <strong className="text-cyan-400">{Math.round(heading)}°</strong></span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* 360° Circular Radar Needle */}
                <div className="relative w-44 h-44 rounded-full bg-[#030712] border-2 border-cyan-500/50 flex items-center justify-center shrink-0 shadow-inner shadow-cyan-500/20">
                  <span className="absolute top-1 text-[10px] font-black text-cyan-300">N</span>
                  <span className="absolute bottom-1 text-[10px] font-black text-slate-400">S</span>
                  <span className="absolute right-2 text-[10px] font-black text-slate-400">E</span>
                  <span className="absolute left-2 text-[10px] font-black text-slate-400">W</span>

                  <div className="w-32 h-32 rounded-full border border-dashed border-cyan-500/25" />
                  <div className="w-20 h-20 rounded-full border border-cyan-500/30" />

                  {/* Directional Needle */}
                  <div
                    className="absolute w-1.5 h-16 bg-gradient-to-t from-transparent via-cyan-400 to-rose-500 rounded-full origin-bottom transition-transform duration-75"
                    style={{
                      transform: `rotate(${heading}deg) translateY(-50%)`,
                      transformOrigin: '50% 100%'
                    }}
                  />
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/80 z-10" />

                  {/* Waypoint Teleport Pins on Radar */}
                  {destination.viewpoints?.map((vp, idx) => {
                    const isCurrent = vp.id === currentViewpoint?.id;
                    const coords = vp.mapCoords || { x: 50, y: 50 };
                    return (
                      <button
                        key={vp.id}
                        onClick={() => onNavigateToViewpoint && onNavigateToViewpoint(vp.id)}
                        title={`Teleport to ${vp.name}`}
                        className={`absolute w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-transform hover:scale-125 ${
                          isCurrent
                            ? 'bg-cyan-400 text-slate-950 ring-2 ring-white shadow-lg shadow-cyan-400/80 z-20 scale-110'
                            : 'bg-slate-800 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500 hover:text-slate-950'
                        }`}
                        style={{
                          top: `${coords.y}%`,
                          left: `${coords.x}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="flex-1 space-y-3 text-xs w-full">
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/50">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">
                      Current Vantage Point:
                    </span>
                    <strong className="text-white text-xs sm:text-sm block">
                      {currentViewpoint?.name || destination.name}
                    </strong>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {currentViewpoint?.subtitle}
                    </span>
                  </div>

                  {/* Clickable Waypoints Teleport List */}
                  {destination.viewpoints && destination.viewpoints.length > 1 && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Footprints className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Walkable Waypoints (Click to Teleport):</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {destination.viewpoints.map((vp, idx) => (
                          <button
                            key={vp.id}
                            onClick={() => {
                              if (onNavigateToViewpoint) onNavigateToViewpoint(vp.id);
                              setActiveTab(null);
                            }}
                            className={`p-2 rounded-lg text-left transition-all flex items-center justify-between ${
                              vp.id === currentViewpoint?.id
                                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                            }`}
                          >
                            <span className="truncate">
                              {idx + 1}. {vp.name.split('(')[0].trim()}
                            </span>
                            <ChevronRight className="w-3 h-3 shrink-0 ml-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct Google Maps Location Launch Button */}
                  {destination.googleStreetViewUrl && (
                    <div className="pt-2">
                      <a
                        href={destination.googleStreetViewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open in Google Maps</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INFORMATION */}
          {activeTab === 'information' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Info className="w-4 h-4" />
                  <span>Historical & Architectural Information</span>
                </div>
                <span className="text-xs text-slate-400">{destination.location}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {destination.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                  Key Historical Facts:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {destination.historicalFacts?.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hotspots List */}
              {activeHotspots.length > 0 && (
                <div className="pt-2 border-t border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                    Interactive Hotspots in Current Scene:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeHotspots.map((hs) => (
                      <button
                        key={hs.id}
                        onClick={() => {
                          onSelectHotspot(hs);
                          setActiveTab(null);
                        }}
                        className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group"
                      >
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                          {hs.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {hs.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AUDIO & VOICE NARRATION */}
          {activeTab === 'audio' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Volume2 className="w-4 h-4" />
                  <span>Voice Tour Guide & Ambient Soundscape</span>
                </div>
                <span className="text-[11px] text-slate-400">Web Audio API • Speech Synthesis</span>
              </div>

              {/* Voice Tour Guide */}
              <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Spoken Historical Guide</h4>
                    <p className="text-[11px] text-slate-400">Natural browser speech narration</p>
                  </div>
                  <button
                    onClick={handleToggleSpeech}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSpeaking
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                        : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20'
                    }`}
                  >
                    {isSpeaking ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? 'Pause Guide' : 'Play Narration'}</span>
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 leading-relaxed max-h-24 overflow-y-auto">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">
                    Narration Transcript:
                  </span>
                  {destination.audioNarration}
                </div>
              </div>

              {/* Generative Ambient Soundscape */}
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Generative Spatial Soundscape</h4>
                    <p className="text-[11px] text-slate-400">Offline synthesized ambiance</p>
                  </div>
                  <button
                    onClick={handleToggleAmbient}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      ambientPlaying
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {ambientPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span>{ambientPlaying ? 'Sound Active' : 'Start Ambiance'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Soundscape Theme:</span>
                  {['breeze', 'temple', 'echo'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleAmbientTypeChange(type)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                        ambientType === type
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Ambiance Volume</span>
                    <span>{Math.round(ambientVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={ambientVolume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Settings className="w-4 h-4" />
                  <span>360° VR Viewport & Visual Controls</span>
                </div>
              </div>

              {/* Day / Sunset / Night / Cyber Lighting Filter */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">Ambiance Lighting Mode:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'natural', label: 'Daylight', icon: Sun },
                    { id: 'sunset', label: 'Sunset Gold', icon: Sun },
                    { id: 'night', label: 'Moonlight', icon: Moon },
                    { id: 'cyber', label: 'Cyber Neon', icon: Zap },
                  ].map((filter) => {
                    const Icon = filter.icon;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setAmbientFilter && setAmbientFilter(filter.id)}
                        className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-semibold transition-all ${
                          ambientFilter === filter.id
                            ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                            : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{filter.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field of View (Zoom) */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Field of View (Zoom)</span>
                  <span className="text-cyan-400 font-bold">{Math.round(fov)}°</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="95"
                  value={fov}
                  onChange={(e) => setFov(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              {/* Rotation Sensitivity */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Mouse Pan Sensitivity</span>
                  <span className="text-cyan-400 font-bold">{rotationSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              {/* Auto Rotate Showcase */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white block">Cinematic Auto-Rotate</span>
                  <span className="text-[11px] text-slate-400">Hands-free 360° pan showcase</span>
                </div>
                <button
                  onClick={() => setAutoRotate && setAutoRotate(!autoRotate)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    autoRotate ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {autoRotate ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              {/* VR Headset / Google Cardboard Mode */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Glasses className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-bold text-white block">VR Headset / Cardboard Mode</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Stereoscopic dual-eye split display</span>
                </div>
                <button
                  onClick={() => {
                    const next = !stereoMode;
                    if (setStereoMode) setStereoMode(next);
                    if (next && !document.fullscreenElement) {
                      document.documentElement.requestFullscreen().catch(() => {});
                    }
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    stereoMode ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {stereoMode ? 'Active' : 'Enable'}
                </button>
              </div>

              {/* Fullscreen Button */}
              <div className="pt-2">
                <button
                  onClick={toggleFullscreen}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
                >
                  <Maximize2 className="w-4 h-4 text-cyan-400" />
                  <span>Toggle Immersive Fullscreen</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CORE 5-BUTTON FLOATING VR HUD DOCK (Specified on Proposal Page 7):
          Map | Information | Audio | Settings | Exit Tour */}
      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 p-1.5 sm:p-2 bg-[#050b14]/90 backdrop-blur-2xl rounded-full border border-cyan-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)] pointer-events-auto whitespace-nowrap">
        
        {/* Button 1: MAP */}
        <button
          onClick={() => toggleTab('map')}
          title="Interactive Radar & Map"
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'map'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Map className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Map</span>
        </button>

        {/* Button 2: INFORMATION */}
        <button
          onClick={() => toggleTab('information')}
          title="Historical Destination Facts"
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'information'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Info className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Info</span>
        </button>

        {/* Button 3: AUDIO */}
        <button
          onClick={() => toggleTab('audio')}
          title="Voice Guide & Ambient Narration"
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'audio' || isSpeaking || ambientPlaying
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Volume2 className={`w-4 h-4 shrink-0 ${isSpeaking ? 'animate-bounce text-cyan-200' : ''}`} />
          <span className="hidden sm:inline">Audio</span>
        </button>

        {/* Button 4: SETTINGS */}
        <button
          onClick={() => toggleTab('settings')}
          title="VR Controls & Lighting Filters"
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'settings'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Settings</span>
        </button>

        {/* Bonus Feature: SNAPSHOT POSTCARD */}
        {onCapturePostcard && (
          <button
            onClick={onCapturePostcard}
            title="Take 360° Postcard Snapshot"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs font-bold text-amber-300 hover:text-white hover:bg-amber-500/20 transition-all shrink-0"
          >
            <Camera className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">Postcard</span>
          </button>
        )}

        <div className="w-px h-5 bg-slate-800 mx-0.5 shrink-0" />

        {/* Button 5: EXIT TOUR */}
        <button
          onClick={onExitTour}
          title="Exit Virtual Tour"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 transition-all shrink-0"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Exit</span>
        </button>
      </div>
    </div>
  );
}
