import React, { useState } from 'react';
import { Map, Info, Volume2, Settings, LogOut, Compass, Sparkles, Footprints, ChevronRight } from 'lucide-react';

export default function FloatingVRMenu({
  destination,
  currentViewpoint,
  onNavigateToViewpoint,
  heading = 0,
  fov = 75,
  setFov,
  rotationSpeed = 1.0,
  setRotationSpeed,
  onSelectHotspot,
  audioState,
  onToggleAudio,
  onExitTour,
}) {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const activeHotspots = currentViewpoint?.hotspots || destination.hotspots || [];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none w-full max-w-2xl px-4">
      
      {/* Expanded Panel (Map | Information | Audio | Settings) */}
      {activeTab && (
        <div className="mb-3 w-full bg-[#0a0d14]/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-5 shadow-2xl shadow-black/80 pointer-events-auto text-slate-200 animate-fade-in max-h-[60vh] overflow-y-auto">
          
          {/* TAB 1: MAP */}
          {activeTab === 'map' && (
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Map className="w-4 h-4" />
                  <span>Interactive Radar & Orientation Map</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Heading: <strong className="text-cyan-400">{Math.round(heading)}°</strong></span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Radar Circular Visualizer */}
                <div className="relative w-44 h-44 rounded-full bg-slate-900 border-2 border-cyan-500/40 flex items-center justify-center shrink-0 shadow-inner">
                  {/* Cardinal points */}
                  <span className="absolute top-1 text-[10px] font-bold text-cyan-300">N</span>
                  <span className="absolute bottom-1 text-[10px] font-bold text-slate-400">S</span>
                  <span className="absolute right-2 text-[10px] font-bold text-slate-400">E</span>
                  <span className="absolute left-2 text-[10px] font-bold text-slate-400">W</span>

                  {/* Concentric rings */}
                  <div className="w-32 h-32 rounded-full border border-dashed border-cyan-500/20" />
                  <div className="w-20 h-20 rounded-full border border-cyan-500/20" />

                  {/* Directional Needle */}
                  <div
                    className="absolute w-1.5 h-16 bg-gradient-to-t from-transparent via-cyan-400 to-rose-500 rounded-full origin-bottom transition-transform duration-75"
                    style={{
                      transform: `rotate(${heading}deg) translateY(-50%)`,
                      transformOrigin: '50% 100%'
                    }}
                  />
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50 z-10" />

                  {/* Viewpoint Waypoint Pins on Radar */}
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
                            ? 'bg-cyan-400 text-slate-950 ring-2 ring-white shadow-lg shadow-cyan-400/60 z-20 scale-110'
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
                  {/* Current Position */}
                  <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/50">
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
                  {destination.viewpoints && (
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

                  {/* Hotspots at current location */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Hotspots in this scene:
                    </span>
                    {activeHotspots.map((hs) => (
                      <button
                        key={hs.id}
                        onClick={() => {
                          onSelectHotspot(hs);
                          setActiveTab(null);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-left transition-colors"
                      >
                        <span className="text-slate-200 truncate">{hs.title}</span>
                        <span className="text-[10px] text-cyan-400 font-mono">View Info</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INFORMATION */}
          {activeTab === 'info' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Info className="w-4 h-4" />
                  <span>Destination Guide & History</span>
                </div>
                <span className="text-xs text-slate-400">{destination.location}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {destination.description}
              </p>
              
              <div className="pt-2">
                <h5 className="text-xs font-semibold text-slate-200 mb-1.5">Historical Highlights:</h5>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {destination.historicalFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIO */}
          {activeTab === 'audio' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Volume2 className="w-4 h-4" />
                  <span>In-Tour Audio Narration Guide</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${audioState.isPlaying ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                  {audioState.isPlaying ? 'Playing' : 'Paused'}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                "{destination.audioNarration}"
              </p>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={onToggleAudio}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs shadow-md transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{audioState.isPlaying ? 'Pause Narration' : 'Play Audio Guide'}</span>
                </button>
                <span className="text-xs text-slate-400">Voice: AI Heritage Narrator</span>
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Settings className="w-4 h-4" />
                  <span>VR Tour Preferences</span>
                </div>
              </div>

              {/* FOV Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Field of View (Zoom)</span>
                  <span className="font-mono text-cyan-400">{fov}°</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="95"
                  value={fov}
                  onChange={(e) => setFov(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Rotation Sensitivity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Pan & Drag Sensitivity</span>
                  <span className="font-mono text-cyan-400">{rotationSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5 In-Tour Floating Menu Buttons */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#0a0d14]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl pointer-events-auto">
        <button
          onClick={() => toggleTab('map')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'map'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>Map</span>
        </button>

        <button
          onClick={() => toggleTab('info')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'info'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>Information</span>
        </button>

        <button
          onClick={() => toggleTab('audio')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'audio'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Audio</span>
        </button>

        <button
          onClick={() => toggleTab('settings')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'settings'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>

        <div className="w-px h-5 bg-slate-800 mx-1" />

        <button
          onClick={onExitTour}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Tour</span>
        </button>
      </div>
    </div>
  );
}
