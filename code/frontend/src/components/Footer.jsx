import React from 'react';
import { Glasses, Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#05070a] border-t border-slate-900 mt-auto py-10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Glasses className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">VR Everywhere</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed text-xs sm:text-sm">
              An accessible, open-source virtual travel platform allowing users worldwide to explore cultural landmarks and heritage destinations through high-fidelity 360° virtual reality, interactive spatial hotspots, and audio narration.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <span>Open-Source WebXR Platform</span>
              <span>•</span>
              <span className="text-cyan-400 font-medium">Three.js & React</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Experience</Link></li>
              <li><Link to="/explore" className="hover:text-cyan-400 transition-colors">Destination Catalog</Link></li>
              <li><Link to="/tours" className="hover:text-cyan-400 transition-colors">VR 360° Tours</Link></li>
              <li><Link to="/favorites" className="hover:text-cyan-400 transition-colors">Saved Favorites</Link></li>
              <li><Link to="/profile" className="hover:text-cyan-400 transition-colors">Explorer Profile</Link></li>
            </ul>
          </div>

          {/* Col 3: Technology Highlights */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase mb-3">Features</h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p>• 360° High-Res Photospheres</p>
              <p>• Stereoscopic VR Headset Mode</p>
              <p>• Device Gyroscope Head Tracking</p>
              <p>• Spatial Hotspots & Speech Audio</p>
              <p>• Interactive Waypoint Navigation</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 VR Everywhere — Open Source Virtual Reality Platform</p>
          <p className="flex items-center gap-1">
            Built with React, Three.js, WebXR & Spring Boot
          </p>
        </div>
      </div>
    </footer>
  );
}
