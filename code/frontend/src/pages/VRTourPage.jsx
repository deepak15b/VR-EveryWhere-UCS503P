import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DESTINATIONS, getActiveViewpoint } from '../data/destinationsData';
import VRTourViewer from '../components/vr/VRTourViewer';
import HotspotModal from '../components/vr/HotspotMarker';
import FloatingVRMenu from '../components/vr/FloatingVRMenu';
import { useFavorites } from '../context/FavoritesContext';
import { TourSpeechGuide, soundEngine } from '../services/soundEffects';
import {
  Heart,
  LogOut,
  Sparkles,
  Footprints,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  MapPin,
  ExternalLink,
  Camera,
  CheckCircle2,
  Award,
  Download,
  X,
  Volume2,
  RotateCw,
  Glasses,
  Smartphone
} from 'lucide-react';

export default function VRTourPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vrViewerRef = useRef(null);
  const { isFavorite, toggleFavorite, recordTourSession, logHotspotInteraction } = useFavorites();

  // Resolve destination synchronously so state is immediately available without null flicker
  const initialDestination = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];
  const [destination, setDestination] = useState(initialDestination);
  const [currentViewpointId, setCurrentViewpointId] = useState(
    initialDestination.viewpoints?.[0]?.id || null
  );
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [heading, setHeading] = useState(0);
  const [fov, setFov] = useState(75);
  const [rotationSpeed, setRotationSpeed] = useState(1.0);
  const [ambientFilter, setAmbientFilter] = useState('natural');
  const [autoRotate, setAutoRotate] = useState(false);
  const [stereoMode, setStereoMode] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Postcard Snapshot State
  const [postcardImg, setPostcardImg] = useState(null);

  const isFav = isFavorite(destination.id);

  // Sync state if id param changes
  useEffect(() => {
    const found = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];
    setDestination(found);
    if (found.viewpoints && found.viewpoints.length > 0) {
      setCurrentViewpointId(found.viewpoints[0].id);
    }
    recordTourSession(found);
  }, [id]);

  // Clean up audio and speech synthesis when exiting the tour
  useEffect(() => {
    return () => {
      TourSpeechGuide.stop();
      soundEngine.stopAmbient();
    };
  }, []);

  const currentViewpoint = getActiveViewpoint(destination, currentViewpointId);

  // Navigate to a new viewpoint
  const handleNavigateToViewpoint = (targetId) => {
    setCurrentViewpointId(targetId);
    setSelectedHotspot(null);
  };

  // Find forward & backward links for quick on-screen buttons
  const fwdLink =
    currentViewpoint.navLinks?.find((l) => l.direction === 'forward' || l.position?.z < 0) ||
    currentViewpoint.navLinks?.[0];

  const bwdLink = currentViewpoint.navLinks?.find(
    (l) => l.direction === 'backward' || l.position?.z > 0
  );

  const handleSelectHotspot = (hs) => {
    setSelectedHotspot(hs);
    if (logHotspotInteraction) {
      logHotspotInteraction(destination.id);
    }
  };

  const handlePlayHotspotNarration = (text) => {
    TourSpeechGuide.speak(text);
  };

  // Toggle VR Headset / Google Cardboard Mode with automatic orientation permission
  const handleToggleStereo = async () => {
    const next = !stereoMode;
    // Set stereo mode immediately so UI splits into left/right eye without blocking
    setStereoMode(next);

    if (next) {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        try {
          await DeviceOrientationEvent.requestPermission();
        } catch (err) {
          console.warn('iOS motion request error:', err);
        }
      }

      // Safe fullscreen check (iOS Safari does not implement document.documentElement.requestFullscreen)
      try {
        const el = document.documentElement;
        const requestFs =
          el.requestFullscreen ||
          el.webkitRequestFullscreen ||
          el.mozRequestFullScreen ||
          el.msRequestFullscreen;

        if (!document.fullscreenElement && typeof requestFs === 'function') {
          const promise = requestFs.call(el);
          if (promise && typeof promise.catch === 'function') {
            promise.catch(() => {});
          }
        }
      } catch (fsErr) {
        // Silently ignore if fullscreen is restricted on mobile browser
      }
    }
  };

  const handleConfirmExit = (saveToFavorites) => {
    TourSpeechGuide.stop();
    soundEngine.stopAmbient();
    if (saveToFavorites && !isFav) {
      toggleFavorite(destination.id);
    }
    navigate(`/destination/${destination.id}`, { replace: true });
  };

  // Postcard Generator: capture canvas and composite Polaroid travel card
  const handleCapturePostcard = () => {
    soundEngine.playCameraShutter();
    if (!vrViewerRef.current) return;
    const rawDataUrl = vrViewerRef.current.captureSnapshot();
    if (!rawDataUrl) return;

    // Draw on a hidden canvas to add vintage travel badge
    const img = new Image();
    img.src = rawDataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 700;
      const ctx = canvas.getContext('2d');

      // Draw photo
      ctx.drawImage(img, 0, 0, 1200, 700);

      // Vignette shadow
      const grad = ctx.createLinearGradient(0, 500, 0, 700);
      grad.addColorStop(0, 'rgba(3, 7, 18, 0)');
      grad.addColorStop(1, 'rgba(3, 7, 18, 0.9)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 500, 1200, 200);

      // Travel Stamp Box
      ctx.fillStyle = 'rgba(6, 182, 212, 0.85)';
      ctx.fillRect(40, 560, 6, 90);

      ctx.font = 'bold 32px Inter, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(destination.name, 60, 600);

      ctx.font = '18px Inter, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(
        `${destination.location} • 360° Photosphere Snapshot • ${new Date().toLocaleDateString()}`,
        60,
        632
      );

      // Souvenir Stamp Watermark
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.textAlign = 'right';
      ctx.fillText('VR Everywhere • 360° Virtual Reality', 1160, 630);

      setPostcardImg(canvas.toDataURL('image/jpeg', 0.95));
    };
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black select-none">
      
      {/* 360° Spherical VR Canvas */}
      <VRTourViewer
        ref={vrViewerRef}
        destination={destination}
        viewpoint={currentViewpoint}
        onNavigateToViewpoint={handleNavigateToViewpoint}
        onSelectHotspot={handleSelectHotspot}
        selectedHotspot={selectedHotspot}
        fov={fov}
        rotationSpeed={rotationSpeed}
        ambientFilter={ambientFilter}
        autoRotate={autoRotate}
        stereoMode={stereoMode}
        onHeadingChange={(deg) => setHeading(deg)}
      />

      {/* TOP HEADER BAR: Destination Info, Waypoint Stepper (Hidden in VR Stereo Mode for clean lens view) */}
      {!stereoMode ? (
        <div className="absolute top-3 sm:top-4 left-0 right-0 z-20 px-3 sm:px-6 flex items-center justify-between pointer-events-none gap-2 sm:gap-3">
          
          {/* Left: Destination pill */}
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-[#050b14]/85 backdrop-blur-md border border-white/10 shadow-xl shrink-0 max-w-[160px] xs:max-w-[200px] sm:max-w-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-extrabold text-white truncate">{destination.name}</span>
                <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.2 rounded hidden sm:inline shrink-0">
                  360°
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 block -mt-0.5 truncate">
                {currentViewpoint.name}
              </span>
            </div>
          </div>

          {/* Center: Walkable Waypoint Stepper (if multiple) */}
          {destination.viewpoints && destination.viewpoints.length > 1 && (
            <div className="pointer-events-auto hidden lg:flex items-center gap-1.5 p-1.5 bg-[#050b14]/85 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl shrink min-w-0 overflow-hidden">
              <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-400 border-r border-slate-800 mr-1 shrink-0">
                <Footprints className="w-3.5 h-3.5" />
                <span>Waypoints</span>
              </span>

              {destination.viewpoints.map((vp, index) => {
                const isActive = vp.id === currentViewpoint.id;
                const shortName = vp.name.split('(')[0].split('&')[0].trim();
                return (
                  <button
                    key={vp.id}
                    onClick={() => handleNavigateToViewpoint(vp.id)}
                    title={vp.name}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all max-w-[130px] xl:max-w-[180px] ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isActive ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="truncate">{shortName}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Right: Quick VR Headset & Favorite Buttons */}
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick VR Headset Cardboard Toggle */}
            <button
              onClick={handleToggleStereo}
              title="Enter VR Headset / Google Cardboard Mode"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl border text-xs font-bold transition-all shadow-xl shrink-0 bg-[#050b14]/85 border-cyan-500/30 text-cyan-300 hover:border-cyan-400 active:scale-95"
            >
              <Glasses className="w-4 h-4" />
              <span className="hidden sm:inline">VR Headset</span>
            </button>

            {/* Quick Favorite Toggle */}
            <button
              onClick={() => toggleFavorite(destination.id)}
              title={isFav ? 'Remove from Favorites' : 'Save to Favorites'}
              className={`p-2 sm:p-2.5 rounded-2xl backdrop-blur-md border transition-all shrink-0 ${
                isFav
                  ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/40'
                  : 'bg-[#050b14]/85 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      ) : (
        /* Minimal Exit VR Floating Pill when wearing goggles */
        <div className="absolute top-4 right-4 z-30 pointer-events-auto">
          <button
            onClick={handleToggleStereo}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/85 hover:bg-slate-900 border border-cyan-400 text-cyan-300 text-xs font-bold shadow-2xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            title="Exit VR Stereo Mode"
          >
            <Glasses className="w-4 h-4 text-cyan-400" />
            <span>Exit VR Goggles</span>
          </button>
        </div>
      )}

      {/* QUICK STREET VIEW WALK FORWARD & BACKWARD BUTTONS (Right Side) */}
      {!stereoMode && (
        <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-auto">
          {fwdLink && (
            <button
              onClick={() => handleNavigateToViewpoint(fwdLink.targetId)}
              className="group flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-extrabold text-xs shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all"
              title="Walk forward"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              <div className="text-left hidden sm:block">
                <span className="block text-[9px] uppercase font-bold text-slate-900/80">
                  Walk Forward
                </span>
                <span className="block max-w-[110px] truncate text-xs">
                  {fwdLink.label.replace('Walk Forward to ', '').replace('Walk to ', '')}
                </span>
              </div>
            </button>
          )}

          {bwdLink && (
            <button
              onClick={() => handleNavigateToViewpoint(bwdLink.targetId)}
              className="group flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-xs shadow-lg hover:scale-105 transition-all"
              title="Walk backward"
            >
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-slate-400 shrink-0" />
              <div className="text-left hidden sm:block">
                <span className="block text-[9px] uppercase font-bold text-slate-400">
                  Walk Back
                </span>
                <span className="block max-w-[110px] truncate text-xs">
                  {bwdLink.label.replace('Walk Backward to ', '').replace('Walk Back to ', '')}
                </span>
              </div>
            </button>
          )}

          {/* Quick External Google Maps Location Link */}
          {destination.googleStreetViewUrl && (
            <a
              href={destination.googleStreetViewUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 text-[11px] font-semibold transition-all"
              title="Open location on Google Maps"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="hidden md:inline">Google Maps</span>
            </a>
          )}
        </div>
      )}

      {/* QUICK CAMERA & PAN CONTROLS (Left Side) */}
      {!stereoMode && (
        <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-2 pointer-events-auto">
          <button
            onClick={() => vrViewerRef.current?.panBy(-25, 0)}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 border border-slate-800 text-slate-300 transition-all shadow-md"
            title="Pan Left [A]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => vrViewerRef.current?.panBy(25, 0)}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 border border-slate-800 text-slate-300 transition-all shadow-md"
            title="Pan Right [D]"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2.5 rounded-xl border transition-all shadow-md ${
              autoRotate
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
            title="Toggle Auto-Rotate Tour"
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>
        </div>
      )}

      {/* POSTCARD MODAL */}
      {postcardImg && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in pointer-events-auto">
          <div className="relative w-full max-w-xl bg-[#050b14] border border-cyan-500/50 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">360° Travel Postcard Generated!</h3>
              </div>
              <button
                onClick={() => setPostcardImg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <img src={postcardImg} alt="Travel Postcard" className="w-full h-auto object-cover" />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-400">
                Captured with 360° camera projection & watermark.
              </span>
              <a
                href={postcardImg}
                download={`${destination.id}-360-postcard.jpg`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Postcard</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* HOTSPOT INFO MODAL */}
      <HotspotModal
        hotspot={selectedHotspot}
        onClose={() => {
          setSelectedHotspot(null);
          TourSpeechGuide.stop();
        }}
        onPlayNarration={handlePlayHotspotNarration}
      />

      {/* CORE 5-BUTTON FLOATING VR MENU (Proposal Page 7: Map | Information | Audio | Settings | Exit Tour) */}
      <FloatingVRMenu
        destination={destination}
        currentViewpoint={currentViewpoint}
        onNavigateToViewpoint={handleNavigateToViewpoint}
        heading={heading}
        fov={fov}
        setFov={setFov}
        rotationSpeed={rotationSpeed}
        setRotationSpeed={setRotationSpeed}
        ambientFilter={ambientFilter}
        setAmbientFilter={setAmbientFilter}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        stereoMode={stereoMode}
        setStereoMode={handleToggleStereo}
        onSelectHotspot={handleSelectHotspot}
        onCapturePostcard={handleCapturePostcard}
        onExitTour={() => setShowExitConfirm(true)}
      />

      {/* HTTPS / Sensor Security Context Notice for Mobile Wi-Fi */}
      {/* EXIT TOUR CONFIRMATION MODAL */}
      {showExitConfirm && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in pointer-events-auto">
          <div className="relative w-full max-w-sm bg-[#050b14] border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto">
              <LogOut className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Exit Virtual Reality Tour?</h3>
              <p className="text-xs text-slate-400 mt-1">
                You can save <strong className="text-white">{destination.name}</strong> to your Favorites before exiting.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleConfirmExit(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Save to Favorites & Exit</span>
              </button>

              <button
                onClick={() => handleConfirmExit(false)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-xs border border-slate-800 transition-colors"
              >
                Exit Tour
              </button>

              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-1 text-slate-500 hover:text-slate-400 text-xs font-semibold"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
