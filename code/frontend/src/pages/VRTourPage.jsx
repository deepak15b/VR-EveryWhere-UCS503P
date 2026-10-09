import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DESTINATIONS, getActiveViewpoint } from '../data/destinationsData';
import VRTourViewer from '../components/vr/VRTourViewer';
import HotspotModal from '../components/vr/HotspotMarker';
import FloatingVRMenu from '../components/vr/FloatingVRMenu';
import AudioGuidePlayer from '../components/vr/AudioGuidePlayer';
import { useFavorites } from '../context/FavoritesContext';
import { Heart, LogOut, Sparkles, Footprints, ArrowUp, ArrowDown, ChevronRight, MapPin } from 'lucide-react';

export default function VRTourPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, recordTourSession } = useFavorites();

  const [destination, setDestination] = useState(null);
  const [currentViewpointId, setCurrentViewpointId] = useState(null);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [heading, setHeading] = useState(0);
  const [fov, setFov] = useState(75);
  const [rotationSpeed, setRotationSpeed] = useState(1.0);
  const [audioState, setAudioState] = useState({ isPlaying: false, currentText: '' });
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    const found = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];
    setDestination(found);
    if (found.viewpoints && found.viewpoints.length > 0) {
      setCurrentViewpointId(found.viewpoints[0].id);
    }
    setAudioState({ isPlaying: false, currentText: found.audioNarration });
    recordTourSession(found);
  }, [id]);

  if (!destination) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        Loading Tour...
      </div>
    );
  }

  const currentViewpoint = getActiveViewpoint(destination, currentViewpointId);
  const isFav = isFavorite(destination.id);

  // Navigate to a new viewpoint (teleport / walk)
  const handleNavigateToViewpoint = (targetId) => {
    setCurrentViewpointId(targetId);
    setSelectedHotspot(null);
  };

  // Find forward & backward links for quick on-screen buttons
  const fwdLink = currentViewpoint.navLinks?.find(
    (l) => l.direction === 'forward' || l.position?.z < 0
  ) || currentViewpoint.navLinks?.[0];

  const bwdLink = currentViewpoint.navLinks?.find(
    (l) => l.direction === 'backward' || l.position?.z > 0
  );

  const handleToggleAudio = () => {
    setAudioState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
      currentText: destination.audioNarration,
    }));
  };

  const handlePlayHotspotNarration = (text) => {
    setAudioState({
      isPlaying: true,
      currentText: text,
    });
  };

  const handleConfirmExit = (saveToFavorites) => {
    if (saveToFavorites && !isFav) {
      toggleFavorite(destination.id);
    }
    navigate(`/destination/${destination.id}`);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none">
      
      {/* 360° Spherical VR Canvas */}
      <VRTourViewer
        destination={destination}
        viewpoint={currentViewpoint}
        onNavigateToViewpoint={handleNavigateToViewpoint}
        onSelectHotspot={(hs) => setSelectedHotspot(hs)}
        selectedHotspot={selectedHotspot}
        fov={fov}
        rotationSpeed={rotationSpeed}
        onHeadingChange={(deg) => setHeading(deg)}
      />

      {/* TOP: Walk Progression & Viewpoint Stepper Bar */}
      {destination.viewpoints && destination.viewpoints.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-full px-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 p-1.5 bg-[#0a0d14]/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-400 border-r border-slate-800 mr-1">
              <Footprints className="w-3.5 h-3.5" />
              <span>Waypoints</span>
            </span>

            {destination.viewpoints.map((vp, index) => {
              const isActive = vp.id === currentViewpoint.id;
              return (
                <button
                  key={vp.id}
                  onClick={() => handleNavigateToViewpoint(vp.id)}
                  title={vp.subtitle || vp.name}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {index + 1}
                  </span>
                  <span>{vp.name.split('(')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ON-SCREEN WALK FORWARD & BACKWARD BUTTONS (Left/Right side for quick navigation) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5 pointer-events-auto">
        {fwdLink && (
          <button
            onClick={() => handleNavigateToViewpoint(fwdLink.targetId)}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all"
            title="Press W or click to walk forward"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] uppercase font-semibold text-slate-900/80">Walk Forward [W]</span>
              <span className="block max-w-[120px] truncate text-xs">{fwdLink.label.replace('Walk Forward to ', '').replace('Walk to ', '')}</span>
            </div>
          </button>
        )}

        {bwdLink && (
          <button
            onClick={() => handleNavigateToViewpoint(bwdLink.targetId)}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 shadow-xl hover:scale-105 transition-all"
            title="Press S or click to walk backward"
          >
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] uppercase font-semibold text-slate-400">Walk Back [S]</span>
              <span className="block max-w-[120px] truncate text-xs">{bwdLink.label.replace('Walk Backward to ', '').replace('Walk Back to ', '')}</span>
            </div>
          </button>
        )}
      </div>

      {/* Interactive Hotspot Modal */}
      {selectedHotspot && (
        <HotspotModal
          hotspot={selectedHotspot}
          onClose={() => setSelectedHotspot(null)}
          onPlayNarration={handlePlayHotspotNarration}
        />
      )}

      {/* Voice Narration Guide */}
      <AudioGuidePlayer
        text={audioState.currentText}
        isPlaying={audioState.isPlaying}
        onTogglePlay={(playing) => setAudioState((prev) => ({ ...prev, isPlaying: playing }))}
      />

      {/* Floating In-Tour VR Menu: Map | Information | Audio | Settings | Exit Tour */}
      <FloatingVRMenu
        destination={destination}
        currentViewpoint={currentViewpoint}
        onNavigateToViewpoint={handleNavigateToViewpoint}
        heading={heading}
        fov={fov}
        setFov={setFov}
        rotationSpeed={rotationSpeed}
        setRotationSpeed={setRotationSpeed}
        onSelectHotspot={(hs) => setSelectedHotspot(hs)}
        audioState={audioState}
        onToggleAudio={handleToggleAudio}
        onExitTour={() => setShowExitConfirm(true)}
      />

      {/* Exit & Favorites Prompt */}
      {showExitConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-[#0f1422] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white">Exit VR Tour?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You explored <strong>{destination.name}</strong>. Would you like to save this destination to your <strong>Favorites</strong>?
            </p>

            <div className="flex flex-col gap-2.5 pt-2">
              {!isFav && (
                <button
                  onClick={() => handleConfirmExit(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/30 hover:scale-[1.02] transition-transform"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Save to Favorites & Exit</span>
                </button>
              )}

              <button
                onClick={() => handleConfirmExit(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
              >
                Exit without saving
              </button>

              <button
                onClick={() => setShowExitConfirm(false)}
                className="text-xs text-slate-500 hover:text-slate-400 pt-1"
              >
                Resume Tour
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
